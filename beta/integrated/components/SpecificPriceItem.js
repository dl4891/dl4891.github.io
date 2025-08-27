const voti_39_0x3ba4a5=voti_39_0x34aa;function voti_39_0x34aa(_0x5e0298,_0x19c06c){const _0x414e0e=voti_39_0x414e();return voti_39_0x34aa=function(_0x34aa3b,_0x150777){_0x34aa3b=_0x34aa3b-0x151;let _0x106df3=_0x414e0e[_0x34aa3b];return _0x106df3;},voti_39_0x34aa(_0x5e0298,_0x19c06c);}(function(_0x5d7b85,_0x41582d){const _0xc0d783=voti_39_0x34aa,_0x2bb803=_0x5d7b85();while(!![]){try{const _0x37b525=-parseInt(_0xc0d783(0x15b))/0x1*(-parseInt(_0xc0d783(0x159))/0x2)+parseInt(_0xc0d783(0x176))/0x3+-parseInt(_0xc0d783(0x179))/0x4*(parseInt(_0xc0d783(0x160))/0x5)+-parseInt(_0xc0d783(0x155))/0x6+-parseInt(_0xc0d783(0x168))/0x7+parseInt(_0xc0d783(0x178))/0x8+parseInt(_0xc0d783(0x151))/0x9*(parseInt(_0xc0d783(0x17f))/0xa);if(_0x37b525===_0x41582d)break;else _0x2bb803['push'](_0x2bb803['shift']());}catch(_0x4b89dc){_0x2bb803['push'](_0x2bb803['shift']());}}}(voti_39_0x414e,0xb78e5));import{LitElement,html,css}from'lit';function voti_39_0x414e(){const _0xaec24c=['styles','specific-price-item','chapa_lateral','_onEdit','is-warning','15413850kuvmQc','9tPBWIK','corteDobraChpaXadrez','priceValue','startsWith','7328820YVHiiq','priceData','replace','render','888714qaEbRE','priceKey','1ZcmDNG','is-info','tipo','REDONDA','globalPrices','53725JYUntx','chata','chapa_xadrez','_onRemove','redonda','CH.XADREZ','join','define','5208119GbEAmt','formatCurrency','dimensoes','edit-specific-price','chapa_lateral_','CHATA','split','stopPropagation','properties','redonda_','slice','corteChpaLateral','chapa_xadrez_','\x20+\x20','1882227zdZnhF','chata_','3842048crlxaE','140HwrzWZ'];voti_39_0x414e=function(){return _0xaec24c;};return voti_39_0x414e();}import{FormattingService}from'../../../core/services/FormattingService.js';export class SpecificPriceItem extends LitElement{static [voti_39_0x3ba4a5(0x17a)]=css`
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
    `;static [voti_39_0x3ba4a5(0x170)]={'priceKey':{'type':String},'priceValue':{'type':Number},'globalPrices':{'type':Object}};constructor(){const _0xe8ffca=voti_39_0x3ba4a5;super(),this[_0xe8ffca(0x15a)]='',this[_0xe8ffca(0x153)]=0x0,this[_0xe8ffca(0x15f)]={};}[voti_39_0x3ba4a5(0x17d)](_0x3c4ae7){const _0x5178f0=voti_39_0x3ba4a5;_0x3c4ae7[_0x5178f0(0x16f)](),this['dispatchEvent'](new CustomEvent(_0x5178f0(0x16b),{'detail':{'tipo':this[_0x5178f0(0x156)][_0x5178f0(0x15d)],'dimensao':this[_0x5178f0(0x156)]['dimensoes'],'preco':this[_0x5178f0(0x153)]},'bubbles':!![],'composed':!![]}));}[voti_39_0x3ba4a5(0x163)](_0xe85cef){const _0x24e380=voti_39_0x3ba4a5;_0xe85cef[_0x24e380(0x16f)](),this['dispatchEvent'](new CustomEvent('remove-specific-price',{'detail':{'tipo':this['priceData']['tipo'],'dimensao':this['priceData'][_0x24e380(0x16a)]},'bubbles':!![],'composed':!![]}));}get[voti_39_0x3ba4a5(0x156)](){const _0xadd0e=voti_39_0x3ba4a5;let _0x11c8ec,_0x1f4766,_0x18f218,_0x56b05b,_0x45bd4b;if(this[_0xadd0e(0x15a)][_0xadd0e(0x154)](_0xadd0e(0x16c))){_0x11c8ec=_0xadd0e(0x17c),_0x1f4766=this[_0xadd0e(0x15a)]['replace'](_0xadd0e(0x16c),''),_0x18f218='CH.LATERAL',_0x56b05b=_0xadd0e(0x17e);const _0x235d4d=this['globalPrices'][_0xadd0e(0x173)]||0x0;_0x45bd4b=FormattingService['formatCurrency'](this[_0xadd0e(0x153)])+_0xadd0e(0x175)+FormattingService[_0xadd0e(0x169)](_0x235d4d)+'\x20=\x20'+FormattingService[_0xadd0e(0x169)](this[_0xadd0e(0x153)]+_0x235d4d);}else{if(this['priceKey'][_0xadd0e(0x154)](_0xadd0e(0x174))){_0x11c8ec=_0xadd0e(0x162),_0x1f4766=this[_0xadd0e(0x15a)][_0xadd0e(0x157)](_0xadd0e(0x174),''),_0x18f218=_0xadd0e(0x165),_0x56b05b=_0xadd0e(0x17e);const _0x36d461=this[_0xadd0e(0x15f)][_0xadd0e(0x152)]||0x0;_0x45bd4b=FormattingService['formatCurrency'](this[_0xadd0e(0x153)])+_0xadd0e(0x175)+FormattingService[_0xadd0e(0x169)](_0x36d461)+'\x20=\x20'+FormattingService[_0xadd0e(0x169)](this[_0xadd0e(0x153)]+_0x36d461);}else{if(this['priceKey'][_0xadd0e(0x154)](_0xadd0e(0x177)))_0x11c8ec=_0xadd0e(0x161),_0x1f4766=this[_0xadd0e(0x15a)]['replace'](_0xadd0e(0x177),''),_0x18f218=_0xadd0e(0x16d),_0x56b05b='is-info',_0x45bd4b=FormattingService['formatCurrency'](this[_0xadd0e(0x153)]);else{if(this[_0xadd0e(0x15a)][_0xadd0e(0x154)](_0xadd0e(0x171)))_0x11c8ec=_0xadd0e(0x164),_0x1f4766=this[_0xadd0e(0x15a)]['replace'](_0xadd0e(0x171),''),_0x18f218=_0xadd0e(0x15e),_0x56b05b=_0xadd0e(0x15c),_0x45bd4b=FormattingService[_0xadd0e(0x169)](this['priceValue']);else{const _0x4f1b98=this[_0xadd0e(0x15a)][_0xadd0e(0x16e)]('_');_0x11c8ec=_0x4f1b98[0x0],_0x1f4766=_0x4f1b98[_0xadd0e(0x172)](0x1)[_0xadd0e(0x166)]('_'),_0x18f218=_0x11c8ec['toUpperCase'](),_0x56b05b=_0xadd0e(0x15c),_0x45bd4b=FormattingService[_0xadd0e(0x169)](this['priceValue']);}}}}return{'tipo':_0x11c8ec,'dimensoes':_0x1f4766,'tag':_0x18f218,'cor':_0x56b05b,'precoFinal':_0x45bd4b};}[voti_39_0x3ba4a5(0x158)](){const _0x13f911=voti_39_0x3ba4a5;if(!this[_0x13f911(0x15a)])return html``;const {tag:_0x38d050,cor:_0x54c96f,dimensoes:_0x531aef,precoFinal:_0x3528a2}=this[_0x13f911(0x156)];return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="preco-especifico-item">
                <div class="preco-especifico-info">
                    <div>
                        <span class="preco-especifico-tipo ${_0x54c96f}">${_0x38d050}</span>
                        <span class="preco-especifico-titulo">${_0x531aef}</span>
                    </div>
                    <div class="preco-especifico-valor">${_0x3528a2}/kg</div>
                </div>
                <div class="preco-especifico-acoes">
                    <button class="button is-small is-info" @click=${this[_0x13f911(0x17d)]} title="Editar">
                        <span class="icon"><i class="fas fa-edit"></i></span>
                    </button>
                    <button class="button is-small is-danger" @click=${this[_0x13f911(0x163)]} title="Remover">
                        <span class="icon"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </div>
        `;}}customElements[voti_39_0x3ba4a5(0x167)](voti_39_0x3ba4a5(0x17b),SpecificPriceItem);