import { LitElement, html, css } from 'lit';
import './SpecificPriceItem.js';

export class SpecificPricesPanel extends LitElement {
    static styles = css`
        :host { display: block; }
        .form-section { padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        #lista-precos-especificos { margin-bottom: 1rem; }
    `;

    static properties = {
        specificPrices: { type: Object },
        globalPrices: { type: Object },
    };

    constructor() {
        super();
        this.specificPrices = {};
        this.globalPrices = {};
    }

    _handleAddPrice(type) {
        this.dispatchEvent(new CustomEvent('add-specific-price', {
            detail: { type },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const sortedPrices = Object.entries(this.specificPrices).sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="box form-section">
                <h3 class="subtitle is-5"><i class="fas fa-tags mr-2"></i>Preços Específicos por Material</h3>
                <div id="lista-precos-especificos">
                    ${sortedPrices.length > 0
            ? sortedPrices.map(([key, value]) => html`
                            <specific-price-item .priceKey=${key} .priceValue=${value} .globalPrices=${this.globalPrices}></specific-price-item>
                        `)
            : html`<p class="has-text-grey is-size-7 has-text-centered">Nenhum preço específico cadastrado.</p>`
        }
                </div>
                <hr>
                <div class="field is-grouped">
                    <div class="control"><button type="button" @click=${() => this._handleAddPrice('chata')} class="button is-small is-info"><span class="icon"><i class="fas fa-plus"></i></span><span>Chata</span></button></div>
                    <div class="control"><button type="button" @click=${() => this._handleAddPrice('redonda')} class="button is-small is-info"><span class="icon"><i class="fas fa-plus"></i></span><span>Redonda</span></button></div>
                    <div class="control"><button type="button" @click=${() => this._handleAddPrice('chapa_lateral')} class="button is-small is-warning"><span class="icon"><i class="fas fa-plus"></i></span><span>Ch. Lateral</span></button></div>
                    <div class="control"><button type="button" @click=${() => this._handleAddPrice('chapa_xadrez')} class="button is-small is-warning"><span class="icon"><i class="fas fa-plus"></i></span><span>Ch. Xadrez</span></button></div>
                </div>
            </div>
        `;
    }
}

customElements.define('specific-prices-panel', SpecificPricesPanel);