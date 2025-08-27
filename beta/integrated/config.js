export const INTEGRATED_CONFIG = {
    UI: {
        AUTO_SAVE_DELAY: 500,
        NOTIFICATION_DURATION: 4000,
        TAB_TRANSITION_DURATION: 300,
        SCROLL_BEHAVIOR: 'smooth'
    },
    BUDGET: {
        MAX_BUDGETS: 5,
        AUTO_SAVE_ENABLED: true,
        DEFAULT_NAME_PREFIX: 'Orçamento',
        STORAGE_KEY_PREFIX: 'integrated_budget_'
    },
    VALIDATION: {
        REAL_TIME_DELAY: 300,
        SHOW_SUCCESS_INDICATORS: true,
        HIGHLIGHT_ERRORS: true
    },
    PRICING: {
        AUTO_CALCULATE_ON_CHANGE: true,
        SHOW_DETAILED_CALCULATIONS: true,
        CACHE_RESULTS: false
    },
    REPORTS: {
        AUTO_UPDATE: true,
        SHOW_EMPTY_SECTIONS: false,
        EXPORT_FORMAT: 'pdf'
    },
    MESSAGES: {
        BUDGET_SWITCHED: "Orçamento alterado",
        BUDGET_CREATED: "Novo orçamento criado",
        BUDGET_CLOSED: "Orçamento fechado",
        AUTO_SAVED: "Dados salvos automaticamente",
        PRICING_CALCULATED: "Preços calculados com sucesso",
        COMMERCIAL_BUDGET_GENERATED: "Orçamento comercial gerado",
    },
    LAYOUT: {
        SIDEBAR_WIDTH: '300px',
        HEADER_HEIGHT: '80px',
        TAB_HEIGHT: '50px',
        RESPONSIVE_BREAKPOINT: '768px'
    }
};

export const INTEGRATED_SHORTCUTS = {
    KEYBOARD: {
        NEW_BUDGET: 'Ctrl+N',
        SAVE_BUDGET: 'Ctrl+S',
        SWITCH_TAB_NEXT: 'Ctrl+Tab',
        SWITCH_TAB_PREV: 'Ctrl+Shift+Tab',
        CALCULATE_PRICING: 'F9',
        ADD_TEMPLATE: 'Ctrl+T',
        ADD_ITEM: 'Ctrl+I'
    }
};

export const INTEGRATED_DEFAULTS = {
    TEMPLATE: {
        densidade: 7850,
        margem: 2,
        bp_esp: 3,
        bp_larg: 30,
        bf_esp: 3,
        bf_larg: 30,
        malha_menor: 33,
        malha_maior: 100
    },
    PRICING: {
        icmsMaterial: 18,
        ipiMaterial: 3.25,
        tipoOperacao: 'venda',
        lucroLiquido: 20,
        despesasFixas: 9.5,
        comissoesInternas: 3.5,
        csllIrpj: 2.81
    },
    PRICES: {
        maoObra: 2.65,
        galvanizacao: 2.75,
        chataPadrao: 7.4,
        redondaPadrao: 7.96,
        chapaLateralPadrao: 6.1,
        chapaXadrezPadrao: 6.5,
        corteChpaLateral: 2,
        corteDobraChpaXadrez: 3
    }
};

export class IntegratedUtils {
    static generateBudgetName(nomesExistentes = []) {
        let nomeGerado;
        let contador = 1;
        do {
            nomeGerado = `${INTEGRATED_CONFIG.BUDGET.DEFAULT_NAME_PREFIX} ${contador}`;
            contador++;
        } while (nomesExistentes.includes(nomeGerado));
        return nomeGerado;
    }

    static canCloseBudget(budget, totalDeOrcamentos) {
        if (totalDeOrcamentos <= 1) {
            return { canClose: false, reason: "Não é possível fechar o último orçamento" };
        }
        const hasData = budget.templates.length > 0 || budget.budget.length > 0;
        if (hasData) {
            return { canClose: true, needsConfirmation: true, reason: "Este orçamento possui dados" };
        }
        return { canClose: true, needsConfirmation: false };
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + ['Bytes', 'KB', 'MB', 'GB'][i];
    }

    static generateUIId(prefix = 'ui') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    static debounce(func, delay = INTEGRATED_CONFIG.UI.AUTO_SAVE_DELAY) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    static validatePricingConfig(config) {
        const camposFaltando = ['tipoConfiguracao', 'ufDestino'].filter(field => !config[field]);
        if (camposFaltando.length > 0) {
            return { valid: false, missing: camposFaltando };
        }
        return { valid: true };
    }

    static calculateBudgetStats(budget) {
        const totalTemplates = budget.templates.length;
        const totalItems = budget.budget.length;
        const hasCustomPrices = Object.keys(budget.prices.especificos || {}).length > 0;

        const timestamps = [
            budget.createdAt || 0,
            ...budget.templates.map(t => t.createdAt || 0),
            ...budget.budget.map(i => i.createdAt || 0)
        ];
        const lastModified = Math.max(...timestamps);

        return {
            totalTemplates: totalTemplates,
            totalItems: totalItems,
            hasCustomPrices: hasCustomPrices,
            lastModified: lastModified,
            isEmpty: totalTemplates === 0 && totalItems === 0
        };
    }

    static exportBudgetData(budget, format = 'json') {
        const exportObject = {
            metadata: {
                name: budget.name,
                createdAt: budget.createdAt,
                exportedAt: Date.now(),
                version: "1.0",
                format: format
            },
            data: {
                templates: budget.templates,
                budget: budget.budget,
                prices: budget.prices,
                pricingConfig: budget.pricingConfig
            },
            stats: this.calculateBudgetStats(budget)
        };

        switch (format) {
            case 'json':
                return JSON.stringify(exportObject, null, 2);
            case 'csv':
                return this.convertToCSV(exportObject);
            default:
                return exportObject;
        }
    }

    static convertToCSV(budgetData) {
        const items = budgetData.data.budget || [];
        if (items.length === 0) {
            return "Nenhum item para exportar";
        }

        const header = ["Descrição", "Template", "Quantidade", "Largura", "Comprimento"];
        const rows = items.map(item => [
            item.descricao,
            item.templateNome,
            item.quantidade,
            item.largura,
            item.comprimento
        ]);

        const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
        return csvContent;
    }
}