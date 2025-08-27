const voti_40_0xf049be=voti_40_0xda6a;(function(_0x2c5dbd,_0x1975ec){const _0x3fc4d2=voti_40_0xda6a,_0x5d00e9=_0x2c5dbd();while(!![]){try{const _0x2a1030=-parseInt(_0x3fc4d2(0x91))/0x1+-parseInt(_0x3fc4d2(0x97))/0x2+-parseInt(_0x3fc4d2(0x98))/0x3+-parseInt(_0x3fc4d2(0x96))/0x4+parseInt(_0x3fc4d2(0x8f))/0x5*(parseInt(_0x3fc4d2(0x8d))/0x6)+-parseInt(_0x3fc4d2(0x94))/0x7+-parseInt(_0x3fc4d2(0x8b))/0x8*(-parseInt(_0x3fc4d2(0x95))/0x9);if(_0x2a1030===_0x1975ec)break;else _0x5d00e9['push'](_0x5d00e9['shift']());}catch(_0x5e73ea){_0x5d00e9['push'](_0x5d00e9['shift']());}}}(voti_40_0x3be3,0x6e698));function voti_40_0xda6a(_0x27d005,_0x4cf38f){const _0x3be32e=voti_40_0x3be3();return voti_40_0xda6a=function(_0xda6aad,_0x199b19){_0xda6aad=_0xda6aad-0x88;let _0x3f6fef=_0x3be32e[_0xda6aad];return _0x3f6fef;},voti_40_0xda6a(_0x27d005,_0x4cf38f);}import{LitElement,html,css}from'lit';function voti_40_0x3be3(){const _0x8782f7=['21145WTWoOj','define','497ZZfxZT','chapa_xadrez','entries','182238TGCJNI','9XjyehV','873772Jdyndi','1627144sHLiPu','1745718vuYyhe','styles','chata','specific-prices-panel','_handleAddPrice','specificPrices','map','globalPrices','10178192XJfZRS','render','1164NqfXOA','chapa_lateral'];voti_40_0x3be3=function(){return _0x8782f7;};return voti_40_0x3be3();}import'./SpecificPriceItem.js';export class SpecificPricesPanel extends LitElement{static [voti_40_0xf049be(0x99)]=css`
        :host { display: block; }
        .form-section { padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        #lista-precos-especificos { margin-bottom: 1rem; }
    `;static ['properties']={'specificPrices':{'type':Object},'globalPrices':{'type':Object}};constructor(){const _0x1d1e08=voti_40_0xf049be;super(),this['specificPrices']={},this[_0x1d1e08(0x8a)]={};}['_handleAddPrice'](_0x5c6ce2){this['dispatchEvent'](new CustomEvent('add-specific-price',{'detail':{'type':_0x5c6ce2},'bubbles':!![],'composed':!![]}));}[voti_40_0xf049be(0x8c)](){const _0x26eabc=voti_40_0xf049be,_0x3f7068=Object[_0x26eabc(0x93)](this[_0x26eabc(0x88)])['sort'](([_0x2f0e36],[_0x43a472])=>_0x2f0e36['localeCompare'](_0x43a472));return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="box form-section">
                <h3 class="subtitle is-5"><i class="fas fa-tags mr-2"></i>Preços Específicos por Material</h3>
                <div id="lista-precos-especificos">
                    ${_0x3f7068['length']>0x0?_0x3f7068[_0x26eabc(0x89)](([_0x5549d0,_0x5e7305])=>html`
                            <specific-price-item .priceKey=${_0x5549d0} .priceValue=${_0x5e7305} .globalPrices=${this['globalPrices']}></specific-price-item>
                        `):html`<p class="has-text-grey is-size-7 has-text-centered">Nenhum preço específico cadastrado.</p>`}
                </div>
                <hr>
                <div class="field is-grouped">
                    <div class="control"><button type="button" @click=${()=>this[_0x26eabc(0x9c)](_0x26eabc(0x9a))} class="button is-small is-info"><span class="icon"><i class="fas fa-plus"></i></span><span>Chata</span></button></div>
                    <div class="control"><button type="button" @click=${()=>this[_0x26eabc(0x9c)]('redonda')} class="button is-small is-info"><span class="icon"><i class="fas fa-plus"></i></span><span>Redonda</span></button></div>
                    <div class="control"><button type="button" @click=${()=>this[_0x26eabc(0x9c)](_0x26eabc(0x8e))} class="button is-small is-warning"><span class="icon"><i class="fas fa-plus"></i></span><span>Ch. Lateral</span></button></div>
                    <div class="control"><button type="button" @click=${()=>this['_handleAddPrice'](_0x26eabc(0x92))} class="button is-small is-warning"><span class="icon"><i class="fas fa-plus"></i></span><span>Ch. Xadrez</span></button></div>
                </div>
            </div>
        `;}}customElements[voti_40_0xf049be(0x90)](voti_40_0xf049be(0x9b),SpecificPricesPanel);