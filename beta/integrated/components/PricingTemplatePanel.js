import { LitElement, html, css } from 'lit';
import { CONFIG, UF_DATA } from '../../shared/config.js';
import { FormattingService } from '../../core/services/FormattingService.js';

export class PricingTemplatePanel extends LitElement {
    static styles = css`
        :host { display: block; }
        .pricing-panel-content {
            padding: 1.5rem;
            background-color: #fff;
        }
        .context-section {
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #dbdbdb;
        }
        .columns {
            margin-left: -0.75rem;
            margin-right: -0.75rem;
        }
        .column {
            padding: 0.75rem;
        }
        .result-section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #dbdbdb;
        }
        .result-box {
            background-color: #f5f5f5;
            padding: 1rem;
            border-radius: 6px;
        }
        .result-final {
            background-color: #d4edda; /* success-light */
            border: 1px solid #c3e6cb;
        }
        .is-readonly {
            background-color: #f5f5f5 !important;
            cursor: not-allowed;
            color: #7a7a7a;
        }
        /* Adicionado para garantir que os campos de IPI tenham margem quando fora do box */
        .field.ipi-field {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px dashed #dbdbdb;
        }
    `;

    static properties = {
        template: { type: Object },
        masterUfDestino: { type: String },
    };

    constructor() {
        super();
        this.template = {};
        this.masterUfDestino = "";
    }

    _extractFormData() {
        const formElement = this.shadowRoot.querySelector('form');
        if (!formElement) return null;

        const DEFAULTS = CONFIG.PRICING.DEFAULTS;
        const getNumericValue = (selector, defaultValue) => {
            const input = formElement.querySelector(selector);
            if (!input) return defaultValue;
            const value = parseFloat(input.value);
            return isNaN(value) ? defaultValue : value;
        };

        const config = {
            tipoConfiguracao: formElement.querySelector('.template-tipo-config').value,
            lucroLiquido: getNumericValue('.template-lucro', DEFAULTS.lucroLiquido),
            despesasFixas: getNumericValue('.template-despesas', DEFAULTS.despesasFixas),
            comissoesInternas: getNumericValue('.template-comissoes', DEFAULTS.comissoesInternas),
            comissoesRepres: getNumericValue('.template-comissoes-repres', DEFAULTS.comissoesRepres),
            despesasFinanceiras: getNumericValue('.template-despesas-financeiras', DEFAULTS.despesasFinanceiras),
            csllIrpj: getNumericValue('.template-csll', DEFAULTS.csllIrpj),
            icmsMaterial: getNumericValue('.template-icms-material', DEFAULTS.icmsMaterial),
            ipiMaterial: getNumericValue('.template-ipi-material', DEFAULTS.ipiMaterial),
            ipiRevenda: getNumericValue('.template-ipi-revenda', DEFAULTS.ipiRevenda),
            ipiVendaFinal: getNumericValue('.template-ipi-venda', DEFAULTS.ipiVendaFinal),
            fretePerc: getNumericValue('.template-frete-perc', DEFAULTS.fretePerc),
            freteValor: getNumericValue('.template-frete-valor', DEFAULTS.freteValor),
            stCompraQtde: getNumericValue('.template-st-qtde', DEFAULTS.stCompraQtde),
            stCompraUnit: getNumericValue('.template-st-unit', DEFAULTS.stCompraUnit),
            taxaEnergiaQtde: getNumericValue('.template-energia-qtde', DEFAULTS.taxaEnergiaQtde),
            taxaEnergiaUnit: getNumericValue('.template-energia-unit', DEFAULTS.taxaEnergiaUnit),
            vendaEstaleiro: formElement.querySelector('.template-venda-estaleiro').value === 'true',
            vendaExportacao: formElement.querySelector('.template-venda-exportacao').value === 'true'
        };
        return config;
    }

    _handleCalculateClick() {
        const formData = this._extractFormData();
        if (formData) {
            this.dispatchEvent(new CustomEvent('calculate-pricing', {
                detail: {
                    templateId: this.template.id,
                    formData: formData
                },
                bubbles: true,
                composed: true
            }));
        }
    }

    _handleCopyClick() {
        this.dispatchEvent(new CustomEvent('copy-config', {
            detail: { templateId: this.template.id },
            bubbles: true, composed: true
        }));
    }

    render() {
        if (!this.template.id) return html``;

        const config = this.template.pricingConfig || {};
        const DEFAULTS = CONFIG.PRICING.DEFAULTS;

        const ipiMaterial = config.ipiMaterial !== undefined ? config.ipiMaterial : DEFAULTS.ipiMaterial;
        const ipiRevenda = config.ipiRevenda !== undefined ? config.ipiRevenda : DEFAULTS.ipiRevenda;
        const ipiVendaFinal = config.ipiVendaFinal !== undefined ? config.ipiVendaFinal : DEFAULTS.ipiVendaFinal;

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="pricing-panel-content">
                <form class="template-pricing-form" data-template-id="${this.template.id}">

                    <div class="context-section">
                        <div class="columns is-multiline">
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Tipo de Configuração *</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-tipo-config" required>
                                                <option value="">Selecione o tipo...</option>
                                                <option value="grade" ?selected=${config.tipoConfiguracao === 'grade'}>Venda de Grade ST</option>
                                                <option value="grampo" ?selected=${config.tipoConfiguracao === 'grampo'}>Vendas de Grampo ST</option>
                                                <option value="telas" ?selected=${config.tipoConfiguracao === 'telas'}>Telas/Revenda/Consumo ST</option>
                                                <option value="naoContribuinte" ?selected=${config.tipoConfiguracao === 'naoContribuinte'}>Venda para Não Contribuinte</option>
                                                <option value="consumidorFinal" ?selected=${config.tipoConfiguracao === 'consumidorFinal'}>Venda para Consumidor Final</option>
                                                <option value="revendaNormal" ?selected=${config.tipoConfiguracao === 'revendaNormal'}>Venda/Revenda Normal (padrão)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">UF de Destino *</label>
                                    <div class="control">
                                        <input class="input is-readonly" type="text" readonly .value=${this.masterUfDestino || 'N/A'}>
                                    </div>
                                    <p class="help">Definido na aba "Proposta".</p>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Venda para Estaleiro</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-venda-estaleiro">
                                                <option value="false" ?selected=${!config.vendaEstaleiro}>Não</option>
                                                <option value="true" ?selected=${config.vendaEstaleiro}>Sim</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Venda para Exportação</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-venda-exportacao">
                                                <option value="false" ?selected=${!config.vendaExportacao}>Não</option>
                                                <option value="true" ?selected=${config.vendaExportacao}>Sim</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-primary">
                                <i class="fas fa-receipt mr-2"></i>Custos e Fatores de Entrada
                            </h6>
                            <div class="field">
                                <label class="label">IPI Material (%) <span class="tag is-info is-light is-small">Industrialização</span></label>
                                <input class="input template-ipi-material" type="number" step="0.01" min="0" max="100" value="${ipiMaterial}">
                            </div>
                            <div class="field">
                                <label class="label">ICMS Material (%)</label>
                                <input class="input template-icms-material" type="number" step="0.01" min="0" max="100"
                                        value="${config.icmsMaterial !== undefined ? config.icmsMaterial : DEFAULTS.icmsMaterial}">
                            </div>
                            <div class="field">
                                <label class="label">IPI na Revenda (%) <span class="tag is-warning is-light is-small">Revenda</span></label>
                                <input class="input template-ipi-revenda" type="number" step="0.01" min="0" max="100" value="${ipiRevenda}">
                            </div>
                            <div class="field">
                                <label class="label">ST Compra - Quantidade</label>
                                <input class="input template-st-qtde" type="number" step="0.01" min="0"
                                        value="${config.stCompraQtde !== undefined ? config.stCompraQtde : DEFAULTS.stCompraQtde}">
                            </div>
                            <div class="field">
                                <label class="label">ST Compra - Valor Unitário (R$)</label>
                                <input class="input template-st-unit" type="number" step="0.01" min="0"
                                        value="${config.stCompraUnit !== undefined ? config.stCompraUnit : DEFAULTS.stCompraUnit}">
                            </div>
                            <div class="field">
                                <label class="label">Taxa Energia - Quantidade</label>
                                <input class="input template-energia-qtde" type="number" step="0.01" min="0"
                                        value="${config.taxaEnergiaQtde !== undefined ? config.taxaEnergiaQtde : DEFAULTS.taxaEnergiaQtde}">
                            </div>
                            <div class="field">
                                <label class="label">Taxa Energia - Valor Unitário (R$)</label>
                                <input class="input template-energia-unit" type="number" step="0.01" min="0"
                                        value="${config.taxaEnergiaUnit !== undefined ? config.taxaEnergiaUnit : DEFAULTS.taxaEnergiaUnit}">
                            </div>
                        </div>

                        <div class="column">
                            <h6 class="subtitle is-6 has-text-success">
                                <i class="fas fa-chart-pie mr-2"></i>Composição do Preço de Venda
                            </h6>
                            <div class="field">
                                <label class="label">Lucro Líquido (%)</label>
                                <input class="input template-lucro" type="number" step="0.01" min="0" max="100"
                                        value="${config.lucroLiquido !== undefined ? config.lucroLiquido : DEFAULTS.lucroLiquido}">
                            </div>
                            <div class="field">
                                <label class="label">Despesas Fixas (%)</label>
                                <input class="input template-despesas" type="number" step="0.01" min="0" max="100"
                                        value="${config.despesasFixas !== undefined ? config.despesasFixas : DEFAULTS.despesasFixas}">
                            </div>
                            <div class="field">
                                <label class="label">Comissões Internas (%)</label>
                                <input class="input template-comissoes" type="number" step="0.01" min="0" max="100"
                                        value="${config.comissoesInternas !== undefined ? config.comissoesInternas : DEFAULTS.comissoesInternas}">
                            </div>
                            <div class="field">
                                <label class="label">Comissões Representantes (%)</label>
                                <input class="input template-comissoes-repres" type="number" step="0.01" min="0" max="100"
                                        value="${config.comissoesRepres !== undefined ? config.comissoesRepres : DEFAULTS.comissoesRepres}">
                            </div>
                            <div class="field">
                                <label class="label">Despesas Financeiras (%)</label>
                                <input class="input template-despesas-financeiras" type="number" step="0.01" min="0" max="100"
                                        value="${config.despesasFinanceiras !== undefined ? config.despesasFinanceiras : DEFAULTS.despesasFinanceiras}">
                            </div>
                            <div class="field">
                                <label class="label">CSLL/IRPJ (%)</label>
                                <input class="input template-csll" type="number" step="0.01" min="0" max="100"
                                        value="${config.csllIrpj !== undefined ? config.csllIrpj : DEFAULTS.csllIrpj}">
                            </div>

                            <div class="field ipi-field">
                                <label class="label">Frete Percentual (%)</label>
                                <input class="input template-frete-perc" type="number" step="0.01" min="0" max="100"
                                        value="${config.fretePerc !== undefined ? config.fretePerc : DEFAULTS.fretePerc}">
                            </div>
                            <div class="field">
                                <label class="label">Frete Valor Fixo (R$)</label>
                                <input class="input template-frete-valor" type="number" step="0.01" min="0"
                                        value="${config.freteValor !== undefined ? config.freteValor : DEFAULTS.freteValor}">
                            </div>
                            <div class="field">
                                <label class="label">IPI Venda Final (%) <span class="tag is-success is-light is-small">Venda</span></label>
                                <input class="input template-ipi-venda" type="number" step="0.01" min="0" max="100" value="${ipiVendaFinal}">
                            </div>
                        </div>
                    </div>

                    <div class="result-section">
                        ${this.template.hasResult ? html`
                            <div class="result-box result-final">
                                <h6 class="subtitle is-6">Resultado do Cálculo</h6>
                                <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Preço de Venda (c/ DIFAL)</p>
                                            <p class="title is-5">${FormattingService.formatCurrency(config.result.B97_precoVendaComDifal)}</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Preço por m²</p>
                                            <p class="title is-5">${FormattingService.formatCurrency(this.template.pricePerM2 || 0)}</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Valor Final (c/ IPI+ST)</p>
                                            <p class="title is-4">${FormattingService.formatCurrency(config.result.B102_valorFinalComIPIST)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ` : ''}

                        <div class="field is-grouped mt-4">
                            <div class="control">
                                <button type="button" class="button is-primary" @click=${this._handleCalculateClick}>
                                    <span class="icon"><i class="fas fa-calculator"></i></span>
                                    <span>${this.template.hasResult ? 'Recalcular Preço' : 'Calcular Preço'}</span>
                                </button>
                            </div>
                            <div class="control">
                                <button type="button" class="button is-info is-outlined" @click=${this._handleCopyClick}>
                                    <span class="icon"><i class="fas fa-copy"></i></span>
                                    <span>Copiar Configuração</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define('pricing-template-panel', PricingTemplatePanel);