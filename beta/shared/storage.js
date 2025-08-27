export class Storage {
    constructor(espacoDeNomes = "unified_app") {
        this.namespace = espacoDeNomes;
        this.isAvailable = this.checkAvailability();
    }

    checkAvailability() {
        try {
            const testKey = "storage_test";
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            console.error("LocalStorage não está disponível.", error);
            return false;
        }
    }

    getKey(chave) {
        return `${this.namespace}_${chave}`;
    }

    save(chave, dados) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(this.getKey(chave), JSON.stringify(dados));
            return true;
        } catch (error) {
            console.error(`Erro ao salvar dados para a chave ${chave}:`, error);
            return false;
        }
    }

    load(chave, valorPadrao = null) {
        if (!this.isAvailable) return valorPadrao;
        try {
            const dadosSalvos = localStorage.getItem(this.getKey(chave));
            return dadosSalvos ? JSON.parse(dadosSalvos) : valorPadrao;
        } catch (error) {
            console.error(`Erro ao carregar dados da chave ${chave}:`, error);
            return valorPadrao;
        }
    }

    remove(chave) {
        if (!this.isAvailable) return false;
        try {
            localStorage.removeItem(this.getKey(chave));
            return true;
        } catch (error) {
            console.error(`Erro ao remover a chave ${chave}:`, error);
            return false;
        }
    }

    clear() {
        if (!this.isAvailable) return false;
        try {
            const chavesParaRemover = Object.keys(localStorage)
            .filter(chave => chave.startsWith(`${this.namespace}_`));
            chavesParaRemover.forEach(chave => localStorage.removeItem(chave));
            return true;
        } catch (error) {
            console.error(`Erro ao limpar o namespace ${this.namespace}:`, error);
            return false;
        }
    }

    exportData() {
        if (!this.isAvailable) return null;

        const dadosExportados = {};
        const chavesDoNamespace = Object.keys(localStorage)
        .filter(chave => chave.startsWith(`${this.namespace}_`));

        chavesDoNamespace.forEach(chaveCompleta => {
            const chaveCurta = chaveCompleta.replace(`${this.namespace}_`, '');
            try {
                dadosExportados[chaveCurta] = JSON.parse(localStorage.getItem(chaveCompleta));
            } catch (e) {
                dadosExportados[chaveCurta] = localStorage.getItem(chaveCompleta);
            }
        });

        return {
            ...dadosExportados,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(dadosParaImportar) {
        if (!this.isAvailable || !dadosParaImportar) return false;
        try {
            Object.entries(dadosParaImportar).forEach(([chave, valor]) => {
                if (chave !== 'exportDate' && chave !== 'version') {
                    this.save(chave, valor);
                }
            });
            return true;
        } catch (error) {
            console.error("Erro ao importar dados:", error);
            return false;
        }
    }

    getStats() {
        if (!this.isAvailable) return null;

        const chavesDoNamespace = Object.keys(localStorage)
        .filter(chave => chave.startsWith(`${this.namespace}_`));

        let tamanhoTotal = 0;
        const estatisticasChaves = chavesDoNamespace.map(chaveCompleta => {
            const tamanho = localStorage.getItem(chaveCompleta).length;
            tamanhoTotal += tamanho;
            return {
                key: chaveCompleta.replace(`${this.namespace}_`, ''),
                size: tamanho
            };
        });

        return {
            totalKeys: chavesDoNamespace.length,
            totalSize: tamanhoTotal,
            keyStats: estatisticasChaves
        };
    }
}


export class GradesStorage extends Storage {
    constructor() {
        super("grades");
        this.keys = {
            TEMPLATES: "templates",
            BUDGET: "budget",
            PRICES: "prices"
        };
    }

    saveTemplates(templates) { return this.save(this.keys.TEMPLATES, templates); }
    loadTemplates() { return this.load(this.keys.TEMPLATES, []); }
    clearTemplates() { return this.remove(this.keys.TEMPLATES); }

    saveBudget(budgetItems) { return this.save(this.keys.BUDGET, budgetItems); }
    loadBudget() { return this.load(this.keys.BUDGET, []); }
    clearBudget() { return this.remove(this.keys.BUDGET); }

    savePrices(prices) { return this.save(this.keys.PRICES, prices); }
    loadPrices() {
        const defaultPrices = {
            global: {
                maoObra: 0, galvanizacao: 0, chataPadrao: 0, redondaPadrao: 0,
                chapaLateralPadrao: 0, chapaXadrezPadrao: 0,
                corteChpaLateral: 0, corteDobraChpaXadrez: 0
            },
            especificos: {}
        };
        return this.load(this.keys.PRICES, defaultPrices);
    }
    clearPrices() { return this.remove(this.keys.PRICES); }
}

export class PricingStorage extends Storage {
    constructor() {
        super("pricing");
        this.keys = {
            ALIQUOTAS: "aliquotas",
            SETTINGS: "settings",
            HISTORY: "history"
        };
    }

    saveAliquotas(aliquotas) { return this.save(this.keys.ALIQUOTAS, aliquotas); }
    loadAliquotas() { return this.load(this.keys.ALIQUOTAS, {}); }

    saveSettings(settings) { return this.save(this.keys.SETTINGS, settings); }
    loadSettings() { return this.load(this.keys.SETTINGS, {}); }

    saveHistory(history) { return this.save(this.keys.HISTORY, history); }
    loadHistory() { return this.load(this.keys.HISTORY, []); }

    addToHistory(historyEntry) {
        const history = this.loadHistory();
        history.unshift({
            ...historyEntry,
            timestamp: Date.now(),
            id: Date.now().toString()
        });

        // Limita o histórico a 50 entradas
        if (history.length > 50) {
            history.splice(50);
        }

        return this.saveHistory(history);
    }

    clearHistory() { return this.remove(this.keys.HISTORY); }
}