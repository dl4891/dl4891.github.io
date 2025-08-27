import { MESSAGES, NOTIFICATION_TYPES } from "../shared/config.js";
import { CalculationService, separarMateriais } from "../core/services/CalculationService.js";
import { CostCalculationService } from "../core/services/CostCalculationService.js";
import { FormattingService } from "../core/services/FormattingService.js";

export class BudgetController {
    constructor(budgetStore, notificationManager, appInstance) {
        this.store = budgetStore;
        this.notifications = notificationManager;
        this.app = appInstance;
    }

    add(itemData) {
        return this.store.saveBudgetItem(itemData);
    }

    remove(itemId) {
        const item = this.store.getBudgetItemById(itemId);
        if (!item) return;
        const message = MESSAGES.CONFIRMATIONS.deleteItem.replace('{description}', item.descricao || `item #${(item.order || 0) + 1}`);
        this.app.showConfirmation('Confirmar Remoção', `<p>${message}</p>`, () => {
            this.store.deleteBudgetItem(itemId);
            this.notifications.show(MESSAGES.SUCCESS.itemRemoved, NOTIFICATION_TYPES.SUCCESS);
        });
    }

    clear() {
        if (this.store.getBudgetItems().length === 0) {
            this.notifications.show("Orçamento já está vazio.", NOTIFICATION_TYPES.INFO);
            return;
        }
        const message = MESSAGES.CONFIRMATIONS.clearBudget.replace('{count}', this.store.getBudgetItems().length);
        this.app.showConfirmation('Limpar Orçamento', `<p>${message}</p>`, () => {
            this.store.clearBudgetItems();
            this.notifications.show("Orçamento limpo com sucesso.", NOTIFICATION_TYPES.SUCCESS);
        });
    }

    cancelEdit() {
        this.store.clearEditingBudgetItem();
    }

    moveItemToPosition(itemId, newPosition) {
        const items = this.store.getBudgetItems();
        const itemToMove = items.find(item => item.id === itemId);
        if (!itemToMove) return;
        const otherItems = items.filter(item => item.id !== itemId);
        let targetIndex = newPosition - 1;
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex > otherItems.length) targetIndex = otherItems.length;
        otherItems.splice(targetIndex, 0, itemToMove);
        const orderedIds = otherItems.map(item => item.id);
        this.store.updateItemsOrder(orderedIds);
    }

    importItemsFromCSV(csvContent) {
        const result = this.store.importItemsFromCSV(csvContent);

        if (result.importedCount > 0) {
            this.notifications.show(`${result.importedCount} item(ns) importado(s) com sucesso.`, NOTIFICATION_TYPES.SUCCESS);
        }

        if (result.errorCount > 0) {
            this.notifications.show(`${result.errorCount} item(ns) não puderam ser importados. Verifique os erros.`, NOTIFICATION_TYPES.WARNING);
            result.errors.forEach(error => {
                this.notifications.show(error, NOTIFICATION_TYPES.DANGER, 8000);
            });
        }

        if(result.importedCount === 0 && result.errorCount === 0) {
            this.notifications.show("Nenhum item encontrado no arquivo para importar.", NOTIFICATION_TYPES.INFO);
        }

        return result.success;
    }

    updateSummaryView() {
        const { totalGrades, totalGrampos, totalArea, totalPesoMargem, consolidado, hasTeoricoWeights } = this.calculateTotals();
        const custos = this.calculateCosts();
        const custoMaterialTotal = custos.totalCustoMaterialPuro + (custos.totalCustoServicoChapas || 0);

        this.app.summaryComponent.summary = {
            totalGrades,
            totalGrampos,
            totalArea,
            totalPesoMargem,
            custoMaterial: custoMaterialTotal,
            custoGeral: custos.totalCustoGeral,
            consolidado: { ...consolidado },
            hasTeoricoWeights,
        };
    }

    updateBudgetListView() {
        const items = this.store.getBudgetItems();
        const templates = this.store.getTemplates();
        const priceController = this.app.priceController;

        const itemsWithCalculations = items.map(item => {
            const template = templates.find(t => t.id === item.templateId);
            if (!template) return null;

            const calculoItem = this._calculateItemTotals(item, template, priceController);
            return {
                item: { ...item },
                template,
                costs: {
                    area: calculoItem.area,
                    peso: calculoItem.peso,
                    pesoComMargem: calculoItem.pesoComMargem,
                    custoTotal: 0,
                    custoUnitario: 0,
                }
            };
        }).filter(Boolean);

        const costsByM2 = this.calculateCostsByM2();

        itemsWithCalculations.forEach(d => {
            const { template, item, costs } = d;
            let custoTotal = 0;
            if (template.templateType === 'grade') {
                const custoMaterial = (costsByM2.material?.[template.nome] || 0) * costs.area;
                const custoMaoObra = (costsByM2.maoObra?.[template.nome] || 0) * costs.area;
                const custoGalvanizacao = (costsByM2.galvanizacao?.[template.nome] || 0) * costs.area;
                const custoChapas = (costsByM2.servicoChapas?.[template.nome] || 0) * costs.area;
                custoTotal = custoMaterial + custoMaoObra + custoGalvanizacao + custoChapas;
            } else { // Clamp
                const calculoItem = this._calculateItemTotals(item, template, priceController);
                custoTotal = calculoItem.custoTotal;
            }
            d.costs.custoTotal = custoTotal;
            d.costs.custoUnitario = item.quantidade > 0 ? custoTotal / item.quantidade : 0;
        });

        this.app.budgetListComponent.itemsWithCalculations = [...itemsWithCalculations];
        this.app.budgetListComponent.editingItemId = this.store.getEditingBudgetItemId();
    }

    _calculateItemTotals(item, template, priceController) {
        if (template.templateType === 'clamp') {
            const matCost = Object.values(template.costs.material).reduce((s, v) => s + v, 0);
            const moCost = Object.values(template.costs.maoDeObra).reduce((s, v) => s + v, 0);
            const galvCost = Object.values(template.costs.galvanizacao).reduce((s, v) => s + v, 0);
            const unitCost = matCost + moCost + galvCost;
            const totalCost = unitCost * item.quantidade;
            const totalWeight = template.pesoUnitario * item.quantidade;
            return {
                area: 0,
                peso: totalWeight,
                pesoComMargem: totalWeight,
                custoTotal: totalCost,
                materiais: { grampo: { peso: totalWeight, qtd: item.quantidade } }
            };
        }

        const calcMethod = this.store.getPrices().totalWeightCalcMethod || 'component';
        if (calcMethod === 'unit') {
            const singleItem = { ...item, quantidade: 1 };
            const unitCalculation = CalculationService.calcular(singleItem, template, priceController);
            const totalCalculationForMaterials = CalculationService.calcular(item, template, priceController);
            const roundedUnitPesoComMargem = priceController._applyRounding(unitCalculation.pesoComMargem);
            const roundedUnitPeso = roundedUnitPesoComMargem / (1 + template.margem / 100);
            return {
                area: unitCalculation.area * item.quantidade,
                peso: roundedUnitPeso * item.quantidade,
                pesoComMargem: roundedUnitPesoComMargem * item.quantidade,
                materiais: totalCalculationForMaterials.materiais
            };
        }
        return CalculationService.calcular(item, template, priceController);
    }

    calculateTotals() {
        const todosTemplates = this.store.getTemplates();
        const priceController = this.app.priceController;
        let totalGrades = 0, totalGrampos = 0, totalArea = 0, totalPesoMargem = 0, hasTeoricoWeights = false;
        const consolidado = {};

        this.store.getBudgetItems().forEach(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            if (!template) return;

            const calculo = this._calculateItemTotals(item, template, priceController);
            if (template.templateType === 'grade') {
                totalGrades += item.quantidade;
                totalArea += calculo.area;
                if (template.pesoCalcMode === 'teorico') hasTeoricoWeights = true;
                const calculoConsolidado = CalculationService.calcular(item, template, priceController);
                Object.entries(calculoConsolidado.materiais).forEach(([nome, dados]) => {
                    if (dados.peso > 0) {
                        if (!consolidado[nome]) consolidado[nome] = { peso: 0, qtd: 0 };
                        consolidado[nome].peso += dados.peso;
                        consolidado[nome].qtd += dados.qtd;
                    }
                });
            } else {
                totalGrampos += item.quantidade;
                if (!consolidado['grampo']) consolidado['grampo'] = { peso: 0, qtd: 0, nome: 'Grampos de Fixação' };
                consolidado['grampo'].peso += calculo.peso;
                consolidado['grampo'].qtd += item.quantidade;
            }
            totalPesoMargem += calculo.pesoComMargem;
        });
        return { totalGrades, totalGrampos, totalArea, totalPesoMargem, consolidado, hasTeoricoWeights };
    }

    calculateCosts() {
        const todosTemplates = this.store.getTemplates();
        const priceController = this.app.priceController;
        const consolidadoPorTemplate = this.buildConsolidatedByTemplate(todosTemplates, priceController);
        const consolidadoChapas = this.buildConsolidatedChapas(todosTemplates, priceController);
        const custoBarras = CostCalculationService.calcularCustoMaterialConsolidado(consolidadoPorTemplate, priceController, todosTemplates);
        const custoChapas = CostCalculationService.calcularCustoChapas(consolidadoChapas, priceController, todosTemplates);
        let totalCustoMaoObra = 0;
        let totalCustoGalvanizacao = 0;
        let custoTotalGrampos = 0;
        this.store.getBudgetItems().forEach(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            if (!template) return;
            const calculo = this._calculateItemTotals(item, template, priceController);
            if (template.templateType === 'grade') {
                const precosProcesso = priceController.getProcessPrices(template);
                totalCustoMaoObra += calculo.pesoComMargem * precosProcesso.maoObra;
                totalCustoGalvanizacao += calculo.pesoComMargem * precosProcesso.galvanizacao;
            } else {
                custoTotalGrampos += calculo.custoTotal;
            }
        });
        const custoGeralGrades = custoBarras.total + custoChapas.totalGeral + totalCustoMaoObra + totalCustoGalvanizacao;
        return {
            totalCustoMaterialPuro: custoBarras.total + custoChapas.totalMaterial,
            totalCustoServicoChapas: custoChapas.totalServico,
            totalCustoGeral: custoGeralGrades + custoTotalGrampos,
        };
    }

    calculateCostsByM2() {
        const todosTemplates = this.store.getTemplates();
        const priceController = this.app.priceController;
        const budgetItems = this.store.getBudgetItems();
        return CostCalculationService.calcularCustoPorTemplate(budgetItems.filter(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            return template && template.templateType === 'grade';
        }), todosTemplates, priceController);
    }

    buildConsolidatedByTemplate(todosTemplates, priceController) {
        const consolidado = {};
        this.store.getBudgetItems().forEach(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            if (!template || template.templateType !== 'grade') return;
            if (!consolidado[template.nome]) consolidado[template.nome] = {};
            const calculo = CalculationService.calcular(item, template, priceController);
            const { barras } = separarMateriais(calculo.materiais, template.isDegrau);
            Object.entries(barras).forEach(([_, dadosMaterial]) => {
                if (dadosMaterial.peso > 0) {
                    const chaveDimensao = FormattingService.formatDimensionKey(dadosMaterial.tipo, dadosMaterial.esp, dadosMaterial.larg, dadosMaterial.diam);
                    if (!consolidado[template.nome][chaveDimensao]) {
                        consolidado[template.nome][chaveDimensao] = { esp: dadosMaterial.esp || '-', larg: dadosMaterial.larg || '-', diam: dadosMaterial.diam || 0, tipo: dadosMaterial.tipo, qtd: 0, peso: 0, pecas: [] };
                    }
                    const material = consolidado[template.nome][chaveDimensao];
                    material.qtd += dadosMaterial.qtd;
                    material.peso += dadosMaterial.peso;
                    for (let i = 0; i < dadosMaterial.qtd; i++) {
                        material.pecas.push(dadosMaterial.comp);
                    }
                }
            });
        });
        return consolidado;
    }

    buildConsolidatedChapas(todosTemplates, priceController) {
        const consolidado = {};
        this.store.getBudgetItems().forEach(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            if (!template?.isDegrau) return;
            if (!consolidado[template.nome]) consolidado[template.nome] = {};
            const calculo = CalculationService.calcular(item, template, priceController);
            const { chapas } = separarMateriais(calculo.materiais, template.isDegrau);
            Object.entries(chapas).forEach(([nomeChapa, dadosChapa]) => {
                if (dadosChapa.peso > 0) {
                    if (!consolidado[template.nome][nomeChapa]) {
                        consolidado[template.nome][nomeChapa] = { esp: dadosChapa.esp, larg: dadosChapa.larg, comp: dadosChapa.comp, tipo: 'chapa', qtd: 0, peso: 0, comprimentos: [] };
                    }
                    const chapa = consolidado[template.nome][nomeChapa];
                    chapa.qtd += dadosChapa.qtd;
                    chapa.peso += dadosChapa.peso;
                    for (let i = 0; i < dadosChapa.qtd; i++) {
                        chapa.comprimentos.push(dadosChapa.comp);
                    }
                }
            });
        });
        return consolidado;
    }
}