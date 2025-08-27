import { LitElement, html, css } from 'lit';
import { UF_DATA } from '../../shared/config.js';

export class ProposalForm extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .form-section {
            margin-bottom: 1.5rem;
        }
        .bar-column {
            padding-right: 1.5rem;
            margin-right: 1.5rem;
            border-right: 1px solid #eee;
        }
    `;

    static properties = {
        commercialData: { type: Object },
    };

    constructor() {
        super();
        this.commercialData = {};
    }

    _handleInput(field, event) {
        const value = event.target.value;
        this.dispatchEvent(new CustomEvent('update-commercial-data', {
            detail: { field, value },
            bubbles: true,
            composed: true
        }));
    }

    _handleLogoChange(event) {
        const file = event.target.files[0];
        this.dispatchEvent(new CustomEvent('update-logo', {
            detail: { file },
            bubbles: true,
            composed: true
        }));
        event.target.value = null; // Reset input
    }

    _handleRemoveLogo() {
        this.dispatchEvent(new CustomEvent('update-logo', {
            detail: { file: null },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const data = this.commercialData || {};
        const ufs = Object.keys(UF_DATA);

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <form id="proposta-form">
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-building mr-2"></i>Dados da Empresa (Cabeçalho da Proposta)</h6>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 1 (Nome)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${data.headerLine1 || ''} @input=${(e) => this._handleInput('headerLine1', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 2 (Endereço)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${data.headerLine2 || ''} @input=${(e) => this._handleInput('headerLine2', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 3 (CNPJ, IE, etc)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${data.headerLine3 || ''} @input=${(e) => this._handleInput('headerLine3', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-image mr-2"></i>Logotipo da Empresa (para PDF)</h6>
                    <div class="columns is-vcentered">
                        <div class="column is-two-thirds">
                            <div class="field">
                                <div class="file has-name is-fullwidth">
                                    <label class="file-label">
                                        <input class="file-input" type="file" accept="image/png" @change=${this._handleLogoChange}>
                                        <span class="file-cta">
                                            <span class="file-icon"><i class="fas fa-upload"></i></span>
                                            <span class="file-label">Escolher imagem PNG…</span>
                                        </span>
                                        <span class="file-name">${data.logoBase64 ? 'Logotipo carregado' : 'Nenhuma imagem selecionada.'}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div id="logo-preview-container" style="display: ${data.logoBase64 ? 'block' : 'none'};">
                                <img src="${data.logoBase64 || ''}" alt="Pré-visualização do Logotipo" style="max-height: 60px; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">
                                <button type="button" class="button is-small is-danger is-light ml-2" @click=${this._handleRemoveLogo}>Remover</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-info-circle mr-2"></i>Informações do Orçamento</h6>
                    <div class="columns">
                        <div class="column bar-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Dados do Cliente</h6>
                            <div class="field">
                                <label class="label">Nome/Razão Social *</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: AÇO S/A" required .value=${data.clientName || ''} @input=${(e) => this._handleInput('clientName', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">CNPJ / CPF</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 88.416.482/0001-06" .value=${data.clientIdentifier || ''} @input=${(e) => this._handleInput('clientIdentifier', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">UF de Destino *</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select required .value=${data.ufDestino || ''} @change=${(e) => this._handleInput('ufDestino', e)}>
                                            <option value="">Selecione a UF...</option>
                                            ${ufs.map(uf => html`<option value="${uf}">${uf}</option>`)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Dados do Orçamento</h6>
                            <div class="field">
                                <label class="label">Número do Orçamento *</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 7809" required .value=${data.quoteNumber || ''} @input=${(e) => this._handleInput('quoteNumber', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Válido Até</label>
                                <div class="control">
                                    <input class="input" type="date" .value=${(data.validUntil || '').split('T')[0]} @input=${(e) => this._handleInput('validUntil', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Vendedor</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Nome do vendedor" .value=${data.sellerName || ''} @input=${(e) => this._handleInput('sellerName', e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Contato do Vendedor</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="(12) 3456 7890" .value=${data.sellerContact || ''} @input=${(e) => this._handleInput('sellerContact', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-handshake mr-2"></i>Termos Comerciais</h6>
                    <div class="columns">
                        <div class="column bar-column">
                            <div class="field">
                                <label class="label">Prazo de Entrega</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 15 a 18 dias úteis" .value=${data.deliveryTime || ''} @input=${(e) => this._handleInput('deliveryTime', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column bar-column">
                            <div class="field">
                                <label class="label">Condições de Pagamento</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 07 DDL (sujeito a análise de crédito)" .value=${data.paymentTerms || ''} @input=${(e) => this._handleInput('paymentTerms', e)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Frete</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: FOB (Material a retirar)" .value=${data.shippingInfo || ''} @input=${(e) => this._handleInput('shippingInfo', e)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;
    }
}

customElements.define('proposal-form', ProposalForm);