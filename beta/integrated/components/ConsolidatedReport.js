import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class ConsolidatedReport extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .table-container {
            overflow-x: auto;
        }
        /* Estilos movidos do styles.css para garantir encapsulamento */
        .data-table {
            width: 100%;
            font-size: 0.875rem;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        .data-table th, .data-table td {
            padding: 0.5rem;
            border: 1px solid #e8e8e8;
            vertical-align: top;
            text-align: left;
        }
        .data-table th {
            background: #3273dc;
            color: white;
            font-weight: 600;
        }
        .template-cutting-plan-box {
            margin-bottom: 2rem;
            padding: 0;
            border: 1px solid #e0e0e0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
            border-radius: 8px;
            overflow: hidden;
        }
        .template-cutting-plan-header {
            background-color: #fafafa;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        .template-cutting-plan-header .title {
            margin-bottom: 0;
            color: #363636;
        }
        .template-cutting-plan-body {
            padding: 1.5rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        .aproveitamento-card.box {
            padding: 1.25rem;
            background-color: #ffffff;
            border: 1px solid #dbdbdb;
            border-left: 4px solid #3298dc;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .aproveitamento-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            gap: 1rem;
        }
        .aproveitamento-title {
            margin-bottom: 0 !important;
            color: #363636;
        }
        .aproveitamento-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            flex-grow: 1;
        }
        .aproveitamento-info {
            font-size: 1rem;
            font-weight: 600;
        }
        .aproveitamento-peso {
            font-size: 0.875rem;
            color: #666;
        }
        .waste-indicator {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
        }
        .waste-low { background: #d4edda; color: #155724; }
        .waste-medium { background: #fff3cd; color: #856404; }
        .waste-high { background: #f8d7da; color: #721c24; }
    `;

    static properties = {
        reportData: { type: Object },
    };

    constructor() {
        super();
        this.reportData = {
            consolidadoBarras: [],
            consolidadoChapas: [],
            consolidadoGrampos: [],
            planoCorte: [],
            hasData: false
        };
    }

    render() {
        if (!this.reportData.hasData) {
            return html`<p class="has-text-grey">Adicione itens ao orçamento para ver o consolidado geral.</p>`;
        }

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            ${this.reportData.consolidadoBarras.length > 0 ? html`
                <h5 class="subtitle is-5">
                    <i class="fas fa-bars mr-2"></i>
                    Consolidado de Barras Metálicas (Grades)
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Esp./Ø (mm)</th>
                            <th>Larg. (mm)</th>
                            <th>Comp. (mm)</th>
                            <th>Qtd Total</th>
                            <th>Peso Total (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this.reportData.consolidadoBarras, (row) => html`
                            <tr>
                                <td><strong>${row.template}</strong></td>
                                <td>${row.esp}</td>
                                <td>${row.larg}</td>
                                <td>${row.comp}</td>
                                <td>${row.qtd}</td>
                                <td>${row.peso}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            ` : ''}

            ${this.reportData.consolidadoChapas.length > 0 ? html`
                <h5 class="subtitle is-5" style="margin-top: 2rem;">
                    <i class="fas fa-layer-group mr-2"></i>
                    Consolidado de Chapas para Degraus
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Esp. (mm)</th>
                            <th>Larg. (mm)</th>
                            <th>Comp. (mm)</th>
                            <th>Qtd Total</th>
                            <th>Peso Total (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this.reportData.consolidadoChapas, (row) => html`
                            <tr>
                                <td><strong>${row.template}</strong></td>
                                <td>${row.tipo}</td>
                                <td>${row.esp}</td>
                                <td>${row.larg}</td>
                                <td>${row.comp}</td>
                                <td>${row.qtd}</td>
                                <td>${row.peso}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            ` : ''}

            ${this.reportData.consolidadoGrampos.length > 0 ? html`
                <h5 class="subtitle is-5" style="margin-top: 2rem;">
                    <i class="fas fa-paperclip mr-2"></i>
                    Consolidado de Grampos de Fixação
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Qtd Total</th>
                            <th>Peso Unit. (kg)</th>
                            <th>Peso Total (kg)</th>
                            <th>Custo Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this.reportData.consolidadoGrampos, (row) => html`
                            <tr>
                                <td><strong>${row.template}</strong></td>
                                <td>${FormattingService.formatInteger(row.qtd)}</td>
                                <td>${FormattingService.formatNumber(row.pesoUnitario, 3)}</td>
                                <td>${FormattingService.formatNumber(row.pesoTotal)}</td>
                                <td>${FormattingService.formatCurrency(row.custoTotal)}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            ` : ''}

            ${this.reportData.planoCorte.length > 0 ? html`
                <div style="margin-top: 2rem;">
                    <h4 class="subtitle is-5">
                        <i class="fas fa-cut mr-2"></i>
                        Plano de Corte - Barras de ${this.reportData.planoCorte[0].tamanhoBarra}mm
                    </h4>
                    ${map(this.reportData.planoCorte, (templatePlan) => html`
                        <div class="box template-cutting-plan-box">
                            <div class="template-cutting-plan-header">
                                <h2 class="title is-5">
                                    <i class="fas fa-cog mr-2"></i>
                                    Modelo: ${templatePlan.template}
                                </h2>
                            </div>
                            <div class="template-cutting-plan-body">
                                ${map(templatePlan.cards, (card) => html`
                                    <div class="box aproveitamento-card">
                                        <div class="aproveitamento-header">
                                            <h6 class="subtitle is-6 aproveitamento-title">
                                                <i class="fas ${card.icon} mr-2"></i>
                                                ${card.tipoBarra}: ${card.dimensao}mm
                                            </h6>
                                            <span class="waste-indicator ${card.classeDesperdicio}">
                                                Desperdício: ${card.desperdicio}%
                                            </span>
                                        </div>
                                        <div class="aproveitamento-body">
                                            <div class="aproveitamento-info">
                                                <strong>${card.numBarras} barras</strong> de ${templatePlan.tamanhoBarra}mm
                                            </div>
                                            <div class="aproveitamento-peso">
                                                <strong>Peso MP:</strong> ${card.pesoMP} kg
                                            </div>
                                        </div>
                                    </div>
                                `)}
                            </div>
                        </div>
                    `)}
                </div>
            ` : ''}
        `;
    }
}

customElements.define('consolidated-report', ConsolidatedReport);