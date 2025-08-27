import { BusinessValidator } from "./shared/validation.js";
import { NOTIFICATION_TYPES, MESSAGES } from "./shared/config.js";
import { TemplateController } from "./grades/TemplateController.js";
import { BudgetController } from "./grades/BudgetController.js";
import { PriceController } from "./grades/PriceController.js";
import { PricingController } from "./pricing/PricingController.js";
import { AliquotasController } from "./pricing/AliquotasController.js";
import { NavigationController } from "./integrated/controllers/NavigationController.js";
import { ReportController } from "./integrated/controllers/ReportController.js";
import { BudgetTabsController } from "./integrated/controllers/BudgetTabsController.js";
import { ModalController } from "./grades/modals.js";
import { NotificationManager } from "./integrated/controllers/NotificationManager.js";
import { ValidationManager } from "./integrated/controllers/ValidationManager.js";
import { ModalManager } from "./integrated/controllers/ModalManager.js";
import { BudgetStore } from "./store/BudgetStore.js";

// Importação de todos os componentes
import './integrated/components/TemplateItem.js';
import './integrated/components/BudgetItem.js';
import './integrated/components/SpecificPriceItem.js';
import './integrated/components/SpecificPriceForm.js';
import './integrated/components/BudgetItemForm.js';
import './integrated/components/TemplateItemForm.js';
import './integrated/components/ClampTemplateForm.js';
import './integrated/components/TemplateList.js';
import './integrated/components/GlobalPricesForm.js';
import './integrated/components/SpecificPricesPanel.js';
import './integrated/components/PricingAccordion.js';
import './integrated/components/PricingTemplatePanel.js';
import './integrated/components/BudgetSummary.js';
import './integrated/components/BudgetList.js';
import './integrated/components/CommercialBudget.js';
import './integrated/components/DetailedReport.js';
import './integrated/components/DetailedReportItem.js';
import './integrated/components/ConsolidatedReport.js';
import './integrated/components/CalculationMemory.js';
import './integrated/components/ProposalForm.js';

export class Application {
    constructor() {
        window.app = this;
        this.templatesMap = new Map();
        this.initializeServices();
        this.initializeControllers();
        this.initializeManagers();
        this.init();
    }

    initializeServices() {
        this.validator = new BusinessValidator();
        this.notifications = new NotificationManager();
        this.budgetStore = new BudgetStore(this.validator);
        this.modalManager = new ModalManager();
    }

    initializeControllers() {
        this.templateController = new TemplateController(this.budgetStore, this.notifications, this.validator);
        this.budgetController = new BudgetController(this.budgetStore, this.notifications, this);
        this.priceController = new PriceController(this.budgetStore, this.notifications);
        this.navigationController = new NavigationController();
        this.budgetTabsController = new BudgetTabsController(this.budgetStore, this.notifications);
        this.reportController = new ReportController(this, this.notifications);
        this.pricingController = new PricingController(this.budgetStore, this.templateController, this.budgetController, this.priceController, this.notifications);
        this.aliquotasController = new AliquotasController(this.notifications, this);
        this.modalController = new ModalController(this, this.priceController, this.validator, this.notifications);
    }

    initializeManagers() {
        this.validationManager = new ValidationManager(this.validator, this.notifications);
    }

    async init() {
        this.bindComponents();
        this.setupStoreSubscription();
        this.setupEventListeners();
        this.budgetStore.init();
        this.budgetTabsController.initialize();
        this.navigationController.switchTab("templates");
    }

    setupStoreSubscription() {
        this.budgetStore.subscribe(() => this.updateAllViews());
    }

    setupEventListeners() {
        this.setupFormEvents();
        this.setupTemplateListEvents();
        this.setupBudgetListEvents();
        this.setupPricesListEvents();
        this.setupPricingEvents();
        this.registerTabHandlers();

        const exportPdfBtn = document.getElementById("export-pdf-btn");
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener("click", () => this.reportController.exportProposalAsPDF());
        }
    }

    updateAllViews() {
        this.updateTemplatesMap();
        this.budgetTabsController.updateUI();
        const activeTab = this.navigationController.getCurrentTab();
        const handler = this.navigationController.manipuladoresAbas[activeTab];
        if (handler) handler();
    }

    bindComponents() {
        this.itemFormComponent = document.getElementById('item-form-component');
        this.templateListComponent = document.getElementById('template-list-component');
        this.globalPricesFormComponent = document.getElementById('global-prices-form-component');
        this.specificPricesPanelComponent = document.getElementById('specific-prices-panel-component');
        this.pricingAccordionComponent = document.getElementById('pricing-accordion-component');
        this.summaryComponent = document.getElementById('budget-summary-component');
        this.budgetListComponent = document.getElementById('budget-list-component');
        this.commercialBudgetComponent = document.getElementById('commercial-budget-component');
        this.detailedReportComponent = document.getElementById('detailed-report-component');
        this.consolidatedReportComponent = document.getElementById('consolidated-report-component');
        this.calculationMemoryComponent = document.getElementById('calculation-memory-component');
        this.proposalFormComponent = document.getElementById('proposal-form-component');
    }

    updateTemplatesMap() {
        this.templatesMap.clear();
        this.budgetStore.getTemplates().forEach(t => this.templatesMap.set(t.id, t));
    }

    setupFormEvents() {
        this.itemFormComponent.addEventListener('save-item', e => {
            const result = this.budgetController.add(e.detail);
            if (result.success) {
                const message = this.budgetStore.isEditingBudget() ? MESSAGES.SUCCESS.itemUpdated : MESSAGES.SUCCESS.itemAdded;
                this.notifications.show(message, NOTIFICATION_TYPES.SUCCESS);
                this.budgetController.cancelEdit();
            } else {
                this.notifications.show(result.errors.join('<br>'), NOTIFICATION_TYPES.WARNING);
            }
        });

        this.itemFormComponent.addEventListener('import-items', (e) => this.handleItemImport(e.detail.file));
        this.itemFormComponent.addEventListener('cancel-edit', () => this.budgetController.cancelEdit());
        this.itemFormComponent.addEventListener('clear-budget', () => this.budgetController.clear());

        this.globalPricesFormComponent.addEventListener("save-global-prices", () => this.priceController.saveGlobalPrices());
        this.globalPricesFormComponent.addEventListener("reset-global-prices", () => this.priceController.resetPrices());
        this.globalPricesFormComponent.addEventListener("material-type-change", e => {
            this.budgetStore.updateCommercialData('materialType', e.detail.materialType);
            this.notifications.show("Tipo de material atualizado.", NOTIFICATION_TYPES.INFO);
        });
        this.proposalFormComponent.addEventListener('update-commercial-data', e => {
            if (e.detail.field === 'ufDestino') {
                const oldUf = this.budgetStore.getCommercialData().ufDestino;
                if (oldUf !== e.detail.value) {
                    this.notifications.show("UF alterada. Cálculos de pricing foram invalidados.", NOTIFICATION_TYPES.WARNING);
                }
            }
            this.budgetStore.updateCommercialData(e.detail.field, e.detail.value);
        });
        this.proposalFormComponent.addEventListener('update-logo', async (e) => {
            const { file } = e.detail;
            if (file) {
                const validationResult = await this.validator.validateLogoFile(file);
                if (!validationResult.isValid) {
                    this.notifications.show(validationResult.message, NOTIFICATION_TYPES.DANGER);
                    return;
                }
            }
            this.budgetStore.updateLogo(file);
        });
    }

    handleItemImport(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.budgetController.importItemsFromCSV(e.target.result);
            };
            reader.readAsText(file);
        }
    }

    setupTemplateListEvents() {
        this.templateListComponent.addEventListener('open-template-modal', () => this.openTemplateModal());
        this.templateListComponent.addEventListener('edit-template', e => this.openTemplateModal(e.detail.templateId));
        this.templateListComponent.addEventListener('delete-template', e => this.showDeleteConfirmationModal(e.detail.templateId));
        this.templateListComponent.addEventListener('import-templates-csv', (event) => {
            if (event.detail.content) {
                this.templateController.importFromCSV(event.detail.content);
            }
        });
    }

    setupBudgetListEvents() {
        this.budgetListComponent.addEventListener('edit-item', e => this.budgetStore.setEditingBudgetItem(e.detail.itemId));
        this.budgetListComponent.addEventListener('remove-item', e => this.budgetController.remove(e.detail.itemId));
        this.budgetListComponent.addEventListener('reorder-items', e => this.budgetStore.updateItemsOrder(e.detail.orderedIds));
        this.budgetListComponent.addEventListener('move-item', e => this.budgetController.moveItemToPosition(e.detail.itemId, e.detail.newPosition));
    }

    setupPricesListEvents() {
        const pricesContainer = this.specificPricesPanelComponent;
        if (!pricesContainer) return;

        pricesContainer.addEventListener('add-specific-price', (event) => {
            const { type } = event.detail;
            switch (type) {
                case 'chata': this.modalController.openChataModal(); break;
                case 'redonda': this.modalController.openRedondaModal(); break;
                case 'chapa_lateral': this.modalController.openChapaLateralModal(); break;
                case 'chapa_xadrez': this.modalController.openChapaXadrezModal(); break;
            }
        });

        pricesContainer.addEventListener('edit-specific-price', (event) => {
            const { tipo, dimensao, preco } = event.detail;
            this.modalController.editSpecificPrice(tipo, dimensao, preco);
        });

        pricesContainer.addEventListener('remove-specific-price', (event) => {
            const { tipo, dimensao } = event.detail;
            this.modalController.removeSpecificPrice(tipo, dimensao);
        });
    }

    setupPricingEvents() {
        const pricingAccordion = this.pricingAccordionComponent;
        if (pricingAccordion) {
            pricingAccordion.addEventListener('calculate-pricing', async (e) => {
                const { templateId, formData } = e.detail;
                await this.pricingController.calculateTemplatePricing(templateId, formData);
            });

            pricingAccordion.addEventListener('bulk-copy', () => {
                const sourceId = pricingAccordion.shadowRoot.getElementById('bulk-template-source').value;
                if (!sourceId) {
                    this.notifications.show("Selecione um modelo de origem para copiar.", NOTIFICATION_TYPES.WARNING);
                    return;
                }
                const targetIds = this.budgetStore.getTemplatesWithPricingStatus()
                .filter(t => !t.isConfigured && t.hasItems)
                .map(t => t.id);
                if(targetIds.length === 0) {
                    this.notifications.show("Todos os outros modelos com itens já estão configurados.", NOTIFICATION_TYPES.INFO);
                    return;
                }
                this.budgetStore.copyPricingConfig(sourceId, targetIds);
                this.notifications.show(`Configuração copiada para ${targetIds.length} modelo(s).`, NOTIFICATION_TYPES.SUCCESS);
            });

            pricingAccordion.addEventListener('calculate-all', async () => {
                await this.pricingController.calculateAllTemplatesPricing();
            });
        }

        document.getElementById("toggleAliquotas")?.addEventListener("click", () => this.aliquotasController.toggleAliquotas());
        document.getElementById("salvarAliquotas")?.addEventListener("click", () => this.aliquotasController.salvarAliquotas());
        document.getElementById("resetAliquotas")?.addEventListener("click", () => this.aliquotasController.resetAliquotas());
    }

    registerTabHandlers() {
        const handlers = {
            "templates": () => this.updateTemplateViews(),
            "precos": () => this.updatePricesViews(),
            "itens": () => this.updateBudgetViews(),
            "relatorios": () => this.updateReports(),
            "memoria": () => this.updateCalculationMemory(),
            "proposta": () => this.updateProposalForm(),
            "pricing": () => this.updatePricingInterface(),
            "orcamento": () => this.updateCommercialBudget(),
        };
        for (const [tab, handler] of Object.entries(handlers)) {
            this.navigationController.registerTabHandler(tab, handler);
        }
    }

    updateTemplateViews() {
        this.templateListComponent.templates = this.budgetStore.getTemplatesSortedByDate();
        this.templateListComponent.editingTemplateId = this.budgetStore.getEditingTemplateId();
    }

    updatePricesViews() {
        const prices = this.budgetStore.getPrices();
        const commercialData = this.budgetStore.getCommercialData();
        this.globalPricesFormComponent.prices = { ...prices.global };
        this.globalPricesFormComponent.materialType = commercialData.materialType;
        this.globalPricesFormComponent.roundingConfig = { ...prices.roundingConfig };
        this.globalPricesFormComponent.totalWeightCalcMethod = prices.totalWeightCalcMethod;
        this.specificPricesPanelComponent.specificPrices = { ...prices.especificos };
        this.specificPricesPanelComponent.globalPrices = { ...prices.global };
    }

    updateBudgetViews() {
        this.itemFormComponent.templates = this.budgetStore.getTemplatesSortedByName();
        this.itemFormComponent.budgetItems = this.budgetStore.getBudgetItems();
        this.itemFormComponent.isEditing = this.budgetStore.isEditingBudget();
        this.itemFormComponent.editingItem = this.budgetStore.getBudgetItemById(this.budgetStore.getEditingBudgetItemId());
        this.budgetController.updateSummaryView();
        this.budgetController.updateBudgetListView();
    }

    updateReports() { this.reportController.updateReportService(); this.detailedReportComponent.reportData = this.reportController.generateIndividualReportData(); this.consolidatedReportComponent.reportData = this.reportController.generateConsolidatedReportData(); }
    updateCalculationMemory() { this.reportController.updateReportService(); this.calculationMemoryComponent.memoryData = this.reportController.generateMemoriaCalculoData(); }
    updateProposalForm() { this.proposalFormComponent.commercialData = { ...this.budgetStore.getCommercialData() }; }
    updatePricingInterface() {
        const templatesWithStatus = this.budgetStore.getTemplatesWithPricingStatus();
        const ufDestino = this.budgetStore.getCommercialData()?.ufDestino || "";
        const templatesParaComponente = templatesWithStatus.map(t => ({ ...t, ufDestino }));
        this.pricingAccordionComponent.templatesWithStatus = [...templatesParaComponente];
    }
    updateCommercialBudget() {
        const allTemplates = this.budgetStore.getTemplates();
        const allPricingResults = allTemplates.reduce((acc, t) => {
            acc[t.id] = t.pricingConfig?.result || null; return acc; }, {});
        this.commercialBudgetComponent.budgetItems = [...this.budgetStore.getBudgetItems()];
        this.commercialBudgetComponent.templates = [...allTemplates];
        this.commercialBudgetComponent.pricingResults = { ...allPricingResults };
    }

    openTemplateModal(templateId = null) {
        this.modalController.openTemplateModal(templateId);
    }

    closeTemplateModal() {
        this.modalController.closeTemplateModal();
    }

    showDeleteConfirmationModal(templateId) {
        const template = this.budgetStore.getTemplateById(templateId);
        if (!template) return;
        const itemsUsing = this.budgetStore.getBudgetItems().filter(i => i.templateId === templateId);
        let message = `<p>Excluir o modelo <strong>"${template.nome}"</strong>?</p>`;
        if (itemsUsing.length > 0) {
            message += `<div class="notification is-warning mt-4"><p><strong>Atenção:</strong> ${itemsUsing.length} item(ns) do orçamento que usam este modelo também serão removidos.</p></div>`;
        }
        this.showConfirmation('Confirmar Exclusão', message, () => {
            this.templateController.delete(templateId);
        });
    }

    showConfirmation(title, message, onConfirm, options = {}) {
        this.modalManager.showConfirm({ title, message, onConfirm, ...options });
    }

    showInfo(title, message) {
        this.modalManager.showInfo({ title, message });
    }
}