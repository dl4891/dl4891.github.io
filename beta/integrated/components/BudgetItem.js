import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class BudgetItem extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%; /* Garante que o custom element ocupe a largura total */
        }
        .orcamento-item {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 1rem;
            margin-bottom: 1rem;
            transition: var(--transition);
            width: 100%; /* Reforça a largura total do container interno */
            box-sizing: border-box;
        }
        .orcamento-item:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow);
            transform: translateY(-2px);
        }
        .orcamento-item.editing {
            border-color: var(--warning-color);
            background: var(--bg-editing);
            box-shadow: 0 0 0 3px rgba(255, 221, 87, .2);
        }
        .item-order-number {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--primary-color);
            cursor: pointer;
            padding: 2px 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        .item-order-number:hover {
            background-color: #f0f7ff;
        }
        .order-input {
            width: 45px;
            height: 28px;
            font-size: 1rem;
            font-weight: 700;
            text-align: center;
            border: 1px solid var(--primary-color);
            border-radius: 4px;
        }
        .orcamento-actions {
            display: flex;
            gap: .5rem;
            margin-left: auto; /* Alinha os botões à direita */
        }
        /* Estilo para as tags */
        .tag {
            margin-left: 0.5rem;
            vertical-align: middle;
        }
    `;

    static properties = {
        item: { type: Object },
        template: { type: Object },
        costs: { type: Object },
        isEditing: { type: Boolean },
        isEditingOrder: { state: true }
    };

    constructor() {
        super();
        this.item = {};
        this.template = {};
        this.costs = {};
        this.isEditing = false;
        this.isEditingOrder = false;
    }

    _onEdit(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('edit-item', {
            detail: { itemId: this.item.id },
            bubbles: true,
            composed: true
        }));
    }

    _onRemove(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('remove-item', {
            detail: { itemId: this.item.id },
            bubbles: true,
            composed: true
        }));
    }

    _handleOrderClick() {
        this.isEditingOrder = true;
        this.updateComplete.then(() => {
            const input = this.shadowRoot.querySelector('.order-input');
            input?.focus();
            input?.select();
        });
    }

    _commitOrderChange(inputElement) {
        const newPosition = parseInt(inputElement.value, 10);
        const currentPosition = (this.item.order ?? 0) + 1;

        if (!isNaN(newPosition) && newPosition !== currentPosition) {
            this.dispatchEvent(new CustomEvent('move-item', {
                detail: {
                    itemId: this.item.id,
                    newPosition: newPosition
                },
                bubbles: true,
                composed: true
            }));
        }
        this.isEditingOrder = false;
    }

    _cancelOrderEdit() {
        this.isEditingOrder = false;
    }

    _handleOrderKeyDown(e) {
        if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            this._commitOrderChange(e.target);
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            this._cancelOrderEdit();
        }
    }

    render() {
        if (!this.item.id || !this.template.id) return html``;

        const displayData = FormattingService.getItemDisplayData(this.item, this.template);

        let tagTipo = '';
        if (this.template.templateType === 'clamp') {
            tagTipo = html`<span class="tag is-info is-small">GRAMPO</span>`;
        } else if (!this.template.isDegrau) {
            tagTipo = html`<span class="tag is-primary is-light is-small">GRADE</span>`;
        }

        const tagDegrau = this.template.isDegrau ? html`<span class="tag is-warning is-small">DEGRAU</span>` : '';
        const tagPesoTeorico = this.template.pesoCalcMode === 'teorico'
            ? html`<span class="tag is-info is-light is-small" title="Peso calculado por medida bruta">TEÓRICO</span>`
            : '';
        const tagSuperficie = this.template.superficie === 'serrilhada'
            ? html`<span class="tag is-dark is-small">SERRILHADA</span>`
            : '';

        const itemNumber = (this.item.order ?? 0) + 1;

        const orderDisplay = this.isEditingOrder
            ? html`<input
                        type="number"
                        class="order-input"
                        .value=${itemNumber}
                        @blur=${(e) => this._commitOrderChange(e.target)}
                        @keydown=${this._handleOrderKeyDown}
                >`
            : html`<span class="item-order-number" title="Clique para mover o item" @click=${this._handleOrderClick}>
                    ${itemNumber}.
                   </span>`;

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="orcamento-item fade-in ${this.isEditing ? 'editing' : ''}" data-id="${this.item.id}">
                <div class="item-display-container">
                    <div class="item-display-control-column">
                        ${orderDisplay}
                    </div>
                    <div class="item-display-content">
                        <div class="is-flex is-justify-content-space-between is-align-items-flex-start">
                            <div>
                                <div class="item-display-title">
                                    ${displayData.title} ${tagTipo} ${tagDegrau} ${tagSuperficie}
                                </div>
                                <div class="item-display-details">
                                    ${displayData.detailsLine}
                                </div>
                                <div class="item-display-results mt-2">
                                    <strong>Área:</strong> ${FormattingService.formatNumber(this.costs.area)}m² |
                                    <strong>Peso:</strong> ${FormattingService.formatNumber(this.costs.peso)}kg |
                                    <strong>Peso c/ margem:</strong> ${FormattingService.formatNumber(this.costs.pesoComMargem)}kg ${tagPesoTeorico} |
                                    <strong>Custo total:</strong> ${FormattingService.formatCurrency(this.costs.custoTotal)} |
                                    <strong>Custo/unidade:</strong> ${FormattingService.formatCurrency(this.costs.custoUnitario)}
                                </div>
                            </div>
                            <div class="orcamento-actions">
                                <button class="button is-small is-info" @click=${this._onEdit} title="Editar">
                                    <span class="icon"><i class="fas fa-edit"></i></span>
                                </button>
                                <button class="button is-small is-danger" @click=${this._onRemove} title="Remover">
                                    <span class="icon"><i class="fas fa-trash"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('budget-item', BudgetItem);