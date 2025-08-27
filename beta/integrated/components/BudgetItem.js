const voti_24_0x142291=voti_24_0x49ae;(function(_0xa7ee7f,_0xfcf908){const _0x2fb4ae=voti_24_0x49ae,_0x1b1fd2=_0xa7ee7f();while(!![]){try{const _0x4afecc=-parseInt(_0x2fb4ae(0x155))/0x1*(parseInt(_0x2fb4ae(0x132))/0x2)+-parseInt(_0x2fb4ae(0x14a))/0x3+parseInt(_0x2fb4ae(0x126))/0x4+-parseInt(_0x2fb4ae(0x12e))/0x5*(parseInt(_0x2fb4ae(0x156))/0x6)+parseInt(_0x2fb4ae(0x121))/0x7*(-parseInt(_0x2fb4ae(0x130))/0x8)+parseInt(_0x2fb4ae(0x14c))/0x9+-parseInt(_0x2fb4ae(0x14d))/0xa*(parseInt(_0x2fb4ae(0x138))/0xb);if(_0x4afecc===_0xfcf908)break;else _0x1b1fd2['push'](_0x1b1fd2['shift']());}catch(_0x56c3ab){_0x1b1fd2['push'](_0x1b1fd2['shift']());}}}(voti_24_0x2648,0xd72ba));import{LitElement,html,css}from'lit';function voti_24_0x49ae(_0x7e5467,_0x2a1e64){const _0x26484c=voti_24_0x2648();return voti_24_0x49ae=function(_0x49aeb9,_0x56f163){_0x49aeb9=_0x49aeb9-0x120;let _0x10f80f=_0x26484c[_0x49aeb9];return _0x10f80f;},voti_24_0x49ae(_0x7e5467,_0x2a1e64);}import{FormattingService}from'../../../core/services/FormattingService.js';export class BudgetItem extends LitElement{static [voti_24_0x142291(0x120)]=css`
        :host {
            display: block;
            width: 100%; /* Garante que o custom element ocupe a largura total */
        }
        .orcamento-item {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 1rem;
            margin-bottom: 1rem;
            transition: var(--transition);
            width: 100%; /* Reforça a largura total do container interno */
            box-sizing: border-box;
        }
        .orcamento-item:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow);
            transform: translateY(-2px);
        }
        .orcamento-item.editing {
            border-color: var(--warning-color);
            background: var(--bg-editing);
            box-shadow: 0 0 0 3px rgba(255, 221, 87, .2);
        }
        .item-order-number {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--primary-color);
            cursor: pointer;
            padding: 2px 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        .item-order-number:hover {
            background-color: #f0f7ff;
        }
        .order-input {
            width: 45px;
            height: 28px;
            font-size: 1rem;
            font-weight: 700;
            text-align: center;
            border: 1px solid var(--primary-color);
            border-radius: 4px;
        }
        .orcamento-actions {
            display: flex;
            gap: .5rem;
            margin-left: auto; /* Alinha os botões à direita */
        }
        /* Estilo para as tags */
        .tag {
            margin-left: 0.5rem;
            vertical-align: middle;
        }
    `;static [voti_24_0x142291(0x13f)]={'item':{'type':Object},'template':{'type':Object},'costs':{'type':Object},'isEditing':{'type':Boolean},'isEditingOrder':{'state':!![]}};constructor(){const _0x4a9cd1=voti_24_0x142291;super(),this[_0x4a9cd1(0x122)]={},this[_0x4a9cd1(0x136)]={},this[_0x4a9cd1(0x127)]={},this[_0x4a9cd1(0x158)]=![],this[_0x4a9cd1(0x12b)]=![];}['_onEdit'](_0xcbc414){const _0x281bb7=voti_24_0x142291;_0xcbc414[_0x281bb7(0x129)](),this[_0x281bb7(0x137)](new CustomEvent(_0x281bb7(0x14e),{'detail':{'itemId':this['item']['id']},'bubbles':!![],'composed':!![]}));}['_onRemove'](_0x3be9f9){const _0x2dccd1=voti_24_0x142291;_0x3be9f9[_0x2dccd1(0x129)](),this[_0x2dccd1(0x137)](new CustomEvent(_0x2dccd1(0x135),{'detail':{'itemId':this['item']['id']},'bubbles':!![],'composed':!![]}));}[voti_24_0x142291(0x13c)](){const _0x1b2a3a=voti_24_0x142291;this[_0x1b2a3a(0x12b)]=!![],this[_0x1b2a3a(0x14f)][_0x1b2a3a(0x12d)](()=>{const _0x3c185c=_0x1b2a3a,_0x5d2118=this['shadowRoot'][_0x3c185c(0x148)]('.order-input');_0x5d2118?.['focus'](),_0x5d2118?.[_0x3c185c(0x131)]();});}['_commitOrderChange'](_0x39f30d){const _0x4ef7da=voti_24_0x142291,_0x4dda8c=parseInt(_0x39f30d[_0x4ef7da(0x123)],0xa),_0x394e21=(this[_0x4ef7da(0x122)][_0x4ef7da(0x151)]??0x0)+0x1;!isNaN(_0x4dda8c)&&_0x4dda8c!==_0x394e21&&this[_0x4ef7da(0x137)](new CustomEvent(_0x4ef7da(0x139),{'detail':{'itemId':this['item']['id'],'newPosition':_0x4dda8c},'bubbles':!![],'composed':!![]})),this[_0x4ef7da(0x12b)]=![];}['_cancelOrderEdit'](){const _0x25feaa=voti_24_0x142291;this[_0x25feaa(0x12b)]=![];}[voti_24_0x142291(0x12a)](_0x919ee2){const _0x152438=voti_24_0x142291;(_0x919ee2[_0x152438(0x13e)]===_0x152438(0x147)||_0x919ee2[_0x152438(0x13e)]==='Tab')&&(_0x919ee2[_0x152438(0x153)](),this[_0x152438(0x133)](_0x919ee2[_0x152438(0x157)])),_0x919ee2[_0x152438(0x13e)]===_0x152438(0x154)&&(_0x919ee2[_0x152438(0x153)](),this[_0x152438(0x14b)]());}[voti_24_0x142291(0x124)](){const _0x156e1c=voti_24_0x142291;if(!this[_0x156e1c(0x122)]['id']||!this[_0x156e1c(0x136)]['id'])return html``;const _0xe143a2=FormattingService[_0x156e1c(0x13d)](this[_0x156e1c(0x122)],this['template']);let _0x1317aa='';if(this[_0x156e1c(0x136)][_0x156e1c(0x128)]===_0x156e1c(0x13b))_0x1317aa=html`<span class="tag is-info is-small">GRAMPO</span>`;else!this[_0x156e1c(0x136)][_0x156e1c(0x144)]&&(_0x1317aa=html`<span class="tag is-primary is-light is-small">GRADE</span>`);const _0x58917b=this['template'][_0x156e1c(0x144)]?html`<span class="tag is-warning is-small">DEGRAU</span>`:'',_0x253970=this[_0x156e1c(0x136)][_0x156e1c(0x150)]===_0x156e1c(0x143)?html`<span class="tag is-info is-light is-small" title="Peso calculado por medida bruta">TEÓRICO</span>`:'',_0x3bfb46=this[_0x156e1c(0x136)]['superficie']===_0x156e1c(0x152)?html`<span class="tag is-dark is-small">SERRILHADA</span>`:'',_0x232a49=(this[_0x156e1c(0x122)][_0x156e1c(0x151)]??0x0)+0x1,_0x43f270=this[_0x156e1c(0x12b)]?html`<input
                        type="number"
                        class="order-input"
                        .value=${_0x232a49}
                        @blur=${_0x29747f=>this[_0x156e1c(0x133)](_0x29747f['target'])}
                        @keydown=${this[_0x156e1c(0x12a)]}
                >`:html`<span class="item-order-number" title="Clique para mover o item" @click=${this['_handleOrderClick']}>
                    ${_0x232a49}.
                   </span>`;return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="orcamento-item fade-in ${this[_0x156e1c(0x158)]?'editing':''}" data-id="${this[_0x156e1c(0x122)]['id']}">
                <div class="item-display-container">
                    <div class="item-display-control-column">
                        ${_0x43f270}
                    </div>
                    <div class="item-display-content">
                        <div class="is-flex is-justify-content-space-between is-align-items-flex-start">
                            <div>
                                <div class="item-display-title">
                                    ${_0xe143a2[_0x156e1c(0x145)]} ${_0x1317aa} ${_0x58917b} ${_0x3bfb46}
                                </div>
                                <div class="item-display-details">
                                    ${_0xe143a2[_0x156e1c(0x12f)]}
                                </div>
                                <div class="item-display-results mt-2">
                                    <strong>Área:</strong> ${FormattingService[_0x156e1c(0x134)](this[_0x156e1c(0x127)]['area'])}m² |
                                    <strong>Peso:</strong> ${FormattingService[_0x156e1c(0x134)](this[_0x156e1c(0x127)][_0x156e1c(0x146)])}kg |
                                    <strong>Peso c/ margem:</strong> ${FormattingService[_0x156e1c(0x134)](this[_0x156e1c(0x127)][_0x156e1c(0x140)])}kg ${_0x253970} |
                                    <strong>Custo total:</strong> ${FormattingService[_0x156e1c(0x13a)](this[_0x156e1c(0x127)]['custoTotal'])} |
                                    <strong>Custo/unidade:</strong> ${FormattingService[_0x156e1c(0x13a)](this[_0x156e1c(0x127)][_0x156e1c(0x12c)])}
                                </div>
                            </div>
                            <div class="orcamento-actions">
                                <button class="button is-small is-info" @click=${this[_0x156e1c(0x149)]} title="Editar">
                                    <span class="icon"><i class="fas fa-edit"></i></span>
                                </button>
                                <button class="button is-small is-danger" @click=${this[_0x156e1c(0x141)]} title="Remover">
                                    <span class="icon"><i class="fas fa-trash"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;}}function voti_24_0x2648(){const _0x4ad37c=['move-item','formatCurrency','clamp','_handleOrderClick','getItemDisplayData','key','properties','pesoComMargem','_onRemove','budget-item','teorico','isDegrau','title','peso','Enter','querySelector','_onEdit','1454973Fcfsik','_cancelOrderEdit','14410098UgiuKE','1398210VWPHTZ','edit-item','updateComplete','pesoCalcMode','order','serrilhada','preventDefault','Escape','1JBdtdm','6XQmBck','target','isEditing','styles','1665335avZcWs','item','value','render','define','6340640pcySIh','costs','templateType','stopPropagation','_handleOrderKeyDown','isEditingOrder','custoUnitario','then','108165jIvAIe','detailsLine','32OgWtdG','select','854474QKetQX','_commitOrderChange','formatNumber','remove-item','template','dispatchEvent','33VXiYCb'];voti_24_0x2648=function(){return _0x4ad37c;};return voti_24_0x2648();}customElements[voti_24_0x142291(0x125)](voti_24_0x142291(0x142),BudgetItem);