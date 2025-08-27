import { CalculationEngine } from "./CalculationEngine.js";
import { NOTIFICATION_TYPES } from "../shared/config.js";
import { FormattingService } from "../core/services/FormattingService.js";
import { CalculationService, separarMateriais } from "../core/services/CalculationService.js";
import { CostCalculationService } from "../core/services/CostCalculationService.js";

export class PricingController {
    constructor(budgetStore, templateController, budgetController, priceController, notificationManager) {
        this.store = budgetStore;
        this.templateController = templateController;
        this.budgetController = budgetController;
        this.priceController = priceController;
        this.notifications = notificationManager;
    }

    async calculateTemplatePricing(templateId, pricingConfig) {
        try {
            const template = this.templateController.getById(templateId);
            if (!template) throw new Error("Modelo não encontrado");

            const commercialData = this.store.getCommercialData();
            if (!pricingConfig.tipoConfiguracao || !commercialData.ufDestino) {
                this.notifications.show("Configure o tipo de operação e a UF de destino (na aba Proposta)", NOTIFICATION_TYPES.WARNING);
                return false;
            }

            const ipiValidation = CalculationEngine.validateIPIRules(pricingConfig);
            if (!ipiValidation.valid) {
                this.notifications.show(ipiValidation.error, NOTIFICATION_TYPES.DANGER);
                return false;
            }

            this.store.updateTemplatePricingConfig(templateId, pricingConfig);
            const pricingData = this.preparePricingDataForTemplate(templateId);
            const calculationResult = CalculationEngine.calculatePrice(pricingData);
            this.store.updateTemplatePricingResult(templateId, calculationResult);

            this.notifications.show(`Preço calculado para ${template.nome}`, NOTIFICATION_TYPES.SUCCESS);
            return true;
        } catch (error) {
            this.notifications.show(error.message || "Erro no cálculo. Verifique os dados.", NOTIFICATION_TYPES.DANGER);
            return false;
        }
    }

    async calculateAllTemplatesPricing() {
        const accordion = document.getElementById('pricing-accordion-component');

        this.store.getTemplatesWithPricingStatus().filter(t => t.hasItems).forEach(template => {
            const panel = accordion.shadowRoot.querySelector(`pricing-template-panel[data-template-id-for-query="${template.id}"]`);
            if (panel) {
                const configData = panel._extractFormData();
                if (configData) {
                    this.store.updateTemplatePricingConfig(template.id, configData);
                }
            }
        });

        const templatesToCalculate = this.store.getTemplatesWithPricingStatus()
        .filter(template => template.hasItems && template.pricingConfig?.tipoConfiguracao);

        if (templatesToCalculate.length === 0) {
            this.notifications.show("Nenhum modelo configurado com itens para calcular.", NOTIFICATION_TYPES.WARNING);
            return 0;
        }

        let successCount = 0;
        let errorCount = 0;

        for (const template of templatesToCalculate) {
            try {
                const pricingData = this.preparePricingDataForTemplate(template.id);
                const calculationResult = CalculationEngine.calculatePrice(pricingData);
                this.store.updateTemplatePricingResult(template.id, calculationResult);
                successCount++;
            } catch (error) {
                console.error(`Erro ao calcular pricing para ${template.nome}:`, error);
                errorCount++;
            }
        }

        const message = errorCount > 0
            ? `${successCount}/${templatesToCalculate.length} modelos calculados (${errorCount} erro(s))`
            : `${successCount}/${templatesToCalculate.length} modelos calculados com sucesso.`;

        this.notifications.show(message, errorCount > 0 ? NOTIFICATION_TYPES.WARNING : NOTIFICATION_TYPES.SUCCESS);
        return successCount;
    }

    preparePricingDataForTemplate(templateId) {
        const template = this.templateController.getById(templateId);
        const pricingConfig = template.pricingConfig || {};
        const commercialData = this.store.getCommercialData();
        const budgetItems = this.store.getBudgetItems().filter(item => item.templateId === templateId);

        if (budgetItems.length === 0) {
            throw new Error("Modelo sem itens no orçamento");
        }

        const finalPricingConfig = { ...pricingConfig, ufDestino: commercialData.ufDestino };
        const custos = this.calculateCostsForTemplate(template, budgetItems);
        const ufConfig = this.getUFConfigurationForTemplate(finalPricingConfig);

        let materialDetails;
        if (template.templateType === 'clamp') {
            const totalQuantity = budgetItems.reduce((sum, item) => sum + item.quantidade, 0);
            const unitCost = totalQuantity > 0 ? custos.materialPuro / totalQuantity : 0;
            materialDetails = { desc: `Materiais - ${template.nome}`, qty: totalQuantity, unit: unitCost, total: custos.materialPuro };
        } else {
            materialDetails = { desc: `Materiais - ${template.nome}`, qty: 1, unit: custos.materialPuro, total: custos.materialPuro };
        }

        return {
            materiaisDetalhes: [materialDetails],
            servicosDetalhes: this.getServicesForTemplate(custos),
            ...finalPricingConfig,
            ...ufConfig
        };
    }

    calculateCostsForTemplate(template, budgetItems) {
        if (template.templateType === 'clamp') {
            const totalItems = budgetItems.reduce((sum, item) => sum + item.quantidade, 0);
            const matCost = Object.values(template.costs.material).reduce((s, v) => s + v, 0);
            const moCost = Object.values(template.costs.maoDeObra).reduce((s, v) => s + v, 0);
            const galvCost = Object.values(template.costs.galvanizacao).reduce((s, v) => s + v, 0);
            return { materialPuro: matCost * totalItems, maoObra: moCost * totalItems, galvanizacao: galvCost * totalItems, servicoChapas: 0 };
        }

        const templates = [template];
        const consolidatedBars = this.budgetController.buildConsolidatedByTemplate(templates, this.priceController);
        const consolidatedPlates = this.budgetController.buildConsolidatedChapas(templates, this.priceController);

        const custoBarras = CostCalculationService.calcularCustoMaterialConsolidado(consolidatedBars, this.priceController, templates);
        const custoChapas = CostCalculationService.calcularCustoChapas(consolidatedPlates, this.priceController, templates);

        let totalMaoObra = 0, totalGalvanizacao = 0;
        let totalServicoChapas = custoChapas.totalServico;

        budgetItems.forEach(item => {
            const calculo = CalculationService.calcular(item, template, this.priceController);
            const processPrices = this.priceController.getProcessPrices(template);
            totalMaoObra += calculo.pesoComMargem * processPrices.maoObra;
            totalGalvanizacao += calculo.pesoComMargem * processPrices.galvanizacao;
        });

        return {
            materialPuro: custoBarras.total + custoChapas.totalMaterial,
            maoObra: totalMaoObra,
            galvanizacao: totalGalvanizacao,
            servicoChapas: totalServicoChapas
        };
    }

    getServicesForTemplate(custos) {
        const servicos = [];
        if (custos.maoObra > 0) servicos.push({ desc: 'Mão de Obra', qty: 1, unit: custos.maoObra, total: custos.maoObra });
        if (custos.galvanizacao > 0) servicos.push({ desc: 'Galvanização', qty: 1, unit: custos.galvanizacao, total: custos.galvanizacao });
        if (custos.servicoChapas > 0) servicos.push({ desc: 'Serviços de Chapas', qty: 1, unit: custos.servicoChapas, total: custos.servicoChapas });
        return servicos;
    }

    getUFConfigurationForTemplate(pricingConfig) {
        const ufConfig = { ufGrade: '', ufGrampo: '', ufTelas: '', ufNaoContribuinte: '', ufConsumidorFinal: '', ufRevendaNormal: '' };
        if (pricingConfig.tipoConfiguracao && pricingConfig.ufDestino) {
            switch(pricingConfig.tipoConfiguracao) {
                case 'grade': ufConfig.ufGrade = pricingConfig.ufDestino; break;
                case 'grampo': ufConfig.ufGrampo = pricingConfig.ufDestino; break;
                case 'telas': ufConfig.ufTelas = pricingConfig.ufDestino; break;
                case 'naoContribuinte': ufConfig.ufNaoContribuinte = pricingConfig.ufDestino; break;
                case 'consumidorFinal': ufConfig.ufConsumidorFinal = pricingConfig.ufDestino; break;
                case 'revendaNormal': ufConfig.ufRevendaNormal = pricingConfig.ufDestino; break;
            }
        }
        return ufConfig;
    }
}