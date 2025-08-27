import { LitElement, html, css } from 'lit';
import { FormattingService } from '../../../core/services/FormattingService.js';

export class SpecificPriceItem extends LitElement {
    static styles = css`
        :host {
            display: block;
            --info-color: #3298dc;
            --warning-color: #ffdd57;
            --border-color: #dbdbdb;
            --border-width: 1px;
            --border-radius: 6px;
            --bg-white: #ffffff;
            --shadow: 0 2px 4px rgba(0, 0, 0, .1);
            --spacing-sm: .5rem;
            --spacing-xs: .25rem;
            --transition: all .2s ease;
        }
        .preco-especifico-item {
            background: var(--bg-white);
            border: var(--border-width) solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-sm);
            margin-bottom: var(--spacing-sm);
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: var(--transition);
        }
        .preco-especifico-item:hover {
            border-color: var(--info-color);
            box-shadow: var(--shadow);
        }
        .preco-especifico-info {
            flex-grow: 1;
        }
        .preco-especifico-tipo {
            display: inline-block;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            margin-right: var(--spacing-xs);
        }
        .is-info { background-color: var(--info-color); }
        .is-warning { background-color: var(--warning-color); color: #363636; }
        .preco-especifico-titulo { font-weight: 600; }
        .preco-especifico-valor { font-size: 0.8rem; color: #666; }
        .preco-especifico-acoes { display: flex; gap: 0.25rem; }
    `;

    static properties = {
        priceKey: { type: String },
        priceValue: { type: Number },
        globalPrices: { type: Object }
    };

    constructor() {
        super();
        this.priceKey = '';
        this.priceValue = 0;
        this.globalPrices = {};
    }

    _onEdit(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('edit-specific-price', {
            detail: {
                tipo: this.priceData.tipo,
                dimensao: this.priceData.dimensoes,
                preco: this.priceValue
            },
            bubbles: true,
            composed: true
        }));
    }

    _onRemove(event) {
        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('remove-specific-price', {
            detail: {
                tipo: this.priceData.tipo,
                dimensao: this.priceData.dimensoes
            },
            bubbles: true,
            composed: true
        }));
    }

    get priceData() {
        let tipo, dimensoes, tag, cor, precoFinal;

        if (this.priceKey.startsWith("chapa_lateral_")) {
            tipo = 'chapa_lateral';
            dimensoes = this.priceKey.replace('chapa_lateral_', '');
            tag = 'CH.LATERAL';
            cor = 'is-warning';
            const servico = this.globalPrices.corteChpaLateral || 0;
            precoFinal = `${FormattingService.formatCurrency(this.priceValue)} + ${FormattingService.formatCurrency(servico)} = ${FormattingService.formatCurrency(this.priceValue + servico)}`;
        } else if (this.priceKey.startsWith("chapa_xadrez_")) {
            tipo = 'chapa_xadrez';
            dimensoes = this.priceKey.replace('chapa_xadrez_', '');
            tag = 'CH.XADREZ';
            cor = 'is-warning';
            const servico = this.globalPrices.corteDobraChpaXadrez || 0;
            precoFinal = `${FormattingService.formatCurrency(this.priceValue)} + ${FormattingService.formatCurrency(servico)} = ${FormattingService.formatCurrency(this.priceValue + servico)}`;
        } else if (this.priceKey.startsWith("chata_")) {
            tipo = 'chata';
            dimensoes = this.priceKey.replace('chata_', '');
            tag = 'CHATA';
            cor = 'is-info';
            precoFinal = FormattingService.formatCurrency(this.priceValue);
        } else if (this.priceKey.startsWith("redonda_")) {
            tipo = 'redonda';
            dimensoes = this.priceKey.replace('redonda_', '');
            tag = 'REDONDA';
            cor = 'is-info';
            precoFinal = FormattingService.formatCurrency(this.priceValue);
        } else {
            const parts = this.priceKey.split('_');
            tipo = parts[0];
            dimensoes = parts.slice(1).join('_');
            tag = tipo.toUpperCase();
            cor = 'is-info';
            precoFinal = FormattingService.formatCurrency(this.priceValue);
        }
        return { tipo, dimensoes, tag, cor, precoFinal };
    }

    render() {
        if (!this.priceKey) return html``;
        const { tag, cor, dimensoes, precoFinal } = this.priceData;

        return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="preco-especifico-item">
                <div class="preco-especifico-info">
                    <div>
                        <span class="preco-especifico-tipo ${cor}">${tag}</span>
                        <span class="preco-especifico-titulo">${dimensoes}</span>
                    </div>
                    <div class="preco-especifico-valor">${precoFinal}/kg</div>
                </div>
                <div class="preco-especifico-acoes">
                    <button class="button is-small is-info" @click=${this._onEdit} title="Editar">
                        <span class="icon"><i class="fas fa-edit"></i></span>
                    </button>
                    <button class="button is-small is-danger" @click=${this._onRemove} title="Remover">
                        <span class="icon"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('specific-price-item', SpecificPriceItem);