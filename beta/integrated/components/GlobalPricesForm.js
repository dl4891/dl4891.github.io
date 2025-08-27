import { LitElement, html, css } from 'lit';

export class GlobalPricesForm extends LitElement {
    static styles = css`
        :host { display: block; }
        .form-section { margin-bottom: 1.5rem; padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .cost-column { padding-right: 1.5rem; margin-right: 1.5rem; border-right: 1px solid #eee; }
        .cost-column:last-child { border-right: none; margin-right: 0; padding-right: 0.75rem; }
    `;

    static properties = {
        prices: { type: Object },
        materialType: { type: String },
        roundingConfig: { type: Object },
        totalWeightCalcMethod: { type: String },
    };

    constructor() {
        super();
        this.prices = {};
        this.materialType = 'AÇO CARBONO';
        this.roundingConfig = { method: 'none', decimals: 2 };
        this.totalWeightCalcMethod = 'component';
    }

    _handleMaterialTypeChange(e) {
        this.dispatchEvent(new CustomEvent('material-type-change', {
            detail: { materialType: e.target.value },
            bubbles: true, composed: true
        }));
    }

    _handleSave(e) {
        e.preventDefault();
        const form = this.shadowRoot.querySelector('form');
        if (form.checkValidity()) {
            this.dispatchEvent(new CustomEvent('save-global-prices', {
                bubbles: true, composed: true
            }));
        } else {
            form.reportValidity();
        }
    }

    _handleReset() {
        this.dispatchEvent(new CustomEvent('reset-global-prices', {
            bubbles: true, composed: true
        }));
    }

    render() {
        const p = this.prices || {};
        const rc = this.roundingConfig || { method: 'none', decimals: 2 };
        const twcm = this.totalWeightCalcMethod || 'component';
        const isRoundingDisabled = rc.method === 'none';

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <form id="precos-form" @submit=${this._handleSave}>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-file-alt mr-2"></i>Configurações da Proposta</h6>
                    <div class="field">
                        <label class="label">Tipo de Material (para PDF)</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="material-type-select" .value=${this.materialType} @change=${this._handleMaterialTypeChange}>
                                    <option value="AÇO CARBONO">Aço Carbono</option>
                                    <option value="AÇO INOX">Aço Inox</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-dollar-sign mr-2"></i>Custos Globais</h6>
                    <div class="columns">
                        <div class="column cost-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Matéria Prima (R$/kg)</h6>
                            <div class="field"><label class="label">Barra Chata Padrão *</label><div class="control"><input id="preco-chata-padrao" class="input" type="number" step="any" min="0" required .value=${p.chataPadrao || ''}></div></div>
                            <div class="field"><label class="label">Barra Redonda Padrão *</label><div class="control"><input id="preco-redonda-padrao" class="input" type="number" step="any" min="0" required .value=${p.redondaPadrao || ''}></div></div>
                            <div class="field"><label class="label">Chapa Lateral Padrão *</label><div class="control"><input id="preco-chapa-lateral-padrao" class="input" type="number" step="any" min="0" required .value=${p.chapaLateralPadrao || ''}></div></div>
                            <div class="field"><label class="label">Chapa Xadrez Padrão *</label><div class="control"><input id="preco-chapa-xadrez-padrao" class="input" type="number" step="any" min="0" required .value=${p.chapaXadrezPadrao || ''}></div></div>
                        </div>
                        <div class="column cost-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Serviços (R$/kg)</h6>
                            <div class="field"><label class="label">Corte Chapa Lateral *</label><div class="control"><input id="preco-corte-chapa-lateral" class="input" type="number" step="any" min="0" required .value=${p.corteChpaLateral || ''}></div></div>
                            <div class="field"><label class="label">Corte+Dobra Chapa Xadrez *</label><div class="control"><input id="preco-corte-dobra-chapa-xadrez" class="input" type="number" step="any" min="0" required .value=${p.corteDobraChpaXadrez || ''}></div></div>
                        </div>
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Processos (R$/kg)</h6>
                            <div class="field"><label class="label">Mão de Obra *</label><div class="control"><input id="preco-mao-obra" class="input" type="number" step="any" min="0" required .value=${p.maoObra || ''}></div></div>
                            <div class="field"><label class="label">Galvanização</label><div class="control"><input id="preco-galvanizacao" class="input" type="number" step="any" min="0" .value=${p.galvanizacao || ''}></div></div>
                        </div>
                    </div>
                </div>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-calculator mr-2"></i>Configurações de Cálculo de Peso</h6>
                    <div class="columns">
                        <div class="column is-half">
                            <div class="field">
                                <label class="label">Método de Cálculo de Peso Total</label>
                                <div class="control">
                                    <label class="radio"><input type="radio" name="total-weight-calc-method" value="component" .checked=${twcm === 'component'}> Por Componente Total (Padrão)</label><br>
                                    <label class="radio"><input type="radio" name="total-weight-calc-method" value="unit" .checked=${twcm === 'unit'}> Por Unidade Multiplicada</label>
                                </div>
                            </div>
                        </div>
                        <div class="column is-half">
                            <div class="columns is-mobile">
                                <div class="column is-8">
                                    <div class="field">
                                        <label class="label">Tipo de Arredondamento</label>
                                        <div class="control"><div class="select is-fullwidth"><select id="rounding-method" .value=${rc.method}>
                                            <option value="none">Nenhum</option>
                                            <option value="round">Padrão (Matemático)</option>
                                            <option value="ceil">Para Cima (Teto)</option>
                                        </select></div></div>
                                    </div>
                                </div>
                                <div class="column is-4">
                                    <div class="field"><label class="label">Decimais</label><div class="control"><input id="rounding-decimals" class="input" type="number" step="1" min="0" max="4" .value=${rc.decimals} ?disabled=${isRoundingDisabled}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control"><button type="submit" class="button is-primary is-medium"><span class="icon"><i class="fas fa-save"></i></span><span>Salvar Preços e Configurações</span></button></div>
                    <div class="control"><button type="button" @click=${this._handleReset} class="button is-light is-medium"><span>Resetar</span></button></div>
                </div>
            </form>
        `;
    }
}

customElements.define('global-prices-form', GlobalPricesForm);