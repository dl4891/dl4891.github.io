import { LitElement, html, css } from 'lit';

export class ClampTemplateForm extends LitElement {
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
        .cost-column {
            padding-right: 1.5rem;
            margin-right: 1.5rem;
            border-right: 1px solid #eee;
        }
        .cost-column:last-child {
            border-right: none;
            margin-right: 0;
            padding-right: 0.75rem;
        }
    `;

    static properties = {
        editingTemplate: { type: Object },
        _formData: { state: true }
    };

    constructor() {
        super();
        this.editingTemplate = null;
        this._formData = this.getInitialFormData();
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('editingTemplate')) {
            if (this.editingTemplate) {
                this._formData = {
                    nome: this.editingTemplate.nome,
                    custo_mat_grapa: this.editingTemplate.costs.material.grapa,
                    custo_mat_borboleta: this.editingTemplate.costs.material.borboleta,
                    custo_mat_arruela: this.editingTemplate.costs.material.arruela,
                    custo_mat_porca: this.editingTemplate.costs.material.porca,
                    custo_mat_parafuso: this.editingTemplate.costs.material.parafuso,
                    custo_mo_grapa: this.editingTemplate.costs.maoDeObra.grapa,
                    custo_mo_borboleta: this.editingTemplate.costs.maoDeObra.borboleta,
                    custo_galv_grapa: this.editingTemplate.costs.galvanizacao.grapa,
                    custo_galv_borboleta: this.editingTemplate.costs.galvanizacao.borboleta,
                    pesoUnitario: this.editingTemplate.pesoUnitario,
                    createdAt: this.editingTemplate.createdAt
                };
            } else {
                this._formData = this.getInitialFormData();
            }
        }
    }

    getInitialFormData() {
        return {
            nome: '',
            custo_mat_grapa: 0, custo_mat_borboleta: 0, custo_mat_arruela: 0,
            custo_mat_porca: 0, custo_mat_parafuso: 0,
            custo_mo_grapa: 0, custo_mo_borboleta: 0,
            custo_galv_grapa: 0, custo_galv_borboleta: 0,
            pesoUnitario: 0,
        };
    }

    _handleInput(field, e) {
        this._formData = { ...this._formData, [field]: e.target.value };
    }

    _handleSubmit(event) {
        event.preventDefault();
        const form = this.shadowRoot.querySelector('form');
        if (form.checkValidity()) {
            this.dispatchEvent(new CustomEvent('save-template', {
                detail: {
                    formData: { ...this._formData },
                    templateType: 'clamp'
                },
                bubbles: true,
                composed: true
            }));
        } else {
            form.reportValidity();
        }
    }

    _handleClear() {
        this._formData = this.getInitialFormData();
        this.dispatchEvent(new CustomEvent('clear-form', { bubbles: true, composed: true }));
    }

    render() {
        const formData = this._formData || this.getInitialFormData();
        const isEditing = !!this.editingTemplate;

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <form @submit=${this._handleSubmit}>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-pencil-alt mr-2"></i>Dados Principais</h6>
                    <div class="field">
                        <label class="label">Nome do Modelo de Grampo *</label>
                        <div class="control">
                            <input class="input is-medium" type="text" placeholder="Ex: Grampo Tipo 2" required maxlength="50"
                                    .value=${formData.nome || ''} @input=${(e) => this._handleInput('nome', e)}>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-coins mr-2"></i>Detalhamento de Custos (R$)</h6>
                    <div class="columns">
                        <div class="column cost-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Matéria Prima</h6>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Grapa</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mat_grapa} @input=${(e) => this._handleInput('custo_mat_grapa', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Borboleta</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mat_borboleta} @input=${(e) => this._handleInput('custo_mat_borboleta', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Arruela</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mat_arruela} @input=${(e) => this._handleInput('custo_mat_arruela', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Porca</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mat_porca} @input=${(e) => this._handleInput('custo_mat_porca', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Parafuso</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mat_parafuso} @input=${(e) => this._handleInput('custo_mat_parafuso', e)}>
                                </div></div></div>
                            </div>
                        </div>
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Mão de Obra</h6>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Grapa</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mo_grapa} @input=${(e) => this._handleInput('custo_mo_grapa', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Borboleta</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_mo_borboleta} @input=${(e) => this._handleInput('custo_mo_borboleta', e)}>
                                </div></div></div>
                            </div>

                            <h6 class="subtitle is-6 mt-4 has-text-grey-dark">Galvanização</h6>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Grapa</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_galv_grapa} @input=${(e) => this._handleInput('custo_galv_grapa', e)}>
                                </div></div></div>
                            </div>
                            <div class="field is-horizontal">
                                <div class="field-label is-normal"><label class="label">Borboleta</label></div>
                                <div class="field-body"><div class="field"><div class="control">
                                    <input class="input" type="number" step="any" min="0" required .value=${formData.custo_galv_borboleta} @input=${(e) => this._handleInput('custo_galv_borboleta', e)}>
                                </div></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-weight-hanging mr-2"></i>Dados Finais</h6>
                    <div class="field">
                        <label class="label">Peso Unitário Final (kg) *</label>
                        <div class="control">
                            <input class="input" type="number" step="0.001" min="0.001" required placeholder="Ex: 0.380"
                                    .value=${formData.pesoUnitario} @input=${(e) => this._handleInput('pesoUnitario', e)}>
                        </div>
                    </div>
                </div>

                <div class="field is-grouped mt-5">
                    <div class="control">
                        <button type="submit" class="button is-primary is-medium">
                            ${isEditing
                                    ? html`<span class="icon"><i class="fas fa-save"></i></span><span>Atualizar Modelo</span>`
                                    : html`<span class="icon"><i class="fas fa-save"></i></span><span>Salvar Modelo</span>`
                            }
                        </button>
                    </div>
                    <div class="control">
                        <button type="button" @click=${this._handleClear} class="button is-light is-medium">
                            <span>${isEditing ? 'Cancelar Edição' : 'Limpar'}</span>
                        </button>
                    </div>
                </div>
            </form>
        `;
    }
}

customElements.define('clamp-template-form', ClampTemplateForm);