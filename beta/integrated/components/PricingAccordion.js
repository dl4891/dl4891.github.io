import { LitElement, html, css } from 'lit';
import './PricingTemplatePanel.js';
import { FormattingService } from '../../core/services/FormattingService.js';

export class PricingAccordion extends LitElement {
    static styles = css`
        :host { display: block; }
        .template-pricing-card { border: 2px solid #dbdbdb; border-radius: 6px; margin-bottom: 1rem; background: white; overflow: hidden; transition: all .2s ease; }
        .template-pricing-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,.15); transform: translateY(-2px); }
        .template-pricing-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; cursor: pointer; transition: background-color .2s ease; background: #f8f9fa; }
        .template-pricing-header:hover { background: #e9ecef; }
        .template-pricing-header.status-no-items { border-left: 4px solid #6c757d; }
        .template-pricing-header.status-warning { border-left: 4px solid #ffdd57; }
        .template-pricing-header.status-info { border-left: 4px solid #3298dc; }
        .template-pricing-header.status-success { border-left: 4px solid #48c774; }
        .template-pricing-title { font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
        .template-pricing-status { display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; font-weight: 600; }
        .expand-icon { transition: transform .3s; }
        .expand-icon.rotated { transform: rotate(180deg); }
        .template-pricing-content { display: none; }
        .template-pricing-content.expanded { display: block; }
    `;

    static properties = {
        templatesWithStatus: { type: Array },
    };

    constructor() {
        super();
        this.templatesWithStatus = [];
    }

    _getTemplateStatusClass(status) {
        const classes = { 'no-items': 'status-no-items', 'not-configured': 'status-warning', 'configured': 'status-info', 'calculated': 'status-success' };
        return classes[status] || '';
    }

    _getTemplateStatusIcon(status) {
        const icons = { 'no-items': '<i class="fas fa-minus-circle has-text-grey"></i>', 'not-configured': '<i class="fas fa-exclamation-triangle has-text-warning"></i>', 'configured': '<i class="fas fa-cog has-text-info"></i>', 'calculated': '<i class="fas fa-check-circle has-text-success"></i>' };
        return icons[status] || '';
    }

    _getTemplateStatusText(template) {
        switch (template.status) {
            case 'calculated':
                return template.pricePerM2 ? `${FormattingService.formatCurrency(template.pricePerM2)}/m²` : 'Calculado';
            case 'configured': return 'Pronto para calcular';
            case 'not-configured': return 'Não configurado';
            case 'no-items': return 'Sem itens';
            default: return 'Não calculado';
        }
    }

    _togglePanel(event) {
        const header = event.currentTarget;
        const content = header.nextElementSibling;
        const icon = header.querySelector('.expand-icon');
        content.classList.toggle('expanded');
        icon.classList.toggle('rotated');
    }

    _handleBulkCopy() {
        this.dispatchEvent(new CustomEvent('bulk-copy', { bubbles: true, composed: true }));
    }

    _handleCalculateAll() {
        this.dispatchEvent(new CustomEvent('calculate-all', { bubbles: true, composed: true }));
    }

    render() {
        const comItens = this.templatesWithStatus.filter(t => t.hasItems).length;
        const configurados = this.templatesWithStatus.filter(t => t.isConfigured && t.hasItems);

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <h3 class="subtitle is-4">Configuração de Pricing por Modelo</h3>
                <div class="pricing-toolbar" style="margin-bottom: 1.5rem;">
                    <div class="field is-grouped">
                        <div class="control">
                            <div class="select">
                                <select id="bulk-template-source">
                                    <option value="">Copiar de...</option>
                                    ${configurados.map(t => html`<option value="${t.id}">${t.nome}</option>`)}
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button class="button is-info" @click=${this._handleBulkCopy}><i class="fas fa-copy"></i>&nbsp;Copiar para Não Configurados</button>
                        </div>
                        <div class="control">
                            <button class="button is-primary" ?disabled=${comItens === 0} @click=${this._handleCalculateAll}><i class="fas fa-calculator"></i>&nbsp;Calcular Todos</button>
                        </div>
                    </div>
                </div>
                ${this.templatesWithStatus.length > 0
            ? this.templatesWithStatus.map(template => html`
                        <div class="template-pricing-card">
                            <div class="template-pricing-header ${this._getTemplateStatusClass(template.status)}" @click=${this._togglePanel}>
                                <div class="template-pricing-title" .innerHTML=${this._getTemplateStatusIcon(template.status) + ' ' + template.nome}></div>
                                <div class="template-pricing-status">
                                    ${this._getTemplateStatusText(template)}
                                    <i class="fas fa-chevron-down expand-icon"></i>
                                </div>
                            </div>
                            <div class="template-pricing-content">
                                <pricing-template-panel .template=${template} .masterUfDestino=${template.ufDestino || ''} data-template-id-for-query=${template.id}></pricing-template-panel>
                            </div>
                        </div>
                    `)
            : html`<p class="has-text-grey">Crie modelos e adicione itens ao orçamento para configurar o pricing.</p>`
        }
            </div>
        `;
    }
}
customElements.define('pricing-accordion', PricingAccordion);