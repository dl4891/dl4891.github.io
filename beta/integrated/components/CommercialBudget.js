// GradesVenda0001/integrated/components/CommercialBudget.js

import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class CommercialBudget extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .budget-detail-row {
            background-color: #f9f9f9;
        }
        .budget-detail-row td {
            padding: 0 !important;
            border: 0 !important;
            border-bottom: 2px solid #dbdbdb !important;
        }
        .budget-detail-content {
            padding: 1rem 1.5rem 1rem 4rem;
        }
        .item-number-col {
            width: 60px;
            text-align: center;
            font-weight: bold;
        }
        .item-description-cell {
            line-height: 1.4;
        }
        .item-description-cell small {
            color: var(--text-muted, #666);
        }
        .item-description-cell .tag {
            margin-left: 0.5rem;
            vertical-align: middle;
        }
        /* --- INÍCIO DA CORREÇÃO --- */
        .detail-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-color, #3273dc);
            margin-bottom: 0.5rem;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem 2rem;
            font-size: 0.9rem;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
        }
        .detail-item strong {
            color: #555;
            margin-right: 1rem;
        }
        .detail-item span {
            font-weight: 600;
            color: var(--text-dark, #363636);
        }
        /* --- FIM DA CORREÇÃO --- */
    `;

    static properties = {
        budgetItems: { type: Array },
        templates: { type: Array },
        pricingResults: { type: Object },
    };

    constructor() {
        super();
        this.budgetItems = [];
        this.templates = [];
        this.pricingResults = {};
    }

    toggleDetailRow(itemId) {
        const detailRow = this.shadowRoot.getElementById(`detail-row-${itemId}`);
        const icon = this.shadowRoot.getElementById(`icon-toggle-${itemId}`);
        if (detailRow && icon) {
            const isVisible = detailRow.style.display === 'table-row';
            detailRow.style.display = isVisible ? 'none' : 'table-row';
            icon.classList.toggle('fa-chevron-down', isVisible);
            icon.classList.toggle('fa-chevron-up', !isVisible);
        }
    }

    // --- INÍCIO DA CORREÇÃO ---
    // A lógica foi movida de UIRendererManager para dentro do componente.
    _renderTaxDetails(pricingResult, proporcao) {
        if (!pricingResult) return 'Detalhes indisponíveis.';

        const ipi = (pricingResult.B99_valorIPI || 0) * proporcao;
        const icmsProprio = (pricingResult.B83_valorICMSOpPropria || 0) * proporcao;
        const difal = (pricingResult.B96_valorDifal || 0) * proporcao;
        const icmsST = (pricingResult.B101_valorDifST || 0) * proporcao;

        const difalRate = (pricingResult.B95_difal || 0) * 100;
        const icmsSTRate = (pricingResult.B38_icmsSTBruto || 0) * 100;
        const icmsProprioRate = (pricingResult.B82_icmsOpPropria || 0) * 100;

        return `
            <div>
                <h6 class="detail-title">Composição de Valores</h6>
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>(DIFAL ${FormattingService.formatNumber(difalRate, 2)}%):</strong>
                        <span>${FormattingService.formatCurrency(difal)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>(+) IPI (${FormattingService.formatNumber((pricingResult.B98_ipiVenda || 0) * 100, 2)}%):</strong>
                        <span>${FormattingService.formatCurrency(ipi)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>(+) ICMS-ST (${FormattingService.formatNumber(icmsSTRate, 2)}%):</strong>
                        <span>${FormattingService.formatCurrency(icmsST)}</span>
                    </div>
                    <div class="detail-item">
                        <strong>(ICMS Próprio ${FormattingService.formatNumber(icmsProprioRate, 2)}%):</strong>
                        <span>(${FormattingService.formatCurrency(icmsProprio)})</span>
                    </div>
                </div>
            </div>
        `;
    }
    // --- FIM DA CORREÇÃO ---


    render() {
        if (this.budgetItems.length === 0) {
            return html`<p class="has-text-grey">Nenhum item no orçamento.</p>`;
        }

        let totalComDifal = 0;
        let totalComIpiSt = 0;
        let pricingCalculado = false;

        const areaTotalPorTemplate = {};
        this.budgetItems.forEach(item => {
            const template = this.templates.find(t => t.id === item.templateId);
            if(template && template.templateType === 'grade'){
                if (!areaTotalPorTemplate[item.templateId]) areaTotalPorTemplate[item.templateId] = 0;
                areaTotalPorTemplate[item.templateId] += (item.largura * item.comprimento / 1e6) * item.quantidade;
            }
        });

        const tableRows = this.budgetItems.map(item => {
            const template = this.templates.find(t => t.id === item.templateId);
            if (!template) return '';

            const pricingResult = this.pricingResults[template.id];
            const displayData = FormattingService.getItemDisplayData(item, template, {
                excludeQty: true,
                excludeDims: true
            });

            let tagTipo = '';
            if (template.templateType === 'clamp') {
                tagTipo = html`<span class="tag is-info is-small">GRAMPO</span>`;
            } else if (!template.isDegrau) {
                tagTipo = html`<span class="tag is-primary is-light is-small">GRADE</span>`;
            }
            const tagDegrau = template.isDegrau ? html`<span class="tag is-warning is-small">DEGRAU</span>` : '';
            const tagSuperficie = template.superficie === 'serrilhada' ? html`<span class="tag is-dark is-small">SERRILHADA</span>` : '';

            let valorUnitario = 0, subtotalItem = 0, valorTotalFinal = 0, proporcao = 1;
            let areaDisplay = 'N/A', dimensionsDisplay = 'N/A';

            if (pricingResult) {
                pricingCalculado = true;

                if(template.templateType === 'grade') {
                    const areaTotalItem = (item.largura * item.comprimento / 1e6) * item.quantidade;
                    const areaTemplate = areaTotalPorTemplate[template.id] || 1;
                    proporcao = areaTotalItem / areaTemplate;
                    areaDisplay = `${FormattingService.formatNumber(areaTotalItem)} m²`;
                    dimensionsDisplay = `${item.largura}x${item.comprimento}mm`;

                    subtotalItem = (pricingResult.B97_precoVendaComDifal || 0) * proporcao;
                    valorTotalFinal = (pricingResult.B102_valorFinalComIPIST || 0) * proporcao;
                    valorUnitario = item.quantidade > 0 ? subtotalItem / item.quantidade : 0;
                } else { // Clamp
                    const totalQuantityForTemplate = pricingResult.materiaisDetalhes[0]?.qty || 1;
                    const precoUnitarioPreciso = (pricingResult.B97_precoVendaComDifal || 0) / totalQuantityForTemplate;
                    valorUnitario = Math.ceil(precoUnitarioPreciso * 100) / 100;
                    subtotalItem = valorUnitario * item.quantidade;

                    const precoBasePreciso = pricingResult.B97_precoVendaComDifal || 0;
                    if (precoBasePreciso > 0) {
                        const ipiRatio = (pricingResult.B99_valorIPI || 0) / precoBasePreciso;
                        const stRatio = (pricingResult.B101_valorDifST || 0) / precoBasePreciso;
                        const ipiItem = subtotalItem * ipiRatio;
                        const stItem = subtotalItem * stRatio;
                        valorTotalFinal = subtotalItem + ipiItem + stItem;
                    } else {
                        valorTotalFinal = subtotalItem;
                    }
                }

                totalComDifal += subtotalItem;
                totalComIpiSt += valorTotalFinal;
            }

            return html`
                <tr class="budget-item-row" id="item-row-${item.id}">
                    <td class="item-number-col">${(item.order ?? 0) + 1}</td>
                    <td class="item-description-cell">
                        <strong>${displayData.title} ${tagTipo} ${tagDegrau} ${tagSuperficie}</strong>
                        ${displayData.detailsLine ? html`<br><small>${displayData.detailsLine}</small>` : ''}
                    </td>
                    <td>${item.quantidade}</td>
                    <td>${dimensionsDisplay}</td>
                    <td>${areaDisplay}</td>
                    <td>${pricingResult ? FormattingService.formatCurrency(valorUnitario) : '-'}</td>
                    <td>${pricingResult ? FormattingService.formatCurrency(subtotalItem) : '-'}</td>
                    <td>${pricingResult ? FormattingService.formatCurrency(valorTotalFinal) : html`<span class="has-text-danger">Não calculado</span>`}</td>
                    <td>
                        <button class="button is-small is-info is-outlined" @click=${() => this.toggleDetailRow(item.id)} ?disabled=${!pricingResult}>
                            <span class="icon"><i class="fas fa-chevron-down" id="icon-toggle-${item.id}"></i></span>
                        </button>
                    </td>
                </tr>
                <tr class="budget-detail-row" id="detail-row-${item.id}" style="display: none;">
                    <td colspan="9">
                        <div class="budget-detail-content">
                            ${unsafeHTML(this._renderTaxDetails(pricingResult, proporcao))}
                        </div>
                    </td>
                </tr>
            `;
        });

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <h4 class="subtitle is-4">Orçamento Comercial Final</h4>
                ${!pricingCalculado ? html`<div class="notification is-warning"><p><strong>Atenção:</strong> Execute o cálculo de pricing para gerar valores.</p></div>` : ''}
                ${pricingCalculado ? html`
                    <div class="notification is-success is-light">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Subtotal (c/ DIFAL)</p>
                                    <p class="title is-5">${FormattingService.formatCurrency(totalComDifal)}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">TOTAL FINAL (c/ IPI+ST)</p>
                                    <p class="title is-4">${FormattingService.formatCurrency(totalComIpiSt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>` : ''}
                <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                    <tr>
                        <th class="item-number-col">Núm</th>
                        <th>Item</th>
                        <th>Qtd</th>
                        <th>Dimensões</th>
                        <th>Área</th>
                        <th>Valor Unitário (Subtotal)</th>
                        <th>Valor Total (Subtotal)</th>
                        <th>Valor Total Final</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${tableRows}
                    </tbody>
                </table>
            </div>
        `;
    }
}

customElements.define('commercial-budget', CommercialBudget);