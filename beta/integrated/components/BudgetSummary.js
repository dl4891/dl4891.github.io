import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class BudgetSummary extends LitElement {
    static styles = css`
        :host { display: block; }
        .totals-box { background: #f8f9fa; border-left: 4px solid #3273dc; }
        .total-cost .title { color: #48c774; }
        .material-consolidado { font-size: 0.8rem; margin-bottom: 0.5rem; }
        .has-text-grey { color: #7a7a7a; }
    `;

    static properties = {
        summary: { type: Object },
    };

    constructor() {
        super();
        this.summary = {
            totalGrades: 0,
            totalGrampos: 0,
            totalArea: 0,
            totalPesoMargem: 0,
            custoMaterial: 0,
            custoGeral: 0,
            consolidado: {},
            hasTeoricoWeights: false,
        };
    }

    renderConsolidado() {
        const nomesMateriais = {
            portante: "Barras Portantes", ligacaoDiam: "Barras Ligação Ø", ligacaoChata: "Barras Ligação Chata",
            fechTerminal: "Fechamento Terminal", fechLateral: "Fechamento Lateral", chapaLateral: "Chapa Lateral",
            chapaXadrez: "Chapa Xadrez",
            grampo: "Grampos de Fixação",
        };

        const materiaisFiltrados = Object.entries(this.summary.consolidado)
        .filter(([_, dados]) => dados.peso > 0)
        .sort(([chaveA], [chaveB]) => (nomesMateriais[chaveA] || chaveA).localeCompare(nomesMateriais[chaveB] || chaveB));

        if (materiaisFiltrados.length === 0) {
            return html`<p class="has-text-grey is-size-7">Adicione itens para ver o consolidado</p>`;
        }

        return materiaisFiltrados.map(([chave, dados]) => html`
            <div class="material-consolidado">
                <strong>${nomesMateriais[chave] || dados.nome || chave}</strong><br>
                ${FormattingService.formatInteger(dados.qtd)} pçs | ${FormattingService.formatNumber(dados.peso)} kg
            </div>
        `);
    }

    render() {
        const teoricoIndicator = this.summary.hasTeoricoWeights
            ? html`<span class="icon is-small has-text-info ml-1" title="O peso total inclui itens com cálculo 'Teórico'"><i class="fas fa-info-circle"></i></span>`
            : '';

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box totals-box">
                <h3 class="subtitle is-4">Resumo do Orçamento</h3>
                <div class="content">
                    <div class="level">
                        <div class="level-item has-text-centered"><div><p class="heading">Itens (Grades)</p><p class="title is-4">${FormattingService.formatInteger(this.summary.totalGrades || 0)}</p></div></div>
                        <div class="level-item has-text-centered"><div><p class="heading">Itens (Grampos)</p><p class="title is-4">${FormattingService.formatInteger(this.summary.totalGrampos || 0)}</p></div></div>
                    </div>
                    <div class="level">
                        <div class="level-item has-text-centered"><div><p class="heading">Área Total (Grades)</p><p class="title is-5">${FormattingService.formatNumber(this.summary.totalArea || 0)} m²</p></div></div>
                        <div class="level-item has-text-centered"><div><p class="heading">Peso Total ${teoricoIndicator}</p><p class="title is-5">${FormattingService.formatNumber(this.summary.totalPesoMargem || 0)} kg</p></div></div>
                    </div>
                    <hr>
                    <div class="level"><div class="level-item"><div><p class="heading">Custo Material</p><p class="title is-6">${FormattingService.formatCurrency(this.summary.custoMaterial || 0)}</p></div></div></div>
                    <div class="level total-cost"><div class="level-item"><div><p class="heading">TOTAL GERAL</p><p class="title is-4">${FormattingService.formatCurrency(this.summary.custoGeral || 0)}</p></div></div></div>
                    <hr>
                    <h6 class="subtitle is-6">Consolidado de Materiais</h6>
                    <div id="consolidado-materiais">${this.renderConsolidado()}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('budget-summary', BudgetSummary);