import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';
import { map } from 'lit/directives/map.js';

export class DetailedReportItem extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .relatorio-item {
            border: var(--border-width, 1px) solid #e8e8e8;
            border-radius: var(--border-radius, 6px);
            margin-bottom: var(--spacing-lg, 1rem);
            overflow: hidden;
        }
        .relatorio-item-header {
            background: var(--bg-light, #f8f9fa);
            padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1rem);
            border-bottom: var(--border-width, 1px) solid #e8e8e8;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: var(--transition, all 0.2s ease);
        }
        .relatorio-item-header:hover {
            background: #e9ecef;
        }
        .relatorio-item-content {
            padding: var(--spacing-lg, 1rem);
            display: none;
        }
        .relatorio-item-content.expanded {
            display: block;
        }
        .expand-icon {
            transition: transform 0.3s ease;
        }
        .expand-icon.rotated {
            transform: rotate(90deg);
        }
        .data-table {
            width: 100%;
            font-size: var(--font-size-sm, 0.875rem);
            border-collapse: collapse;
            margin: var(--spacing-lg, 1rem) 0;
        }
        .data-table th, .data-table td {
            padding: var(--spacing-sm, 0.5rem);
            border: var(--border-width, 1px) solid #e8e8e8;
            vertical-align: top;
        }
        .data-table th {
            background: var(--primary-color, #3273dc);
            color: white;
            font-weight: 600;
            text-align: left;
        }
        .item-display-title .tag {
            vertical-align: middle;
        }
    `;

    static properties = {
        reportItemData: { type: Object },
        isExpanded: { type: Boolean, state: true }
    };

    constructor() {
        super();
        this.reportItemData = {};
        this.isExpanded = false;
    }

    _toggleExpand() {
        this.isExpanded = !this.isExpanded;
    }

    renderGradeDetails(materiais, custos, calculo) {
        return html`
            <table class="data-table">
                <thead>
                <tr>
                    <th>Material</th>
                    <th>Esp./Ø (mm)</th>
                    <th>Larg. (mm)</th>
                    <th>Comp. (mm)</th>
                    <th>Qtd</th>
                    <th>Peso (kg)</th>
                </tr>
                </thead>
                <tbody>
                ${map(materiais, (mat) => html`
                    <tr>
                        <td><strong>${mat.nome}</strong></td>
                        <td>${mat.esp}</td>
                        <td>${mat.larg}</td>
                        <td>${mat.comp}</td>
                        <td>${mat.qtd}</td>
                        <td>${mat.peso}</td>
                    </tr>
                `)}
                </tbody>
            </table>

            <div style="margin-top: 1rem;">
                <h6 class="subtitle is-6">Custos Detalhados</h6>
                <div class="columns is-mobile">
                    <div class="column">
                        <strong>Material:</strong> ${FormattingService.formatCurrency(custos.custoMaterial)}<br>
                        <strong>Mão de Obra:</strong> ${FormattingService.formatCurrency(custos.custoMaoObra)}<br>
                        <strong>Galvanização:</strong> ${FormattingService.formatCurrency(custos.custoGalvanizacao)}
                    </div>
                    <div class="column has-text-right">
                        <strong>TOTAL:</strong> ${FormattingService.formatCurrency(custos.custoTotalItem)}<br>
                        <strong>Custo/unidade:</strong> ${FormattingService.formatCurrency(custos.custoPorUnidade)}<br>
                        <small>Custo/m²: ${FormattingService.formatCurrency(calculo.area > 0 ? custos.custoTotalItem / calculo.area : 0)}</small>
                    </div>
                </div>
            </div>
        `;
    }

    renderClampDetails(custos) {
        return html`
            <div style="margin-top: 1rem;">
                <h6 class="subtitle is-6">Custos Detalhados (Valores Finais Inseridos)</h6>
                <div class="columns is-mobile">
                    <div class="column">
                        <strong>Material:</strong> ${FormattingService.formatCurrency(custos.custoMaterial)}<br>
                        <strong>Mão de Obra:</strong> ${FormattingService.formatCurrency(custos.custoMaoObra)}<br>
                        <strong>Galvanização:</strong> ${FormattingService.formatCurrency(custos.custoGalvanizacao)}
                    </div>
                    <div class="column has-text-right">
                        <strong>TOTAL:</strong> ${FormattingService.formatCurrency(custos.custoTotalItem)}<br>
                        <strong>Custo/unidade:</strong> ${FormattingService.formatCurrency(custos.custoPorUnidade)}<br>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const { item, calculo, custos, materiais, template } = this.reportItemData;
        if (!item || !calculo || !custos || !template) {
            return html``;
        }

        const isGrade = template.templateType === 'grade';
        const displayData = FormattingService.getItemDisplayData(item, template);

        let tagTipo = '';
        if (template.templateType === 'clamp') {
            tagTipo = html`<span class="tag is-info is-small">GRAMPO</span>`;
        } else if (!template.isDegrau) {
            tagTipo = html`<span class="tag is-primary is-light is-small">GRADE</span>`;
        }

        const tagDegrau = template.isDegrau ? html`<span class="tag is-warning is-small">DEGRAU</span>` : '';
        const tagSuperficie = template.superficie === 'serrilhada'
            ? html`<span class="tag is-dark is-small">SERRILHADA</span>`
            : '';

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="relatorio-item">
                <div class="relatorio-item-header" @click=${this._toggleExpand}>
                    <div class="item-display-content">
                        <div class="item-display-title">
                            ${(item.order ?? 0) + 1}. ${displayData.title} ${tagTipo} ${tagDegrau} ${tagSuperficie}
                        </div>
                        <div class="item-display-details">
                            ${displayData.detailsLine}
                        </div>
                        <div class="item-display-results mt-2">
                            <strong>Custo Total:</strong> ${FormattingService.formatCurrency(custos.custoTotalItem)} |
                            <strong>Custo/unidade:</strong> ${FormattingService.formatCurrency(custos.custoPorUnidade)}
                        </div>
                    </div>
                    <span class="icon expand-icon ${this.isExpanded ? 'rotated' : ''}">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
                <div class="relatorio-item-content ${this.isExpanded ? 'expanded' : ''}">
                    ${isGrade ? this.renderGradeDetails(materiais, custos, calculo) : this.renderClampDetails(custos)}
                </div>
            </div>
        `;
    }
}

customElements.define('detailed-report-item', DetailedReportItem);