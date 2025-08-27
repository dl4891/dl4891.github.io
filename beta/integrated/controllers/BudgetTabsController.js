import { NOTIFICATION_TYPES } from "../../shared/config.js";

export class BudgetTabsController {
    constructor(budgetStore, notificationManager) {
        this.budgetStore = budgetStore;
        this.notifications = notificationManager;
    }

    initialize() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        document.getElementById("new-budget-btn")?.addEventListener("click", () => this.createNewBudget());
        document.getElementById("rename-budget-btn")?.addEventListener("click", () => this.openRenameModal());
        document.getElementById("duplicate-budget-btn")?.addEventListener("click", () => this.duplicateCurrentBudget());
        document.getElementById("export-budget-btn")?.addEventListener("click", () => this.exportCurrentBudget());

        const importBtn = document.getElementById("import-budget-btn");
        const importInput = document.getElementById("import-budget-input");
        if (importBtn && importInput) {
            importBtn.addEventListener("click", () => importInput.click());
            importInput.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => this.importBudget(ev.target.result);
                    reader.readAsText(file);
                }
                e.target.value = null;
            });
        }

        const containerAbas = document.getElementById("budget-tabs");
        containerAbas?.addEventListener("click", (event) => {
            const abaClicada = event.target.closest(".budget-tab");
            if (event.target.closest(".budget-tab-close")) {
                event.stopPropagation();
                this.closeBudget(abaClicada.dataset.budgetId);
            } else if (abaClicada) {
                this.budgetStore.switchToBudget(abaClicada.dataset.budgetId);
            }
        });

        const modalRename = document.getElementById("modal-rename-budget");
        if(modalRename) {
            modalRename.querySelector('.is-success').addEventListener('click', () => this.saveBudgetName());
            modalRename.querySelectorAll('.delete, .modal-background, .button:not(.is-success)')
            .forEach(el => el.addEventListener('click', () => this.closeRenameModal()));
        }
    }

    createNewBudget() {
        const novoOrcamento = this.budgetStore.createNewBudget();
        this.notifications.show(`Novo orçamento criado: ${novoOrcamento.name}`, NOTIFICATION_TYPES.SUCCESS);
    }

    closeBudget(budgetId) {
        if (this.budgetStore.getAllBudgets().length <= 1) {
            window.app.showInfo("Ação Inválida", "<p>Não é possível fechar o último orçamento restante.</p>");
            return;
        }

        const budgetToClose = this.budgetStore.getAllBudgets().find(b => b.id === budgetId);
        const hasData = budgetToClose.templates.length > 0 || budgetToClose.budget.length > 0;

        if (hasData) {
            window.app.showConfirmation(
                'Fechar Orçamento com Dados',
                '<p>Este orçamento possui dados. Tem certeza que deseja fechá-lo? Esta ação não pode ser desfeita.</p>',
                () => this.budgetStore.closeBudget(budgetId),
                { confirmText: 'Fechar Mesmo Assim', type: 'is-danger' }
            );
        } else {
            this.budgetStore.closeBudget(budgetId);
        }
    }

    openRenameModal() {
        const orcamentoAtual = this.budgetStore.getCurrentBudget();
        document.getElementById("budget-name-input").value = orcamentoAtual.name;
        document.getElementById("modal-rename-budget").classList.add("is-active");
    }

    closeRenameModal() {
        document.getElementById("modal-rename-budget").classList.remove("is-active");
    }

    saveBudgetName() {
        const novoNome = document.getElementById("budget-name-input").value.trim();
        const budgetId = this.budgetStore.getCurrentBudgetId();
        if (novoNome && budgetId) {
            this.budgetStore.renameBudget(budgetId, novoNome);
            this.closeRenameModal();
            this.notifications.show("Orçamento renomeado com sucesso", NOTIFICATION_TYPES.SUCCESS);
        } else {
            this.notifications.show("Nome não pode estar vazio", NOTIFICATION_TYPES.WARNING);
        }
    }

    duplicateCurrentBudget() {
        const budgetId = this.budgetStore.getCurrentBudgetId();
        const duplicado = this.budgetStore.duplicateBudget(budgetId);
        if (duplicado) {
            this.notifications.show(`Orçamento duplicado para: ${duplicado.name}`, NOTIFICATION_TYPES.SUCCESS);
        }
    }

    importBudget(fileContent) {
        const imported = this.budgetStore.importBudget(fileContent);
        if (imported) {
            this.notifications.show(`Orçamento importado: ${imported.name}`, NOTIFICATION_TYPES.SUCCESS);
        } else {
            this.notifications.show("Falha ao importar. Verifique o arquivo.", NOTIFICATION_TYPES.DANGER);
        }
    }

    exportCurrentBudget() {
        const budgetId = this.budgetStore.getCurrentBudgetId();
        const exportData = this.budgetStore.exportBudget(budgetId);
        if (!exportData) return;

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        const safeBudgetName = exportData.name.replace(/[^a-zA-Z0-9]/g, '_');
        const dateString = new Date().toISOString().split('T')[0];
        anchor.download = `orcamento-${safeBudgetName}-${dateString}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);

        this.notifications.show("Orçamento exportado com sucesso!", NOTIFICATION_TYPES.INFO);
    }

    updateUI() {
        this.updateBudgetTabs();
        this.updateCurrentBudgetName();
    }

    updateBudgetTabs() {
        const containerAbas = document.getElementById("budget-tabs");
        if (!containerAbas) return;

        const budgets = this.budgetStore.getAllBudgets();
        const currentId = this.budgetStore.getCurrentBudgetId();

        containerAbas.innerHTML = "";
        budgets.forEach(budget => {
            const abaElemento = document.createElement("div");
            abaElemento.className = "budget-tab";
            if (budget.id === currentId) abaElemento.classList.add("active");
            abaElemento.dataset.budgetId = budget.id;
            abaElemento.innerHTML = `<span class="budget-tab-name">${budget.name}</span><button class="budget-tab-close" title="Fechar orçamento">&times;</button>`;
            containerAbas.appendChild(abaElemento);
        });
    }

    updateCurrentBudgetName() {
        const orcamentoAtual = this.budgetStore.getCurrentBudget();
        const nameElement = document.getElementById("current-budget-name");
        if (orcamentoAtual && nameElement) {
            nameElement.textContent = orcamentoAtual.name;
        }
    }
}