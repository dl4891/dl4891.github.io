import { LitElement, html, css } from 'lit';

export class TemplateItemForm extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .form-section {
            margin-bottom: 1.5rem;
            padding: 1.25rem;
            border: 1px solid #dbdbdb;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .form-section .subtitle {
            border-bottom: 1px solid #eee;
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
        }
        .field-with-reset {
            position: relative;
        }
        .reset-button {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            color: #3273dc;
            font-size: 0.8rem;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        .reset-button:hover {
            background-color: #f0f0f0;
        }
        .bar-column {
            padding-right: 1.5rem;
            margin-right: 1.5rem;
            border-right: 1px solid #eee;
        }
        .bar-column:last-child {
            border-right: none;
            margin-right: 0;
            padding-right: 0.75rem; /* Ajuste do padding original do Bulma */
        }
    `;

    static properties = {
        editingTemplate: { type: Object },
        _formData: { state: true },
    };

    constructor() {
        super();
        this.editingTemplate = null;
        this._formData = this.getInitialFormData();
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('editingTemplate')) {
            this._formData = this.editingTemplate
                ? { ...this.editingTemplate }
                : this.getInitialFormData();
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('_formData') || changedProperties.has('editingTemplate')) {
            this._updateCalculatedFields(false);
        }
    }

    getInitialFormData() {
        return {
            nome: '', superficie: 'lisa', bp_esp: '', bp_larg: '', bl_diam: '', bl_esp: '',
            bl_larg: '', bf_esp: '', bf_larg: '', malha_menor: '',
            malha_maior: '', tipoMalha: 'interna', densidade: 8000, margem: 2,
            pesoCalcMode: 'teorico',
            precosCustomizados: false, customMaoObra: '', customGalvanizacao: '',
            isDegrau: false, chapaLateralEsp: 4.76, chapaLateralLarg: '',
            incluirChapaXadrez: false, chapaXadrezEsp: 3.18, chapaXadrezLarg: '',
            chapaXadrezAjuste: 1.05,
            createdAt: undefined
        };
    }

    _handleInput(field, e) {
        this._formData = { ...this._formData, [field]: e.target.value };
        this._updateCalculatedFields(false);
    }

    _handleRadio(field, e) {
        this._formData = { ...this._formData, [field]: e.target.value };
        this._updateCalculatedFields(true);
    }

    _handleCheckbox(field, e) {
        const isChecked = e.target.checked;
        const newFormData = { ...this._formData, [field]: isChecked };

        if (field === 'isDegrau' && isChecked) {
            if (!newFormData.hasOwnProperty('chapaLateralEsp') || !newFormData.chapaLateralEsp) {
                newFormData.chapaLateralEsp = this.getInitialFormData().chapaLateralEsp;
            }
        }

        if (field === 'incluirChapaXadrez' && isChecked) {
            if (!newFormData.hasOwnProperty('chapaXadrezEsp') || !newFormData.chapaXadrezEsp) {
                newFormData.chapaXadrezEsp = this.getInitialFormData().chapaXadrezEsp;
            }
            if (!newFormData.hasOwnProperty('chapaXadrezAjuste') || !newFormData.chapaXadrezAjuste) {
                newFormData.chapaXadrezAjuste = this.getInitialFormData().chapaXadrezAjuste;
            }
        }

        this._formData = newFormData;
    }

    _updateCalculatedFields(forceOverwrite = false) {
        const formData = { ...this._formData };
        let hasChanges = false;

        const malhaMenorEfetiva = this._calculateEffectiveMalhaMenor(formData);
        const display = this.shadowRoot.getElementById('malha-efetiva-display');
        if (display) {
            display.value = `${malhaMenorEfetiva}x${parseFloat(formData.malha_maior) || 0}`;
        }

        if (formData.isDegrau) {
            const larguraBarraPortante = parseFloat(formData.bp_larg) || 0;

            if (larguraBarraPortante > 0) {
                const largCalculada = 5 * Math.ceil((larguraBarraPortante + 37) / 5);
                if (!formData.chapaLateralLarg || forceOverwrite) {
                    formData.chapaLateralLarg = largCalculada;
                    hasChanges = true;
                }
            }

            if (formData.incluirChapaXadrez && larguraBarraPortante > 0 && malhaMenorEfetiva > 0) {
                const largCalculada = larguraBarraPortante + malhaMenorEfetiva;
                if (!formData.chapaXadrezLarg || forceOverwrite) {
                    formData.chapaXadrezLarg = largCalculada;
                    hasChanges = true;
                }
            }
        }

        if(hasChanges) {
            this._formData = formData;
        }
    }

    _resetChapaLateralLargura() {
        const larguraBarraPortante = parseFloat(this._formData.bp_larg) || 0;
        if (this._formData.isDegrau && larguraBarraPortante > 0) {
            this._formData = {
                ...this._formData,
                chapaLateralLarg: 5 * Math.ceil((larguraBarraPortante + 37) / 5)
            };
        }
    }

    _resetChapaXadrezLargura() {
        const larguraBarraPortante = parseFloat(this._formData.bp_larg) || 0;
        const malhaMenorEfetiva = this._calculateEffectiveMalhaMenor(this._formData);
        if (this._formData.isDegrau && this._formData.incluirChapaXadrez && larguraBarraPortante > 0 && malhaMenorEfetiva > 0) {
            this._formData = {
                ...this._formData,
                chapaXadrezLarg: larguraBarraPortante + malhaMenorEfetiva
            };
        }
    }

    _calculateEffectiveMalhaMenor(data) {
        const tipoMalha = data.tipoMalha || 'centro';
        const malhaMenor = parseFloat(data.malha_menor) || 0;
        const bpEsp = parseFloat(data.bp_esp) || 0;
        if (tipoMalha === 'interna' && malhaMenor > 0 && bpEsp > 0) {
            return malhaMenor + Math.round(bpEsp);
        }
        return malhaMenor;
    }

    _handleSubmit(event) {
        event.preventDefault();
        const form = this.shadowRoot.querySelector('form');
        if (form.checkValidity()) {
            this.dispatchEvent(new CustomEvent('save-template', {
                detail: { ...this._formData },
                bubbles: true,
                composed: true
            }));
        } else {
            form.reportValidity();
        }
    }

    _handleClear() {
        this.dispatchEvent(new CustomEvent('clear-form', { bubbles: true, composed: true }));
    }

    render() {
        const formData = this._formData || this.getInitialFormData();

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <form @submit=${this._handleSubmit}>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-pencil-alt mr-2"></i>Dados Principais</h6>
                    <div class="columns">
                        <div class="column is-two-thirds">
                            <div class="field">
                                <label class="label">Nome do Modelo *</label>
                                <div class="control">
                                    <input class="input is-medium" type="text" placeholder="Ex: Grade Padrão A" required maxlength="50"
                                            .value=${formData.nome || ''} @input=${(e) => this._handleInput('nome', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Superfície</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="superficie" value="lisa"
                                                .checked=${(formData.superficie || 'lisa') === 'lisa'} @change=${(e) => this._handleRadio('superficie', e)}>
                                        Lisa
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="superficie" value="serrilhada"
                                                .checked=${formData.superficie === 'serrilhada'} @change=${(e) => this._handleRadio('superficie', e)}>
                                        Serrilhada
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-ruler-combined mr-2"></i>Configuração das Barras</h6>
                    <div class="columns">
                        <div class="column bar-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Portantes</h6>
                            <div class="field">
                                <label class="label">Espessura (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="0.1" max="50" required
                                            .value=${formData.bp_esp || ''} @input=${(e) => this._handleInput('bp_esp', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Largura (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="1" max="200" required
                                            .value=${formData.bp_larg || ''} @input=${(e) => this._handleInput('bp_larg', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column bar-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Ligação</h6>
                            <div class="field">
                                <label class="label">Diâmetro (mm)</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="0" max="50"
                                            .value=${formData.bl_diam || ''} @input=${(e) => this._handleInput('bl_diam', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Esp. Chata (mm)</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="0" max="25"
                                            .value=${formData.bl_esp || ''} @input=${(e) => this._handleInput('bl_esp', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Larg. Chata (mm)</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="0" max="100"
                                            .value=${formData.bl_larg || ''} @input=${(e) => this._handleInput('bl_larg', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column bar-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Fechamento</h6>
                            <div class="field">
                                <label class="label">Espessura (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="0.1" max="25" required
                                            .value=${formData.bf_esp || ''} @input=${(e) => this._handleInput('bf_esp', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Largura (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.01" min="1" max="100" required
                                            .value=${formData.bf_larg || ''} @input=${(e) => this._handleInput('bf_larg', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-th mr-2"></i>Configuração da Malha</h6>
                    <div class="columns">
                        <div class="column is-one-third">
                            <div class="field">
                                <label class="label">Malha Menor (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="1" min="20" max="150" required
                                            .value=${formData.malha_menor || ''} @input=${(e) => this._handleInput('malha_menor', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column is-one-third">
                            <div class="field">
                                <label class="label">Malha Maior (mm) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="1" min="20" max="150" required
                                            .value=${formData.malha_maior || ''} @input=${(e) => this._handleInput('malha_maior', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column is-one-third">
                            <div class="field">
                                <label class="label">Malha Efetiva</label>
                                <div class="control">
                                    <input id="malha-efetiva-display" class="input" type="text" readonly tabindex="-1"
                                            style="background-color: #f5f5f5; font-weight: bold; color: #3273dc; cursor: not-allowed;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Tipo de Cálculo da Malha</label>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="tipo-malha" value="centro"
                                        .checked=${formData.tipoMalha === 'centro'} @change=${(e) => this._handleRadio('tipoMalha', e)}>
                                Centro a Centro (Padrão)
                            </label>
                            <label class="radio">
                                <input type="radio" name="tipo-malha" value="interna"
                                        .checked=${formData.tipoMalha === 'interna'} @change=${(e) => this._handleRadio('tipoMalha', e)}>
                                Malha Interna (Otimizada)
                            </label>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-cogs mr-2"></i>Parâmetros Gerais</h6>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Densidade (kg/m³) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="1" min="7000" max="9000" required
                                            .value=${formData.densidade || ''} @input=${(e) => this._handleInput('densidade', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Margem de Segurança (%) *</label>
                                <div class="control">
                                    <input class="input" type="number" step="0.1" min="0" max="50" required
                                            .value=${formData.margem || ''} @input=${(e) => this._handleInput('margem', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Método de Cálculo do Peso</label>
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="peso-calc-mode" value="real"
                                                .checked=${(formData.pesoCalcMode || 'real') === 'real'} @change=${(e) => this._handleRadio('pesoCalcMode', e)}>
                                        Peso Real (Produção)
                                    </label>
                                    <label class="radio">
                                        <input type="radio" name="peso-calc-mode" value="teorico"
                                                .checked=${formData.pesoCalcMode === 'teorico'} @change=${(e) => this._handleRadio('pesoCalcMode', e)}>
                                        Peso Teórico (Comercial)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-dollar-sign mr-2"></i>Opções de Preços Customizados</h6>
                    <label class="checkbox">
                        <input type="checkbox" .checked=${formData.precosCustomizados}
                                @change=${(e) => this._handleCheckbox('precosCustomizados', e)}>
                        Usar preços customizados para este modelo
                    </label>
                    <div style="display: ${formData.precosCustomizados ? 'block' : 'none'}" class="mt-4">
                        <div class="columns">
                            <div class="column">
                                <div class="field">
                                    <label class="label">Mão de Obra (R$/kg)</label>
                                    <div class="control">
                                        <input class="input" type="number" step="any" min="0" placeholder="Ex: 15.50"
                                                .value=${formData.customMaoObra || ''} @input=${(e) => this._handleInput('customMaoObra', e)}>
                                    </div>
                                </div>
                            </div>
                            <div class="column">
                                <div class="field">
                                    <label class="label">Galvanização (R$/kg)</label>
                                    <div class="control">
                                        <input class="input" type="number" step="any" min="0" placeholder="Ex: 8.00"
                                                .value=${formData.customGalvanizacao || ''} @input=${(e) => this._handleInput('customGalvanizacao', e)}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-shoe-prints mr-2"></i>Opções de Degrau</h6>
                    <label class="checkbox">
                        <input type="checkbox" .checked=${formData.isDegrau}
                                @change=${(e) => this._handleCheckbox('isDegrau', e)}>
                        Configurar como Degrau
                    </label>
                    <div style="display: ${formData.isDegrau ? 'block' : 'none'}" class="mt-4">
                        <div class="columns">
                            <div class="column">
                                <h6 class="subtitle is-6">Chapa Lateral</h6>
                                <div class="field">
                                    <label class="label">Espessura (mm) *</label>
                                    <div class="control">
                                        <input class="input" type="number" step="0.01" min="0.1" max="50"
                                                .value=${formData.chapaLateralEsp || ''} @input=${(e) => this._handleInput('chapaLateralEsp', e)}>
                                    </div>
                                </div>
                                <div class="field field-with-reset">
                                    <label class="label">Largura (mm) *</label>
                                    <div class="control">
                                        <input class="input" type="number" step="0.01" min="1" max="200"
                                                .value=${formData.chapaLateralLarg || ''} @input=${(e) => this._handleInput('chapaLateralLarg', e)}>
                                        <button type="button" class="reset-button" title="Redefinir largura" @click=${this._resetChapaLateralLargura}>
                                            <span class="icon is-small"><i class="fas fa-undo"></i></span>
                                        </button>
                                    </div>
                                    <p class="help">Fórmula: ARRED.PARA.CIMA((Larg.Portante + 37) / 5) * 5</p>
                                </div>
                            </div>
                            <div class="column">
                                <h6 class="subtitle is-6">Chapa Xadrez (Opcional)</h6>
                                <div class="field">
                                    <label class="checkbox">
                                        <input type="checkbox" .checked=${formData.incluirChapaXadrez}
                                                @change=${(e) => this._handleCheckbox('incluirChapaXadrez', e)}>
                                        Incluir chapa xadrez
                                    </label>
                                </div>
                                <div style="display: ${formData.incluirChapaXadrez ? 'block' : 'none'}">
                                    <div class="field">
                                        <label class="label">Espessura (mm) *</label>
                                        <div class="control">
                                            <input class="input" type="number" step="0.01" min="0.1" max="50"
                                                    .value=${formData.chapaXadrezEsp || ''} @input=${(e) => this._handleInput('chapaXadrezEsp', e)}>
                                        </div>
                                    </div>
                                    <div class="field field-with-reset">
                                        <label class="label">Largura (mm) *</label>
                                        <div class="control">
                                            <input class="input" type="number" step="0.01" min="1" max="200"
                                                    .value=${formData.chapaXadrezLarg || ''} @input=${(e) => this._handleInput('chapaXadrezLarg', e)}>
                                            <button type="button" class="reset-button" title="Redefinir largura" @click=${this._resetChapaXadrezLargura}>
                                                <span class="icon is-small"><i class="fas fa-undo"></i></span>
                                            </button>
                                        </div>
                                        <p class="help">Fórmula: Larg.Portante + Malha Menor</p>
                                    </div>
                                    <div class="field">
                                        <label class="label">Ajuste de Peso *</label>
                                        <div class="control">
                                            <input class="input" type="number" step="0.01" min="1" max="2"
                                                    .value=${formData.chapaXadrezAjuste || ''} @input=${(e) => this._handleInput('chapaXadrezAjuste', e)}>
                                        </div>
                                        <p class="help">Multiplicador para ajuste do peso (padrão: 1.05) </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-grouped mt-5">
                    <div class="control">
                        <button type="submit" class="button is-primary is-medium">
                            ${this.editingTemplate
                                    ? html`<span class="icon"><i class="fas fa-save"></i></span><span>Atualizar Modelo</span>`
                                    : html`<span class="icon"><i class="fas fa-save"></i></span><span>Salvar Modelo</span>`
                            }
                        </button>
                    </div>
                    <div class="control">
                        <button type="button" @click=${this._handleClear} class="button is-light is-medium">
                            <span>${this.editingTemplate ? 'Cancelar Edição' : 'Limpar'}</span>
                        </button>
                    </div>
                </div>
            </form>
        `;
    }
}

customElements.define('template-item-form', TemplateItemForm);