import { MESSAGES, NOTIFICATION_TYPES } from "../shared/config.js";

export class TemplateController {
    constructor(budgetStore, notificationManager, validator) {
        this.store = budgetStore;
        this.notifications = notificationManager;
        this.validator = validator;
    }

    save(formData, templateType = 'grade') {
        const isEditing = !!this.store.getEditingTemplateId();
        const result = this.store.saveTemplate(formData, templateType);

        if (!result.success) {
            this.notifications.show(result.errors.join('<br>'), NOTIFICATION_TYPES.WARNING);
            return false;
        }

        this.notifications.show(
            isEditing ? MESSAGES.SUCCESS.templateUpdated : MESSAGES.SUCCESS.templateSaved,
            NOTIFICATION_TYPES.SUCCESS
        );
        return true;
    }

    edit(templateId) {
        this.store.setEditingTemplate(templateId);
        return this.store.getTemplateById(templateId);
    }

    delete(templateId) {
        this.store.deleteTemplate(templateId);
        this.notifications.show(MESSAGES.SUCCESS.templateDeleted, NOTIFICATION_TYPES.SUCCESS);
        return true;
    }

    clearEditing() {
        this.store.clearEditingTemplate();
    }

    importFromCSV(csvContent) {
        const result = this.store.importTemplatesFromCSV(csvContent);

        if (result.importedCount > 0) {
            this.notifications.show(`${result.importedCount} modelo(s) de grade importado(s) com sucesso.`, NOTIFICATION_TYPES.SUCCESS);
        }

        if (result.errorCount > 0) {
            this.notifications.show(`${result.errorCount} modelo(s) não puderam ser importados. Verifique os erros.`, NOTIFICATION_TYPES.WARNING);
            result.errors.forEach(error => {
                this.notifications.show(error, NOTIFICATION_TYPES.DANGER, 8000);
            });
        }

        if(result.importedCount === 0 && result.errorCount === 0) {
            this.notifications.show("Nenhum modelo encontrado no arquivo para importar.", NOTIFICATION_TYPES.INFO);
        }

        return result.success;
    }

    // --- MÉTODOS DE LEITURA (GETTERS) RESTAURADOS ---
    // Estes métodos agora delegam para o BudgetStore, como planejado.
    getAll() {
        return this.store.getTemplates();
    }

    getById(templateId) {
        return this.store.getTemplateById(templateId);
    }

    getSortedByName() {
        return this.store.getTemplatesSortedByName();
    }

    getSortedByDate() {
        return this.store.getTemplatesSortedByDate();
    }

    getEditingId() {
        return this.store.getEditingTemplateId();
    }

    isEditing() {
        return !!this.store.getEditingTemplateId();
    }
}