import { LitElement, html, css } from 'lit';

export class BudgetItemForm extends LitElement {
    static styles = css`
        :host { display: block; }
        .form-section { padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .help.is-danger { display: block; }
        .is-disabled { background-color: #f5f5f5 !important; cursor: not-allowed; border-color: #dbdbdb !important; }
        .is-disabled-label { color: #7a7a7a !important; }
        .description-field { display: flex; align-items: center; gap: 1rem; }
        .description-field .control.is-expanded { flex-grow: 1; }
    `;

    static properties = {
        templates: { type: Array },
        budgetItems: { type: Array },
        editingItem: { type: Object },
        isEditing: { type: Boolean },
        _formData: { state: true },
        _selectedTemplateType: { state: true },
    };

    constructor() {
        super();
        this.templates = [];
        this.budgetItems = [];
        this.editingItem = null;
        this.isEditing = false;
        this._formData = this.getInitialFormData();
        this._selectedTemplateType = 'grade';
    }

    getInitialFormData() {
        return {
            templateId: '', quantidade: '1', largura: '', comprimento: '',
            descricao: '', imprimirDescricao: false, referenciaTecnica: ''
        };
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('editingItem')) {
            if (this.editingItem) {
                this.isEditing = true;
                this._formData = {
                    templateId: this.editingItem.templateId,
                    quantidade: this.editingItem.quantidade,
                    largura: this.editingItem.largura,
                    comprimento: this.editingItem.comprimento,
                    descricao: this.editingItem.descricao,
                    imprimirDescricao: this.editingItem.imprimirDescricao || false,
                    referenciaTecnica: this.editingItem.referenciaTecnica || '',
                };
                const selectedTemplate = this.templates.find(t => t.id === this.editingItem.templateId);
                this._selectedTemplateType = selectedTemplate?.templateType || 'grade';
            } else {
                this.isEditing = false;
                this._formData = this.getInitialFormData();
                this._selectedTemplateType = 'grade';
            }
        }
    }

    _handleInput(field, e) { this._formData = { ...this._formData, [field]: e.target.value }; }
    _handleCheckbox(field, e) { this._formData = { ...this._formData, [field]: e.target.checked }; }

    _handleTemplateChange(e) {
        const templateId = e.target.value;
        const selectedTemplate = this.templates.find(t => t.id === templateId);
        this._selectedTemplateType = selectedTemplate ? selectedTemplate.templateType : 'grade';
        const updatedFormData = { ...this._formData, templateId: templateId };
        if (this._selectedTemplateType === 'clamp') {
            updatedFormData.largura = '';
            updatedFormData.comprimento = '';
        }
        this._formData = updatedFormData;
    }

    _handleSubmit(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('save-item', {
            detail: this._formData,
            bubbles: true, composed: true
        }));
    }

    _handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel-edit', { bubbles: true, composed: true }));
    }

    _handleClearBudget() {
        this.dispatchEvent(new CustomEvent('clear-budget', { bubbles: true, composed: true }));
    }

    render() {
        const usedDegrauTemplates = new Set(
            this.budgetItems
            .map(item => this.templates.find(t => t.id === item.templateId))
            .filter(template => template?.isDegrau)
            .map(template => template.id)
        );
        const isClamp = this._selectedTemplateType === 'clamp';

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box form-section">
                <div class="level">
                    <div class="level-left"><h3 class="subtitle is-4">Adicionar Item ao Orçamento</h3></div>
                    <div class="level-right">
                        <button class="button is-small is-link" @click=${() => this.shadowRoot.getElementById('import-items-input-internal').click()}>
                            <i class="fas fa-upload mr-2"></i>Importar itens
                        </button>
                        <input type="file" id="import-items-input-internal" style="display:none" accept=".csv" @change=${(e) => this.dispatchEvent(new CustomEvent('import-items', { detail: { file: e.target.files[0] }, bubbles: true, composed: true }))}>
                    </div>
                </div>
                <form id="item-form" @submit=${this._handleSubmit}>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Modelo *</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select id="select-template" required .value=${this._formData.templateId} @change=${this._handleTemplateChange}>
                                            <option value="">Selecione um modelo</option>
                                            ${this.templates.map(template => {
                                                let label = template.templateType === 'clamp' ? ' [GRAMPO]' : (template.isDegrau ? ' (DEGRAU)' : '');
                                                const isUsed = template.isDegrau && usedDegrauTemplates.has(template.id);
                                                const isUsedLabel = isUsed ? " [JÁ USADO]" : "";
                                                const isDisabled = isUsed && !this.isEditing;
                                                return html`<option value="${template.id}" ?disabled=${isDisabled}>${template.nome}${label}${isUsedLabel}</option>`;
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Quantidade *</label>
                                <div class="control">
                                    <input id="item-quantidade" class="input" type="number" min="1" max="9999" step="1" required .value=${this._formData.quantidade} @input=${(e) => this._handleInput('quantidade', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label ${isClamp ? 'is-disabled-label' : ''}">Largura (mm) ${!isClamp ? '*' : '(N/A)'}</label>
                                <div class="control">
                                    <input id="item-largura" class="input ${isClamp ? 'is-disabled' : ''}" type="number" min="50" max="6000" step="1" ?required=${!isClamp} ?disabled=${isClamp} .value=${this._formData.largura} @input=${(e) => this._handleInput('largura', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label ${isClamp ? 'is-disabled-label' : ''}">Comprimento (mm) ${!isClamp ? '*' : '(N/A)'}</label>
                                <div class="control">
                                    <input id="item-comprimento" class="input ${isClamp ? 'is-disabled' : ''}" type="number" min="50" max="6000" step="1" ?required=${!isClamp} ?disabled=${isClamp} .value=${this._formData.comprimento} @input=${(e) => this._handleInput('comprimento', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Descrição (Complementar)</label>
                        <div class="description-field">
                            <div class="control is-expanded">
                                <input id="item-descricao" class="input" type="text" placeholder="Ex: Grades para área externa" maxlength="100" .value=${this._formData.descricao} @input=${(e) => this._handleInput('descricao', e)}>
                            </div>
                            <div class="control">
                                <label class="checkbox" title="Marque para incluir esta descrição complementar no PDF">
                                    <input id="item-imprimir-descricao" type="checkbox" .checked=${this._formData.imprimirDescricao} @change=${(e) => this._handleCheckbox('imprimirDescricao', e)}> Imprimir no PDF
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Referência Técnica / Desenho</label>
                        <div class="control">
                            <input id="item-referencia-tecnica" class="input" type="text" placeholder="Ex: Desenho #123-A, Ref: XYZ" maxlength="100" .value=${this._formData.referenciaTecnica} @input=${(e) => this._handleInput('referenciaTecnica', e)}>
                        </div>
                        <p class="help">Esta informação será sempre incluída na descrição do item no PDF.</p>
                    </div>
                    <div class="field is-grouped mt-5">
                        <div class="control">
                            <button type="submit" class="button ${this.isEditing ? 'is-warning' : 'is-success'} is-medium">
                                ${this.isEditing
                                        ? html`<span class="icon"><i class="fas fa-save"></i></span><span>Atualizar Item</span>`
                                        : html`<span class="icon"><i class="fas fa-plus"></i></span><span>Adicionar Item</span>`
                                }
                            </button>
                        </div>
                        ${this.isEditing ? html`
                            <div class="control">
                                <button type="button" @click=${this._handleCancel} class="button is-light is-medium">
                                    <span class="icon"><i class="fas fa-times"></i></span><span>Cancelar</span>
                                </button>
                            </div>
                        ` : html`
                            <div class="control">
                                <button type="button" @click=${this._handleClearBudget} class="button is-danger is-light is-medium">
                                    <span>Limpar Orçamento</span>
                                </button>
                            </div>
                        `}
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define('budget-item-form', BudgetItemForm);