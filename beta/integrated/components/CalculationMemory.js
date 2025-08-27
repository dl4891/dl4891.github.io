import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class CalculationMemory extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        /* Estilos críticos importados do shared/styles.css para garantir o encapsulamento e a aparência correta */
        .memoria-template {
            border: 2px solid #3273dc;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        }
        .memoria-template.is-degrau {
            border-color: #ffdd57;
        }
        .memoria-template.is-clamp {
            border-color: #3298dc; /* info color */
        }
        .memoria-template-header {
            background: linear-gradient(135deg, #3273dc 0%, #2366d1 100%);
            color: white;
            padding: 1rem;
        }
        .memoria-template-header.is-degrau {
            background: linear-gradient(135deg, #ffdd57 0%, #e6c441 100%);
            color: #363636;
        }
        .memoria-template-header.is-clamp {
            background: linear-gradient(135deg, #3298dc 0%, #208fce 100%);
        }
        .memoria-template-title {
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        .memoria-template-title .tag {
            margin-left: 0.75rem;
        }
        .memoria-template-subtitle {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            flex-wrap: wrap;
        }
        .memoria-template-body {
            padding: 1rem;
        }
        .memoria-section {
            margin-bottom: 1.5rem;
        }
        .memoria-section-title {
            font-size: 1rem;
            font-weight: 600;
            color: #3273dc;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .memoria-items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 0.75rem;
        }
        .memoria-item-card {
            background: #f8f9fa;
            border: 1px solid #dbdbdb;
            border-radius: 6px;
            padding: 0.75rem;
        }
        .memoria-materials-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0.75rem 0;
            font-size: 0.875rem;
        }
        .memoria-materials-table th, .memoria-materials-table td {
            border: 1px solid #dbdbdb;
            padding: 0.5rem;
            text-align: left;
        }
        .memoria-materials-table th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .memoria-materials-table .custo-cell {
            background: #f0fff4;
            font-weight: 600;
            color: #48c774;
        }
        .memoria-processes {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 0.75rem;
        }
        .memoria-process-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .memoria-process-row:last-child {
            border-bottom: none;
        }
        .memoria-process-calc {
            font-size: 0.75rem;
            color: #666;
            font-family: 'Courier New', monospace;
        }
        .memoria-total {
            background: linear-gradient(135deg, #f0fff4 0%, #e8f5e8 100%);
            border: 2px solid #48c774;
            border-radius: 6px;
            padding: 1rem;
            text-align: center;
            margin-top: 1.5rem;
        }
        .memoria-total-value {
            font-size: 2rem;
            font-weight: bold;
            color: #48c774;
            margin-bottom: 0.25rem;
        }
        .memoria-total-per-m2 {
            font-size: 1rem;
            color: #666;
        }
        .custo-fixo-table {
            font-size: 0.9em;
        }
        .custo-fixo-table td {
            padding: 0.4em 0.6em;
        }
    `;

    static properties = {
        memoryData: { type: Array },
    };

    constructor() {
        super();
        this.memoryData = [];
    }

    render() {
        if (!this.memoryData || this.memoryData.length === 0) {
            return html`<p class="has-text-grey">Adicione itens ao orçamento para ver a memória de cálculo detalhada.</p>`;
        }

        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            ${map(this.memoryData, (templateData) =>
                    templateData.template.templateType === 'grade'
                            ? this.renderGradeMemory(templateData)
                            : this.renderClampMemory(templateData)
            )}
        `;
    }

    renderGradeMemory(templateData) {
        const { template, totais, itens, barras, chapas, processos, custoTotal, totalWeightCalcMethod } = templateData;
        const ehDegrau = template.isDegrau;
        const totalCalcMethodText = totalWeightCalcMethod === 'unit' ? 'Unidade Multiplicada' : 'Componente Total';

        const tagTipo = ehDegrau ? html`<span class="tag is-warning">DEGRAU</span>` : html`<span class="tag is-primary">GRADE</span>`;
        const tagPreco = template.precosCustomizados ? html`<span class="tag is-info is-light">PREÇOS CUSTOM</span>` : '';
        const tagPeso = html`<span class="tag is-info is-light">${template.pesoCalcMode === 'teorico' ? 'PESO TEÓRICO' : 'PESO REAL'}</span>`;
        const tagSuperficie = template.superficie === 'serrilhada' ? html`<span class="tag is-dark">SERRILHADA</span>` : '';

        return html`
            <div class="memoria-template ${ehDegrau ? 'is-degrau' : ''}">
                <div class="memoria-template-header ${ehDegrau ? 'is-degrau' : ''}">
                    <div class="memoria-template-title">
                        <i class="fas fa-cogs mr-2"></i>${template.nome} ${tagTipo} ${tagSuperficie} ${tagPreco} ${tagPeso}
                    </div>
                    <div class="memoria-template-subtitle">
                        <span><i class="fas fa-list mr-1"></i>${itens.length} itens</span>
                        <span><i class="fas fa-ruler-combined mr-1"></i>${totais.area} m²</span>
                        <span><i class="fas fa-weight mr-1"></i>${totais.pesoComMargem} kg</span>
                        <span><i class="fas fa-th mr-1"></i>Malha: ${totais.malhaDisplay}</span>
                        <span title="Método de Cálculo Total do Orçamento"><i class="fas fa-calculator mr-1"></i>${totalCalcMethodText}</span>
                    </div>
                </div>

                <div class="memoria-template-body">
                    ${this.renderItensSection(itens, template)}
                    ${this.renderMateriaisSection(barras, template.densidade)}
                    ${ehDegrau ? this.renderChapasSection(chapas) : ''}
                    ${this.renderProcessosSection(processos)}

                    <div class="memoria-total">
                        <div class="memoria-total-value">${custoTotal.total}</div>
                        <div class="memoria-total-per-m2">Custo por m²: ${custoTotal.porM2}</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderClampMemory(templateData) {
        const { template, totais, itens, custoTotal } = templateData;

        const renderCostTable = (title, costs) => html`
            <h6 class="subtitle is-6 mt-4">${title}</h6>
            <table class="table is-bordered is-narrow is-fullwidth custo-fixo-table">
                <tbody>
                ${Object.entries(costs).map(([key, value]) => html`
                    <tr>
                        <td>${FormattingService.capitalize(key)}</td>
                        <td class="has-text-right">${FormattingService.formatCurrency(value)}</td>
                    </tr>
                `)}
                <tr>
                    <td class="has-text-weight-bold">Subtotal</td>
                    <td class="has-text-right has-text-weight-bold">
                        ${FormattingService.formatCurrency(Object.values(costs).reduce((a, b) => a + b, 0))}
                    </td>
                </tr>
                </tbody>
            </table>
        `;

        return html`
            <div class="memoria-template is-clamp">
                <div class="memoria-template-header is-clamp">
                    <div class="memoria-template-title">
                        <i class="fas fa-paperclip mr-2"></i>${template.nome}
                        <span class="tag is-info">GRAMPO</span>
                    </div>
                    <div class="memoria-template-subtitle">
                        <span><i class="fas fa-list mr-1"></i>${itens.length} itens</span>
                        <span><i class="fas fa-weight mr-1"></i>${totais.pesoComMargem} kg</span>
                    </div>
                </div>
                <div class="memoria-template-body">
                    ${this.renderItensSection(itens, template)}

                    <div class="memoria-section">
                        <div class="memoria-section-title"><i class="fas fa-dollar-sign"></i> Detalhamento de Custos Unitários (Fixos)</div>
                        <div class="columns">
                            <div class="column">
                                ${renderCostTable('Matéria Prima', template.costs.material)}
                            </div>
                            <div class="column">
                                ${renderCostTable('Mão de Obra', template.costs.maoDeObra)}
                                ${renderCostTable('Galvanização', template.costs.galvanizacao)}
                            </div>
                        </div>
                    </div>

                    <div class="memoria-total">
                        <div class="memoria-total-value">${custoTotal.total}</div>
                        <div class="memoria-total-per-m2">Custo Total dos Itens</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderItensSection(itens, template) {
        return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-list"></i> Itens do Modelo</div>
                <div class="memoria-items-grid">
                    ${map(itens, (itemData) => {
                        const item = itemData.item;
                        const displayData = FormattingService.getItemDisplayData(item, template);
                        return html`
                            <div class="memoria-item-card">
                                <div class="item-display-content">
                                    <div class="item-display-title">${(item.order ?? 0) + 1}. ${displayData.title}</div>
                                    <div class="item-display-details">${displayData.detailsLine}</div>
                                    <div class="item-display-results mt-2">
                                        <strong>Peso Total:</strong> ${itemData.pesoComMargem}kg |
                                        <strong>Custo Total:</strong> ${itemData.custoTotal} |
                                        <strong>Custo/unidade:</strong> ${itemData.custoUnitario}
                                    </div>
                                </div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }

    renderMateriaisSection(barras, densidade) {
        if (!barras.rows || barras.rows.length === 0) return '';
        return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-bars"></i> Barras Metálicas (Densidade: ${densidade} kg/m³)</div>
                <table class="memoria-materials-table">
                    <thead><tr><th>Esp./Ø</th><th>Largura</th><th>Barras</th><th>Peso MP</th><th>Preço/kg</th><th>Custo</th></tr></thead>
                    <tbody>
                    ${map(barras.rows, (row) => html`
                        <tr>
                            <td>${row.esp}</td><td>${row.larg}</td><td>${row.numBarras}</td>
                            <td>${row.pesoMP} kg</td><td>${row.precoKg}/kg</td><td class="custo-cell">${row.custo}</td>
                        </tr>
                    `)}
                    </tbody>
                </table>
                <div style="text-align: right; font-weight: 600; color: #48c774;">Subtotal Barras: ${barras.subtotal}</div>
            </div>
        `;
    }

    renderChapasSection(chapas) {
        if (!chapas.rows || chapas.rows.length === 0) return '';
        return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-layer-group"></i> Chapas para Degraus</div>
                <table class="memoria-materials-table">
                    <thead><tr><th>Tipo</th><th>Dimensões</th><th>Comp. (mm)</th><th>Qtd</th><th>Peso</th><th>Preço Mat.</th><th>Custo Material</th></tr></thead>
                    <tbody>
                    ${map(chapas.rows, (row) => html`
                        <tr>
                            <td><strong>${row.tipo}</strong></td><td>${row.dimensoes}</td><td>${row.comp}</td>
                            <td>${row.qtd}</td><td>${row.peso} kg${row.observacao}</td><td>${row.precoKg}/kg</td><td class="custo-cell">${row.custo}</td>
                        </tr>
                    `)}
                    </tbody>
                </table>
                <div style="text-align: right; font-weight: 600; color: #ffdd57;">Subtotal Material Chapas: ${chapas.subtotal}</div>
            </div>
        `;
    }

    renderProcessosSection(processos) {
        return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-tools"></i> Processos ${processos.tipoPreco}</div>
                <div class="memoria-processes">
                    ${map(processos.items, (proc) => html`
                        <div class="memoria-process-row">
                            <div>
                                <strong>${proc.nome}</strong>
                                <div class="memoria-process-calc">${proc.calculo}</div>
                            </div>
                            <div>${proc.custo}</div>
                        </div>
                    `)}
                    <div class="memoria-process-row" style="font-weight: 600;">
                        <div><strong>Total Processos</strong></div>
                        <div>${processos.total}</div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('calculation-memory', CalculationMemory);