import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class TemplateItem extends LitElement {
    static styles = css`
        :host {
            display: block;
            margin-bottom: var(--spacing-md);
        }
        .template-item {
            border: var(--border-width) solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            background: var(--bg-white);
            transition: var(--transition);
            position: relative;
        }
        .template-item:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow);
            transform: translateY(-2px);
        }
        .is-degrau {
            border-left: 4px solid var(--warning-color);
            background: linear-gradient(135deg, #ffffff 0%, #fffdf7 100%);
        }
        .is-clamp {
            border-left: 4px solid var(--info-color);
            background: linear-gradient(135deg, #ffffff 0%, #f6fbff 100%);
        }
        .editing-highlight {
            border-color: var(--primary-color) !important;
            background-color: var(--bg-section) !important;
            box-shadow: 0 0 0 3px rgba(50, 115, 220, 0.25) !important;
        }
        h6 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.25rem; /* Espaçamento entre as tags */
        }
        p {
            font-size: 0.8rem;
            color: #666;
            margin: 0;
        }
        .template-actions {
            display: flex;
            gap: var(--spacing-xs);
            margin-top: var(--spacing-sm);
        }
        .tag {
            font-size: 0.65rem;
            margin-left: 0.5rem;
            vertical-align: middle;
            background-color: #f5f5f5;
            border-radius: 4px;
            color: #4a4a4a;
            display: inline-block;
            line-height: 1.5;
            padding: 0.25em 0.75em;
            white-space: nowrap;
        }
        .tag.is-primary {
            background-color: #eef6ff;
            color: #3273dc;
        }
        .tag.is-info {
            background-color: #3298dc;
            color: #fff;
        }
        .tag.is-info.is-light {
            background-color: #eef6ff;
            color: #3273dc;
        }
        .tag.is-warning {
            background-color: #ffdd57;
            color: rgba(0, 0, 0, 0.7);
        }
        .tag.is-dark {
            background-color: #363636;
            color: #fff;
        }
    `;

    static properties = {
        template: { type: Object },
        isEditing: { type: Boolean },
    };

    constructor() {
        super();
        this.template = {};
        this.isEditing = false;
    }

    _onEdit(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('edit-template', {
            detail: { templateId: this.template.id },
            bubbles: true,
            composed: true
        }));
    }

    _onDelete(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('delete-template', {
            detail: { templateId: this.template.id },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (!this.template.id) return html``;

        const isGrade = this.template.templateType === 'grade';
        const isClamp = this.template.templateType === 'clamp';

        let tagTipo = '';
        if (isClamp) {
            tagTipo = html`<span class="tag is-info is-small">GRAMPO</span>`;
        } else if (!this.template.isDegrau) {
            tagTipo = html`<span class="tag is-primary is-small">GRADE</span>`;
        }

        const tagDegrau = this.template.isDegrau ? html`<span class="tag is-warning is-small">DEGRAU</span>` : '';
        const tagSuperficie = isGrade && this.template.superficie === 'serrilhada' ? html`<span class="tag is-dark is-small">SERRILHADA</span>` : '';
        const tagPreco = isGrade && this.template.precosCustomizados ? html`<span class="tag is-info is-light is-small">PREÇOS CUSTOM</span>` : '';
        const tagPeso = isGrade ? html`<span class="tag is-info is-light is-small">${this.template.pesoCalcMode === 'teorico' ? 'PESO TEÓRICO' : 'PESO REAL'}</span>` : '';

        const containerClass = isClamp ? 'is-clamp' : (this.template.isDegrau ? 'is-degrau' : '');
        const editingClass = this.isEditing ? 'editing-highlight' : '';

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="template-item ${containerClass} ${editingClass}">
                <h6>
                    ${this.template.nome}
                    ${tagTipo}
                    ${tagDegrau}
                    ${tagSuperficie}
                    ${tagPreco}
                    ${tagPeso}
                </h6>
                ${isGrade ? html`
                    <p>
                        BP: ${FormattingService.formatNumber(this.template.bp_esp)}x${FormattingService.formatNumber(this.template.bp_larg)}mm |
                        Malha: ${FormattingService.formatInteger(this.template.malha_menor)}x${FormattingService.formatInteger(this.template.malha_maior)}mm
                    </p>
                ` : html`
                    <p style="font-size: 0.75rem; color: #999;">
                        Peso Unitário: ${FormattingService.formatNumber(this.template.pesoUnitario, 3)} kg
                    </p>
                `}
                <div class="template-actions">
                    <button class="button is-small is-info" @click=${this._onEdit} title="Editar">
                        <span class="icon"><i class="fas fa-edit"></i></span>
                    </button>
                    <button class="button is-small is-danger" @click=${this._onDelete} title="Excluir">
                        <span class="icon"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('template-item', TemplateItem);