import { PersistenceService } from '../shared/services/PersistenceService.js';
import { Utils } from '../shared/services/utils-service.js';
import { INTEGRATED_DEFAULTS } from '../integrated/config.js';
import { COMPANY_INFO } from '../shared/config.js';
import { TemplateFactory } from '../core/factories/TemplateFactory.js';
import { BudgetItemFactory } from '../core/factories/BudgetItemFactory.js';

export class BudgetStore {
    #state;
    #persistenceService;
    #listeners = new Set();
    #validator;

    constructor(validator) {
        this.#persistenceService = new PersistenceService();
        this.#validator = validator;
        this.#state = {
            budgets: [],
            currentBudgetId: null,
            budgetCounter: 1,
            editingTemplateId: null,
            editingBudgetItemId: null,
        };
    }

    #notify() {
        for (const listener of this.#listeners) {
            listener(this.#state);
        }
    }

    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    // --- Getters ---
    getState() { return { ...this.#state }; }
    getAllBudgets() { return this.#state.budgets; }
    getCurrentBudgetId() { return this.#state.currentBudgetId; }
    getCurrentBudget() {
        if (this.#state.budgets.length === 0) return null;
        return this.#state.budgets.find(b => b.id === this.#state.currentBudgetId) || this.#state.budgets[0];
    }
    getTemplates() { return this.getCurrentBudget()?.templates || []; }
    getTemplatesSortedByDate() { return [...this.getTemplates()].sort((a, b) => b.createdAt - a.createdAt); }
    getTemplatesSortedByName() { return [...this.getTemplates()].sort((a, b) => a.nome.localeCompare(b.nome)); }
    getTemplateById(templateId) { return this.getTemplates().find(t => t.id === templateId); }
    getBudgetItems() {
        const budget = this.getCurrentBudget();
        if (!budget) return [];
        return [...(budget.budget || [])].sort((a, b) => a.order - b.order);
    }
    getBudgetItemById(itemId) { return this.getBudgetItems().find(i => i.id === itemId); }
    getPrices() { return this.getCurrentBudget()?.prices || this.#getDefaultPrices(); }
    getCommercialData() { return this.getCurrentBudget()?.commercialData || this.#getDefaultCommercialData(); }
    getEditingTemplateId() { return this.#state.editingTemplateId; }
    getEditingBudgetItemId() { return this.#state.editingBudgetItemId; }
    isEditingBudget() { return !!this.#state.editingBudgetItemId; }

    getTemplatesWithPricingStatus() {
        const templates = this.getTemplates();
        const budgetItems = this.getBudgetItems();
        return templates.map(template => {
            const hasItems = budgetItems.some(item => item.templateId === template.id);
            const isConfigured = template.pricingConfig?.configured || false;
            const hasResult = !!template.pricingConfig?.result;
            let status = "no-items";
            if (hasItems) {
                status = isConfigured ? (hasResult ? "calculated" : "configured") : "not-configured";
            }
            let pricePerM2 = null;
            if (hasResult && template.templateType === 'grade') {
                const itemsForTemplate = budgetItems.filter(item => item.templateId === template.id);
                const totalArea = itemsForTemplate.reduce((sum, item) => sum + (item.largura * item.comprimento / 1e6 * item.quantidade), 0);
                pricePerM2 = totalArea > 0 ? template.pricingConfig.result.B97_precoVendaComDifal / totalArea : null;
            }
            return { ...template, hasItems, isConfigured, hasResult, status, pricePerM2 };
        });
    }

    // --- Ações ---
    init() {
        const budgets = this.#persistenceService.loadAllBudgets();
        const currentBudgetId = this.#persistenceService.loadCurrentBudgetId();
        const budgetCounter = this.#persistenceService.loadBudgetCounter();
        this.#state.budgets = budgets.map(budget => this.#hydrateBudget(budget));
        this.#state.budgetCounter = budgetCounter;
        if (this.#state.budgets.length === 0) {
            this.createNewBudget("Orçamento 1");
        } else {
            this.#state.currentBudgetId = (currentBudgetId && this.#state.budgets.some(b => b.id === currentBudgetId)) ? currentBudgetId : this.#state.budgets[0].id;
        }
        this.#notify();
    }

    createNewBudget(budgetName = null) {
        const name = budgetName || `Orçamento ${this.#state.budgetCounter}`;
        const newBudget = {
            id: Utils.generateId(), name, createdAt: Date.now(),
            templates: [], budget: [],
            prices: this.#getDefaultPrices(),
            commercialData: this.#getDefaultCommercialData(),
        };
        this.#state.budgets.push(newBudget);
        this.#state.currentBudgetId = newBudget.id;
        this.#state.budgetCounter++;
        this.#persistStateAndNotify();
        return newBudget;
    }

    switchToBudget(budgetId) {
        if (this.#state.currentBudgetId !== budgetId) {
            this.#state.currentBudgetId = budgetId;
            this.#persistStateAndNotify();
        }
    }

    closeBudget(budgetId) {
        const budgetIndex = this.#state.budgets.findIndex(b => b.id === budgetId);
        if (budgetIndex === -1) return;
        this.#state.budgets.splice(budgetIndex, 1);
        if (this.#state.currentBudgetId === budgetId) {
            this.#state.currentBudgetId = this.#state.budgets.length > 0 ? this.#state.budgets[0].id : null;
        }
        this.#persistStateAndNotify();
    }

    renameBudget(budgetId, newName) {
        const budget = this.#state.budgets.find(b => b.id === budgetId);
        if (budget && newName) {
            budget.name = newName;
            this.#persistStateAndNotify();
        }
    }

    duplicateBudget(budgetId) {
        const sourceBudget = this.#state.budgets.find(b => b.id === budgetId);
        if (!sourceBudget) return null;
        const newBudget = {
            ...JSON.parse(JSON.stringify(sourceBudget)),
            id: Utils.generateId(), name: `${sourceBudget.name} (Cópia)`, createdAt: Date.now(),
        };
        this.#state.budgets.push(newBudget);
        this.#state.currentBudgetId = newBudget.id;
        this.#persistStateAndNotify();
        return newBudget;
    }

    importBudget(fileContent) {
        try {
            const importedData = JSON.parse(fileContent);
            if (!importedData.name || !importedData.templates || !importedData.budget) throw new Error("Arquivo de orçamento inválido.");
            const newBudget = this.#hydrateBudget({
                id: Utils.generateId(), name: `${importedData.name} (Importado)`, createdAt: Date.now(), ...importedData
            });
            this.#state.budgets.push(newBudget);
            this.#state.currentBudgetId = newBudget.id;
            this.#persistStateAndNotify();
            return newBudget;
        } catch (error) {
            console.error("Erro na importação do orçamento:", error);
            return null;
        }
    }

    exportBudget(budgetId) {
        const budgetToExport = this.#state.budgets.find(b => b.id === budgetId);
        if (!budgetToExport) return null;
        return {
            name: budgetToExport.name, createdAt: budgetToExport.createdAt, exportedAt: Date.now(),
            templates: budgetToExport.templates, budget: budgetToExport.budget,
            prices: budgetToExport.prices, commercialData: budgetToExport.commercialData, version: "2.0"
        };
    }

    saveTemplate(formData, templateType) {
        let templateData, errors;
        const editingId = this.#state.editingTemplateId;
        if (templateType === 'grade') {
            templateData = TemplateFactory.createGradeFromFormData(formData, editingId);
            errors = this.#validator.validateGradeTemplate(templateData);
        } else {
            templateData = TemplateFactory.createClampFromFormData(formData, editingId);
            errors = this.#validator.validateClampTemplate(templateData);
        }
        if (errors.length > 0) return { success: false, errors };
        const isDuplicate = this.getTemplates().some(t => t.nome.toLowerCase() === templateData.nome.toLowerCase() && t.id !== editingId);
        if (isDuplicate) return { success: false, errors: ["Já existe um modelo com este nome."] };

        const budget = this.getCurrentBudget();
        if (editingId) {
            const index = budget.templates.findIndex(t => t.id === editingId);
            if (index !== -1) budget.templates[index] = templateData;
        } else {
            budget.templates.push(templateData);
        }
        this.clearEditingTemplate();
        this.#persistState();
        return { success: true };
    }

    deleteTemplate(templateId) {
        const budget = this.getCurrentBudget();
        budget.templates = budget.templates.filter(t => t.id !== templateId);
        budget.budget = budget.budget.filter(item => item.templateId !== templateId);
        this.#persistStateAndNotify();
    }

    setEditingTemplate(templateId) { this.#state.editingTemplateId = templateId; this.#notify(); }
    clearEditingTemplate() { this.#state.editingTemplateId = null; this.#notify(); }

    saveBudgetItem(itemData) {
        const templates = this.getTemplates();
        const budget = this.getCurrentBudget();
        const editingId = this.#state.editingBudgetItemId;

        const newItem = BudgetItemFactory.createFromFormData(itemData, templates);
        const validationErrors = BudgetItemFactory.validateBudgetItem(newItem, templates);
        if (validationErrors.length > 0) return { success: false, errors: validationErrors };

        const degrauErrors = BudgetItemFactory.validateDegrauUniqueness(newItem, budget.budget, templates, editingId);
        if (degrauErrors.length > 0) return { success: false, errors: degrauErrors };

        if (editingId) {
            const index = budget.budget.findIndex(i => i.id === editingId);
            if (index !== -1) {
                const originalItem = budget.budget[index];
                newItem.id = originalItem.id; newItem.createdAt = originalItem.createdAt; newItem.order = originalItem.order;
                budget.budget[index] = newItem;
            }
        } else {
            newItem.order = budget.budget.length;
            budget.budget.push(newItem);
        }
        this.clearEditingBudgetItem();
        this.#persistState();
        return { success: true };
    }

    deleteBudgetItem(itemId) {
        const budget = this.getCurrentBudget();
        budget.budget = budget.budget.filter(i => i.id !== itemId);
        budget.budget.sort((a, b) => a.order - b.order).forEach((it, index) => it.order = index);
        this.#persistStateAndNotify();
    }

    clearBudgetItems() {
        const budget = this.getCurrentBudget();
        if (budget) {
            budget.budget = [];
            this.#persistStateAndNotify();
        }
    }

    setEditingBudgetItem(itemId) { this.#state.editingBudgetItemId = itemId; this.#notify(); }
    clearEditingBudgetItem() { this.#state.editingBudgetItemId = null; this.#notify(); }

    updateItemsOrder(orderedIds) {
        const budget = this.getCurrentBudget();
        const itemMap = new Map(budget.budget.map(item => [item.id, item]));
        const newBudgetItems = orderedIds.map(id => itemMap.get(id)).filter(Boolean);
        newBudgetItems.forEach((item, index) => { item.order = index; });
        budget.budget = newBudgetItems;
        this.#persistStateAndNotify();
    }

    updateGlobalPrices(pricesData) {
        const budget = this.getCurrentBudget();
        budget.prices.global = {
            maoObra: Utils.toSafeNumber(pricesData.maoObra), galvanizacao: Utils.toSafeNumber(pricesData.galvanizacao),
            chataPadrao: Utils.toSafeNumber(pricesData.chataPadrao), redondaPadrao: Utils.toSafeNumber(pricesData.redondaPadrao),
            chapaLateralPadrao: Utils.toSafeNumber(pricesData.chapaLateralPadrao), chapaXadrezPadrao: Utils.toSafeNumber(pricesData.chapaXadrezPadrao),
            corteChpaLateral: Utils.toSafeNumber(pricesData.corteChpaLateral), corteDobraChpaXadrez: Utils.toSafeNumber(pricesData.corteDobraChpaXadrez)
        };
        budget.prices.roundingConfig = { method: pricesData.roundingMethod, decimals: Utils.toSafeNumber(pricesData.roundingDecimals, 2) };
        budget.prices.totalWeightCalcMethod = pricesData.totalWeightCalcMethod;
        this.#persistStateAndNotify();
    }

    resetGlobalPrices() {
        const budget = this.getCurrentBudget();
        budget.prices.global = this.#getDefaultPrices().global;
        budget.prices.roundingConfig = this.#getDefaultPrices().roundingConfig;
        budget.prices.totalWeightCalcMethod = this.#getDefaultPrices().totalWeightCalcMethod;
        this.#persistStateAndNotify();
    }

    addOrUpdateSpecificPrice(key, value, originalKey = null) {
        const budget = this.getCurrentBudget();
        if (!budget.prices.especificos) {
            budget.prices.especificos = {};
        }
        if (originalKey && originalKey !== key) {
            delete budget.prices.especificos[originalKey];
        }
        budget.prices.especificos[key] = Utils.toSafeNumber(value);
        this.#persistStateAndNotify();
    }

    removeSpecificPrice(key) {
        const budget = this.getCurrentBudget();
        if (budget.prices.especificos && budget.prices.especificos[key]) {
            delete budget.prices.especificos[key];
            this.#persistStateAndNotify();
        }
    }

    updateCommercialData(field, value) {
        const budget = this.getCurrentBudget();
        const oldUf = budget.commercialData.ufDestino;
        budget.commercialData[field] = value;
        if(field === 'ufDestino' && oldUf !== value) {
            this.#invalidateAllPricingResults();
        }
        this.#persistStateAndNotify();
    }

    updateLogo(file) {
        const budget = this.getCurrentBudget();
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                budget.commercialData.logoBase64 = e.target.result;
                this.#persistStateAndNotify();
            };
            reader.readAsDataURL(file);
        } else {
            budget.commercialData.logoBase64 = null;
            this.#persistStateAndNotify();
        }
    }

    updateTemplatePricingConfig(templateId, config) {
        const budget = this.getCurrentBudget();
        const template = budget.templates.find(t => t.id === templateId);
        if (template) {
            template.pricingConfig = { ...template.pricingConfig, ...config, configured: true, lastUpdated: Date.now() };
            this.#persistStateAndNotify();
        }
    }

    updateTemplatePricingResult(templateId, result) {
        const budget = this.getCurrentBudget();
        const template = budget.templates.find(t => t.id === templateId);
        if (template) {
            template.pricingConfig.result = result;
            template.pricingConfig.lastCalculated = Date.now();
            this.#persistStateAndNotify();
        }
    }

    copyPricingConfig(sourceTemplateId, targetTemplateIds) {
        const budget = this.getCurrentBudget();
        const sourceTemplate = budget.templates.find(t => t.id === sourceTemplateId);
        if (!sourceTemplate?.pricingConfig) return;

        targetTemplateIds.forEach(targetId => {
            const targetTemplate = budget.templates.find(t => t.id === targetId);
            if (targetTemplate) {
                targetTemplate.pricingConfig = {
                    ...sourceTemplate.pricingConfig,
                    result: null,
                    lastCalculated: null,
                    lastUpdated: Date.now()
                };
            }
        });
        this.#persistStateAndNotify();
    }

    importTemplatesFromCSV(csvContent) {
        const lines = csvContent.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return { success: false, errors: ["CSV inválido ou vazio."] };

        const header = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1);
        const errorMessages = [], newTemplates = [], importedNames = new Set();
        const currentTemplates = this.getTemplates();

        rows.forEach((row, index) => {
            const data = row.split(',').map(d => d.trim());
            const csvRow = header.reduce((obj, nextKey, i) => ({ ...obj, [nextKey]: data[i] }), {});
            try {
                const templateData = TemplateFactory.createFromCSV(csvRow);
                if (currentTemplates.some(t => t.nome.toLowerCase() === templateData.nome.toLowerCase()) || importedNames.has(templateData.nome.toLowerCase())) {
                    throw new Error(`Linha ${index + 2}: Modelo com nome "${templateData.nome}" já existe.`);
                }
                const errors = this.#validator.validateGradeTemplate(templateData);
                if (errors.length > 0) throw new Error(`Linha ${index + 2}: ${errors[0]}`);
                newTemplates.push(templateData);
                importedNames.add(templateData.nome.toLowerCase());
            } catch (error) {
                errorMessages.push(error.message);
            }
        });

        if (newTemplates.length > 0) {
            this.getCurrentBudget().templates.push(...newTemplates);
            this.#persistStateAndNotify();
        }

        return { success: newTemplates.length > 0, importedCount: newTemplates.length, errorCount: errorMessages.length, errors: errorMessages };
    }

    importItemsFromCSV(csvContent) {
        const lines = csvContent.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return { success: false, errors: ["CSV inválido ou vazio."] };

        const header = lines[0].split(',').map(h => h.trim());
        const rows = lines.slice(1);
        const errorMessages = [], newItems = [];
        const allTemplates = this.getTemplates();
        const currentBudget = this.getCurrentBudget();
        const initialIndex = currentBudget.budget.length;

        rows.forEach((row, index) => {
            const data = row.split(',').map(d => d.trim());
            const csvRow = header.reduce((obj, nextKey, i) => ({ ...obj, [nextKey]: data[i] }), {});
            try {
                const newItem = BudgetItemFactory.createFromCSV(csvRow, allTemplates);
                const validationErrors = BudgetItemFactory.validateBudgetItem(newItem, allTemplates);
                if (validationErrors.length > 0) throw new Error(`Linha ${index + 2}: ${validationErrors[0]}`);
                const degrauErrors = BudgetItemFactory.validateDegrauUniqueness(newItem, currentBudget.budget, allTemplates, null);
                if (degrauErrors.length > 0) throw new Error(`Linha ${index + 2}: ${degrauErrors[0]}`);
                newItem.order = initialIndex + newItems.length;
                newItems.push(newItem);
            } catch (error) {
                errorMessages.push(error.message);
            }
        });

        if (newItems.length > 0) {
            currentBudget.budget.push(...newItems);
            this.#persistStateAndNotify();
        }

        return { success: newItems.length > 0, importedCount: newItems.length, errorCount: errorMessages.length, errors: errorMessages };
    }

    // --- Métodos Privados ---
    #persistStateAndNotify() { this.#persistState(); this.#notify(); }
    #persistState() {
        this.#persistenceService.saveAllBudgets(this.#state.budgets);
        this.#persistenceService.saveCurrentBudgetId(this.#state.currentBudgetId);
        this.#persistenceService.saveBudgetCounter(this.#state.budgetCounter);
    }

    #invalidateAllPricingResults() {
        const templates = this.getTemplates();
        templates.forEach(template => {
            if (template.pricingConfig) {
                template.pricingConfig.result = null;
                template.pricingConfig.lastCalculated = null;
            }
        });
    }

    #hydrateBudget(budgetData) {
        const hydrated = {
            ...budgetData, templates: budgetData.templates || [], budget: budgetData.budget || [],
            prices: { ...this.#getDefaultPrices(), ...(budgetData.prices || {}) },
            commercialData: { ...this.#getDefaultCommercialData(), ...(budgetData.commercialData || {}) }
        };
        hydrated.prices.global = { ...this.#getDefaultPrices().global, ...(hydrated.prices.global || {}) };
        hydrated.prices.especificos = hydrated.prices.especificos || {};
        hydrated.templates.forEach(t => {
            if (!t.pricingConfig) t.pricingConfig = this.#getDefaultTemplatePricingConfig();
            if (!t.templateType) t.templateType = 'grade';
        });
        return hydrated;
    }

    #getDefaultPrices() { return { global: { ...INTEGRATED_DEFAULTS.PRICES }, especificos: {}, roundingConfig: { method: 'ceil', decimals: 2 }, totalWeightCalcMethod: 'unit' }; }
    #getDefaultCommercialData() {
        return {
            headerLine1: COMPANY_INFO.name, headerLine2: COMPANY_INFO.address,
            headerLine3: `CNPJ: ${COMPANY_INFO.cnpj} | IE: ${COMPANY_INFO.ie} | Fone: ${COMPANY_INFO.phone}`,
            clientName: "", clientIdentifier: "", ufDestino: "",
            deliveryTime: "", paymentTerms: "(Sujeito a análise de crédito)",
            shippingInfo: "FOB (Material a retirar, indicar transportadora)", sellerName: "",
            sellerContact: "", quoteNumber: "0000",
            validUntil: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            materialType: "AÇO CARBONO"
        };
    }
    #getDefaultTemplatePricingConfig() {
        return {
            tipoConfiguracao: "", lucroLiquido: 20, despesasFixas: 9.5, comissoesInternas: 3.5, comissoesRepres: 0,
            despesasFinanceiras: 0.26, csllIrpj: 2.81, icmsMaterial: 18, ipiMaterial: 3.25, ipiRevenda: 0,
            ipiVendaFinal: 3.25, fretePerc: 0, freteValor: 0, stCompraQtde: 0, stCompraUnit: 0,
            taxaEnergiaQtde: 0, taxaEnergiaUnit: 0, tipoOperacao: "venda", vendaEstaleiro: false,
            vendaExportacao: false, allIPIsZero: true, configured: false, lastCalculated: null, result: null,
        };
    }
}