import { LitElement, html } from 'lit';
import { map } from 'lit/directives/map.js';

import './DetailedReportItem.js';

export class DetailedReport extends LitElement {
    static properties = {
        reportData: { type: Array },
    };

    constructor() {
        super();
        this.reportData = [];
    }

    render() {
        if (this.reportData.length === 0) {
            return html`<p class="has-text-grey">Adicione itens ao orçamento para ver o relatório detalhado.</p>`;
        }

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <div>
                ${map(this.reportData, (data) => html`
                    <detailed-report-item .reportItemData=${data}></detailed-report-item>
                `)}
            </div>
        `;
    }
}

customElements.define('detailed-report', DetailedReport);