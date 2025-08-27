import { LitElement, html, css } from 'lit';
import { LitVirtualizer } from '@lit-labs/virtualizer';
import './BudgetItem.js';

export class BudgetList extends LitElement {
    static styles = css`
        :host { display: block; }
        lit-virtualizer { height: 100%; }
        .has-text-grey { color: #7a7a7a; }
    `;

    static properties = {
        itemsWithCalculations: { type: Array },
        editingItemId: { type: String },
    };

    constructor() {
        super();
        this.itemsWithCalculations = [];
        this.editingItemId = null;
    }

    render() {
        if (this.itemsWithCalculations.length === 0) {
            return html`<p class="has-text-grey">Nenhum item adicionado ainda.</p>`;
        }

        const renderItem = (data) => html`
            <budget-item
                .item=${data.item}
                .template=${data.template}
                .costs=${data.costs}
                .isEditing=${data.item.id === this.editingItemId}
                data-id=${data.item.id}>
            </budget-item>
        `;

        return html`
            <lit-virtualizer
                .items=${this.itemsWithCalculations}
                .renderItem=${renderItem}
                .keyFunction=${(data) => data.item.id}
            ></lit-virtualizer>
        `;
    }
}

customElements.define('budget-list', BudgetList);