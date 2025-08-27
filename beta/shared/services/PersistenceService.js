/**
 * PersistenceService centraliza e abstrai toda a interação com o localStorage,
 * garantindo um ponto único de leitura e escrita para o estado da aplicação.
 * Isso desacopla a lógica de armazenamento da lógica de negócio do Store.
 */
export class PersistenceService {
    constructor(namespace = "budget_app_v2") {
        this.namespace = namespace;
        this.isAvailable = this._checkAvailability();
        if (!this.isAvailable) {
            console.error("LocalStorage não está disponível. A aplicação não poderá salvar os dados.");
            // Em uma aplicação real, poderíamos notificar o usuário aqui.
        }
    }

    _checkAvailability() {
        try {
            const testKey = "__storage_test__";
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    _getKey(key) {
        return `${this.namespace}_${key}`;
    }

    _save(key, data) {
        if (!this.isAvailable) return false;
        try {
            localStorage.setItem(this._getKey(key), JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Erro ao salvar dados para a chave ${key}:`, error);
            return false;
        }
    }

    _load(key, defaultValue = null) {
        if (!this.isAvailable) return defaultValue;
        try {
            const savedData = localStorage.getItem(this._getKey(key));
            return savedData ? JSON.parse(savedData) : defaultValue;
        } catch (error) {
            console.error(`Erro ao carregar dados da chave ${key}:`, error);
            return defaultValue;
        }
    }

    // --- Métodos Públicos para o BudgetStore ---

    loadAllBudgets() {
        return this._load("multi_budgets", []);
    }

    saveAllBudgets(budgets) {
        return this._save("multi_budgets", budgets);
    }

    loadCurrentBudgetId() {
        return this._load("current_budget_id", null);
    }

    saveCurrentBudgetId(id) {
        return this._save("current_budget_id", id);
    }

    loadBudgetCounter() {
        return this._load("budget_counter", 1);
    }

    saveBudgetCounter(count) {
        return this._save("budget_counter", count);
    }
}