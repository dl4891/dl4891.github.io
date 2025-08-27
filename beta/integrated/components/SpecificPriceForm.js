import { LitElement, html, css } from 'lit';

export class SpecificPriceForm extends LitElement {
    static styles = css`
        :host { display: block; }
        .help.is-danger { display: block; }
    `;

    static properties = {
        type: { type: String },
        priceData: { type: Object },
        isEditing: { type: Boolean },
        _formData: { state: true },
        _errors: { state: true }
    };

    constructor() {
        super();
        this.type = 'chata';
        this.priceData = {};
        this.isEditing = false;
        this._formData = {};
        this._errors = {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.resetForm();
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('priceData') || changedProperties.has('type')) {
            this.resetForm();
        }
    }

    resetForm() {
        this._formData = {
            espessura: this.priceData?.espessura || '',
            largura: this.priceData?.largura || '',
            diametro: this.priceData?.diametro || '',
            preco: this.priceData?.preco || ''
        };
        this._errors = {};
    }

    _handleInput(field, e) {
        this._formData = { ...this._formData, [field]: e.target.value };
    }

    _validate() {
        this._errors = {};
        const data = this._formData;
        const required = (val) => val !== null && val !== '' && !isNaN(parseFloat(val)) && parseFloat(val) > 0;

        if (this.type === 'chata' || this.type.includes('chapa')) {
            if (!required(data.espessura)) this._errors.espessura = "Campo obrigatório";
            if (!required(data.largura)) this._errors.largura = "Campo obrigatório";
        }
        if (this.type === 'redonda') {
            if (!required(data.diametro)) this._errors.diametro = "Campo obrigatório";
        }
        if (!required(data.preco)) this._errors.preco = "Campo obrigatório";

        this.requestUpdate();
        return Object.keys(this._errors).length === 0;
    }

    _onSave(event) {
        event.preventDefault();
        if (this._validate()) {
            this.dispatchEvent(new CustomEvent('save-price', {
                detail: {
                    type: this.type,
                    data: this._formData
                },
                bubbles: true,
                composed: true
            }));
        }
    }

    _onCancel() {
        this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <form @submit=${this._onSave}>
                ${this.type === 'chata' || this.type.includes('chapa') ? html`
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Espessura (mm) *</label>
                                <div class="control">
                                    <input class="input ${this._errors.espessura ? 'is-danger' : ''}" type="number" step="0.01" min="0.1" max="50" required
                                            .value=${this._formData.espessura} @input=${(e) => this._handleInput('espessura', e)}>
                                </div>
                                ${this._errors.espessura ? html`<p class="help is-danger">${this._errors.espessura}</p>` : ''}
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Largura (mm) *</label>
                                <div class="control">
                                    <input class="input ${this._errors.largura ? 'is-danger' : ''}" type="number" step="0.01" min="1" max="200" required
                                            .value=${this._formData.largura} @input=${(e) => this._handleInput('largura', e)}>
                                </div>
                                ${this._errors.largura ? html`<p class="help is-danger">${this._errors.largura}</p>` : ''}
                            </div>
                        </div>
                    </div>
                ` : ''}

                ${this.type === 'redonda' ? html`
                    <div class="field">
                        <label class="label">Diâmetro (mm) *</label>
                        <div class="control">
                            <input class="input ${this._errors.diametro ? 'is-danger' : ''}" type="number" step="0.01" min="0.1" max="50" required
                                    .value=${this._formData.diametro} @input=${(e) => this._handleInput('diametro', e)}>
                        </div>
                        ${this._errors.diametro ? html`<p class="help is-danger">${this._errors.diametro}</p>` : ''}
                    </div>
                ` : ''}

                <div class="field">
                    <label class="label">Preço Material (R$/kg) *</label>
                    <div class="control">
                        <input class="input ${this._errors.preco ? 'is-danger' : ''}" type="number" step="any" min="0" required
                                .value=${this._formData.preco} @input=${(e) => this._handleInput('preco', e)}>
                    </div>
                    ${this.type.includes('chapa') ? html`<p class="help">Preço apenas do material. O serviço será adicionado automaticamente.</p>` : ''}
                    ${this._errors.preco ? html`<p class="help is-danger">${this._errors.preco}</p>` : ''}
                </div>

                <input type="submit" style="display: none;">
            </form>
        `;
    }
}

customElements.define('specific-price-form', SpecificPriceForm);