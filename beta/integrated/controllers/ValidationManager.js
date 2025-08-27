import { NOTIFICATION_TYPES } from "../../shared/config.js";
import { CalculationEngine } from "../../pricing/CalculationEngine.js";

export class ValidationManager {
    constructor(validator, notificationManager) {
        this.validator = validator;
        this.notifications = notificationManager;
    }

    validateTemplateForm(formElement) {
        if (!this.validator.validateForm(formElement)) {
            this.notifications.show("Corrija os erros no formulário", NOTIFICATION_TYPES.WARNING);
            return false;
        }
        return true;
    }

    validateBudgetForm(formElement) {
        if (!this.validator.validateForm(formElement)) {
            this.notifications.show("Corrija os erros no formulário", NOTIFICATION_TYPES.WARNING);
            return false;
        }
        return true;
    }

    validatePricesForm(formElement) {
        if (!this.validator.validateForm(formElement)) {
            this.notifications.show("Corrija os erros no formulário", NOTIFICATION_TYPES.WARNING);
            return false;
        }
        return true;
    }

    setupValidation() {
        const formIds = [
            'precos-form',
            'form-preco-chata', 'form-preco-redonda',
            'form-preco-chapa-lateral', 'form-preco-chapa-xadrez'
        ];
        formIds.forEach(id => {
            const formulario = document.getElementById(id);
            if (formulario) {
                this.validator.setupRealTimeValidation(formulario);
            }
        });
    }

    validateIPIRules(templateId) {
        const form = document.querySelector(`form[data-template-id="${templateId}"]`);
        if (!form) return;
        const ipiMaterial = parseFloat(form.querySelector('.template-ipi-material')?.value) || 0;
        const ipiRevenda = parseFloat(form.querySelector('.template-ipi-revenda')?.value) || 0;
        const ipiVendaFinal = parseFloat(form.querySelector('.template-ipi-venda')?.value) || 0;
        this.clearIPIErrors(form);
        const resultado = CalculationEngine.validateIPIRules({ ipiMaterial, ipiRevenda, ipiVendaFinal });
        this.updateIPIStatus(templateId, resultado, ipiMaterial, ipiRevenda, ipiVendaFinal);
        if (!resultado.valid) {
            this.highlightIPIFields(form, resultado.fields);
        }
    }

    updateIPIStatus(templateId, resultado, ipiMat, ipiRev, ipiVen) {
        const statusContainer = document.getElementById(`ipi-status-${templateId}`);
        if (!statusContainer) return;
        let statusHtml = '';
        if (resultado.valid) {
            if (resultado.warning) {
                statusHtml = `<div class="notification is-warning is-light"><div class="content"><p><strong><i class="fas fa-exclamation-triangle"></i> Atenção:</strong></p><p>${resultado.warning}</p></div></div>`;
            } else if (resultado.success) {
                statusHtml = `<div class="notification is-success is-light"><div class="content"><p><strong><i class="fas fa-check-circle"></i> Configuração Válida:</strong></p><p>${resultado.success}</p><div class="mt-2"><span class="tag is-light">IPI Material: ${ipiMat}%</span><span class="tag is-light">IPI Revenda: ${ipiRev}%</span><span class="tag is-light">IPI Venda Final: ${ipiVen}%</span></div></div></div>`;
            }
        } else {
            statusHtml = `<div class="notification is-danger is-light"><div class="content"><p><strong><i class="fas fa-times-circle"></i> Erro de Configuração:</strong></p><p>${resultado.error}</p></div></div>`;
        }
        statusContainer.innerHTML = statusHtml;
    }

    highlightIPIFields(form, camposComErro) {
        camposComErro.forEach(campo => {
            let selector;
            switch (campo) {
                case 'ipiMaterial': selector = '.template-ipi-material'; break;
                case 'ipiRevenda': selector = '.template-ipi-revenda'; break;
                case 'ipiVendaFinal': selector = '.template-ipi-venda'; break;
            }
            if (selector) {
                const input = form.querySelector(selector);
                if (input) input.classList.add('is-danger');
            }
        });
    }

    clearIPIErrors(form) {
        form.querySelectorAll('.template-ipi-material, .template-ipi-revenda, .template-ipi-venda').forEach(input => {
            input.classList.remove('is-danger');
        });
    }
}