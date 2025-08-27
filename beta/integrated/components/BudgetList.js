const voti_26_0x5d3f18=voti_26_0x16cb;(function(_0x38face,_0x36045d){const _0x138b0f=voti_26_0x16cb,_0x51348b=_0x38face();while(!![]){try{const _0x1f6aa7=parseInt(_0x138b0f(0x17c))/0x1+parseInt(_0x138b0f(0x180))/0x2*(-parseInt(_0x138b0f(0x182))/0x3)+parseInt(_0x138b0f(0x177))/0x4+parseInt(_0x138b0f(0x188))/0x5*(-parseInt(_0x138b0f(0x187))/0x6)+-parseInt(_0x138b0f(0x183))/0x7*(parseInt(_0x138b0f(0x17a))/0x8)+-parseInt(_0x138b0f(0x18a))/0x9*(-parseInt(_0x138b0f(0x17b))/0xa)+parseInt(_0x138b0f(0x17f))/0xb*(parseInt(_0x138b0f(0x17d))/0xc);if(_0x1f6aa7===_0x36045d)break;else _0x51348b['push'](_0x51348b['shift']());}catch(_0x40ce6a){_0x51348b['push'](_0x51348b['shift']());}}}(voti_26_0x5095,0xbf871));function voti_26_0x16cb(_0x2fd23c,_0xf4bfa5){const _0x509574=voti_26_0x5095();return voti_26_0x16cb=function(_0x16cbd6,_0x2887aa){_0x16cbd6=_0x16cbd6-0x177;let _0x21b551=_0x509574[_0x16cbd6];return _0x21b551;},voti_26_0x16cb(_0x2fd23c,_0xf4bfa5);}function voti_26_0x5095(){const _0x3d3929=['6592fCKPUI','9170NVmqqc','1467378BFFgYU','12JyQugA','editingItemId','13756611IGOddS','2980556HBmbos','costs','3beQmUq','13069JgTgFO','render','define','itemsWithCalculations','218424CNauvr','140KLQwdC','item','9783bkIrGE','budget-list','4470948VBZbhY','styles','properties'];voti_26_0x5095=function(){return _0x3d3929;};return voti_26_0x5095();}import{LitElement,html,css}from'lit';import{LitVirtualizer}from'@lit-labs/virtualizer';import'./BudgetItem.js';export class BudgetList extends LitElement{static [voti_26_0x5d3f18(0x178)]=css`
        :host { display: block; }
        lit-virtualizer { height: 100%; }
        .has-text-grey { color: #7a7a7a; }
    `;static [voti_26_0x5d3f18(0x179)]={'itemsWithCalculations':{'type':Array},'editingItemId':{'type':String}};constructor(){const _0x28230f=voti_26_0x5d3f18;super(),this[_0x28230f(0x186)]=[],this[_0x28230f(0x17e)]=null;}[voti_26_0x5d3f18(0x184)](){const _0x20a495=voti_26_0x5d3f18;if(this[_0x20a495(0x186)]['length']===0x0)return html`<p class="has-text-grey">Nenhum item adicionado ainda.</p>`;const _0x144569=_0x335f6d=>html`
            <budget-item
                .item=${_0x335f6d[_0x20a495(0x189)]}
                .template=${_0x335f6d['template']}
                .costs=${_0x335f6d[_0x20a495(0x181)]}
                .isEditing=${_0x335f6d['item']['id']===this[_0x20a495(0x17e)]}
                data-id=${_0x335f6d[_0x20a495(0x189)]['id']}>
            </budget-item>
        `;return html`
            <lit-virtualizer
                .items=${this[_0x20a495(0x186)]}
                .renderItem=${_0x144569}
                .keyFunction=${_0x5adef8=>_0x5adef8[_0x20a495(0x189)]['id']}
            ></lit-virtualizer>
        `;}}customElements[voti_26_0x5d3f18(0x185)](voti_26_0x5d3f18(0x18b),BudgetList);