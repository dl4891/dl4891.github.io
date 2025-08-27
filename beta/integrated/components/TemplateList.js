import { LitElement, html, css } from 'lit';
import './TemplateItem.js';

export class TemplateList extends LitElement {
    static styles = css`
        :host { display: block; }
        .has-text-grey { color: #7a7a7a; }
    `;

    static properties = {
        templates: { type: Array },
        editingTemplateId: { type: String },
    };

    constructor() {
        super();
        this.templates = [];
        this.editingTemplateId = null;
    }

    _handleImportClick() {
        this.shadowRoot.getElementById('import-templates-input').click();
    }

    _handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.dispatchEvent(new CustomEvent('import-templates-csv', {
                detail: { content: e.target.result },
                bubbles: true,
                composed: true
            }));
        };
        reader.readAsText(file);
        event.target.value = null;
    }

    _handleAddClick() {
        this.dispatchEvent(new CustomEvent('open-template-modal', {
            bubbles: true, composed: true
        }));
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <div class="level">
                    <div class="level-left">
                        <h3 class="subtitle is-5">Modelos de Produtos Salvos</h3>
                    </div>
                    <div class="level-right">
                        <div class="field is-grouped">
                            <p class="control">
                                <button class="button is-primary" @click=${this._handleAddClick}>
                                    <span class="icon"><i class="fas fa-plus"></i></span>
                                    <span>Adicionar Modelo</span>
                                </button>
                            </p>
                            <p class="control">
                                <button class="button is-link" @click=${this._handleImportClick}>
                                    <i class="fas fa-upload mr-2"></i>Importar Modelos
                                </button>
                                <input type="file" id="import-templates-input" style="display:none" accept=".csv" @change=${this._handleFileChange}>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    ${this.templates.length > 0
                            ? this.templates.map(template => html`
                                <template-item
                                        .template=${template}
                                        .isEditing=${this.editingTemplateId === template.id}>
                                </template-item>
                            `)
                            : html`<p class="has-text-grey">Nenhum modelo criado ainda.</p>`
                    }
                </div>
            </div>
        `;
    }
}

customElements.define('template-list', TemplateList);