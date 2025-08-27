const voti_38_0x34ae12=voti_38_0x2722;function voti_38_0x2722(_0x499502,_0x185cad){const _0x2aa128=voti_38_0x2aa1();return voti_38_0x2722=function(_0x27227e,_0x3f57c8){_0x27227e=_0x27227e-0x1ba;let _0x4dae60=_0x2aa128[_0x27227e];return _0x4dae60;},voti_38_0x2722(_0x499502,_0x185cad);}(function(_0x87c3b0,_0x449600){const _0x43bbfd=voti_38_0x2722,_0x546950=_0x87c3b0();while(!![]){try{const _0x491fdd=parseInt(_0x43bbfd(0x1cb))/0x1*(parseInt(_0x43bbfd(0x1cf))/0x2)+parseInt(_0x43bbfd(0x1cc))/0x3*(-parseInt(_0x43bbfd(0x1bb))/0x4)+-parseInt(_0x43bbfd(0x1c6))/0x5*(parseInt(_0x43bbfd(0x1c4))/0x6)+parseInt(_0x43bbfd(0x1d3))/0x7*(parseInt(_0x43bbfd(0x1d0))/0x8)+-parseInt(_0x43bbfd(0x1d1))/0x9*(-parseInt(_0x43bbfd(0x1c1))/0xa)+-parseInt(_0x43bbfd(0x1e2))/0xb*(-parseInt(_0x43bbfd(0x1c2))/0xc)+-parseInt(_0x43bbfd(0x1d8))/0xd*(parseInt(_0x43bbfd(0x1c0))/0xe);if(_0x491fdd===_0x449600)break;else _0x546950['push'](_0x546950['shift']());}catch(_0x5e2417){_0x546950['push'](_0x546950['shift']());}}}(voti_38_0x2aa1,0x4bf9d));import{LitElement,html,css}from'lit';export class SpecificPriceForm extends LitElement{static [voti_38_0x34ae12(0x1ba)]=css`
        :host { display: block; }
        .help.is-danger { display: block; }
    `;static ['properties']={'type':{'type':String},'priceData':{'type':Object},'isEditing':{'type':Boolean},'_formData':{'state':!![]},'_errors':{'state':!![]}};constructor(){const _0x55aec0=voti_38_0x34ae12;super(),this['type']='chata',this[_0x55aec0(0x1e3)]={},this[_0x55aec0(0x1d2)]=![],this[_0x55aec0(0x1be)]={},this[_0x55aec0(0x1da)]={};}[voti_38_0x34ae12(0x1e1)](){const _0x5e8fa4=voti_38_0x34ae12;super[_0x5e8fa4(0x1e1)](),this[_0x5e8fa4(0x1bc)]();}[voti_38_0x34ae12(0x1ca)](_0x4f2da1){const _0xb6a8dd=voti_38_0x34ae12;(_0x4f2da1[_0xb6a8dd(0x1d6)](_0xb6a8dd(0x1e3))||_0x4f2da1['has'](_0xb6a8dd(0x1c5)))&&this['resetForm']();}[voti_38_0x34ae12(0x1bc)](){const _0xdf2300=voti_38_0x34ae12;this['_formData']={'espessura':this[_0xdf2300(0x1e3)]?.[_0xdf2300(0x1dd)]||'','largura':this[_0xdf2300(0x1e3)]?.[_0xdf2300(0x1d7)]||'','diametro':this[_0xdf2300(0x1e3)]?.[_0xdf2300(0x1e0)]||'','preco':this[_0xdf2300(0x1e3)]?.[_0xdf2300(0x1de)]||''},this[_0xdf2300(0x1da)]={};}['_handleInput'](_0x1e58c1,_0x5cf1e6){const _0x3a972b=voti_38_0x34ae12;this[_0x3a972b(0x1be)]={...this[_0x3a972b(0x1be)],[_0x1e58c1]:_0x5cf1e6[_0x3a972b(0x1e4)][_0x3a972b(0x1c3)]};}[voti_38_0x34ae12(0x1db)](){const _0x496a42=voti_38_0x34ae12;this['_errors']={};const _0x46b053=this[_0x496a42(0x1be)],_0x5ac12c=_0x32c156=>_0x32c156!==null&&_0x32c156!==''&&!isNaN(parseFloat(_0x32c156))&&parseFloat(_0x32c156)>0x0;if(this[_0x496a42(0x1c5)]===_0x496a42(0x1d9)||this[_0x496a42(0x1c5)]['includes'](_0x496a42(0x1bf))){if(!_0x5ac12c(_0x46b053[_0x496a42(0x1dd)]))this[_0x496a42(0x1da)][_0x496a42(0x1dd)]=_0x496a42(0x1d4);if(!_0x5ac12c(_0x46b053['largura']))this[_0x496a42(0x1da)]['largura']='Campo\x20obrigatório';}if(this[_0x496a42(0x1c5)]===_0x496a42(0x1c7)){if(!_0x5ac12c(_0x46b053[_0x496a42(0x1e0)]))this['_errors'][_0x496a42(0x1e0)]=_0x496a42(0x1d4);}if(!_0x5ac12c(_0x46b053[_0x496a42(0x1de)]))this[_0x496a42(0x1da)][_0x496a42(0x1de)]=_0x496a42(0x1d4);return this['requestUpdate'](),Object['keys'](this[_0x496a42(0x1da)])['length']===0x0;}['_onSave'](_0x212430){const _0x2a5e95=voti_38_0x34ae12;_0x212430[_0x2a5e95(0x1bd)](),this[_0x2a5e95(0x1db)]()&&this[_0x2a5e95(0x1d5)](new CustomEvent('save-price',{'detail':{'type':this[_0x2a5e95(0x1c5)],'data':this['_formData']},'bubbles':!![],'composed':!![]}));}['_onCancel'](){const _0x7bbaff=voti_38_0x34ae12;this['dispatchEvent'](new CustomEvent(_0x7bbaff(0x1ce),{'bubbles':!![],'composed':!![]}));}['render'](){const _0x536647=voti_38_0x34ae12;return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <form @submit=${this[_0x536647(0x1c8)]}>
                ${this[_0x536647(0x1c5)]===_0x536647(0x1d9)||this[_0x536647(0x1c5)][_0x536647(0x1df)]('chapa')?html`
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Espessura (mm) *</label>
                                <div class="control">
                                    <input class="input ${this[_0x536647(0x1da)][_0x536647(0x1dd)]?'is-danger':''}" type="number" step="0.01" min="0.1" max="50" required
                                            .value=${this['_formData'][_0x536647(0x1dd)]} @input=${_0x33cbcb=>this['_handleInput']('espessura',_0x33cbcb)}>
                                </div>
                                ${this['_errors'][_0x536647(0x1dd)]?html`<p class="help is-danger">${this['_errors']['espessura']}</p>`:''}
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Largura (mm) *</label>
                                <div class="control">
                                    <input class="input ${this[_0x536647(0x1da)][_0x536647(0x1d7)]?_0x536647(0x1c9):''}" type="number" step="0.01" min="1" max="200" required
                                            .value=${this[_0x536647(0x1be)]['largura']} @input=${_0x35e098=>this['_handleInput']('largura',_0x35e098)}>
                                </div>
                                ${this['_errors'][_0x536647(0x1d7)]?html`<p class="help is-danger">${this[_0x536647(0x1da)][_0x536647(0x1d7)]}</p>`:''}
                            </div>
                        </div>
                    </div>
                `:''}

                ${this['type']===_0x536647(0x1c7)?html`
                    <div class="field">
                        <label class="label">Diâmetro (mm) *</label>
                        <div class="control">
                            <input class="input ${this[_0x536647(0x1da)]['diametro']?'is-danger':''}" type="number" step="0.01" min="0.1" max="50" required
                                    .value=${this['_formData']['diametro']} @input=${_0x3127b1=>this[_0x536647(0x1dc)](_0x536647(0x1e0),_0x3127b1)}>
                        </div>
                        ${this[_0x536647(0x1da)][_0x536647(0x1e0)]?html`<p class="help is-danger">${this[_0x536647(0x1da)][_0x536647(0x1e0)]}</p>`:''}
                    </div>
                `:''}

                <div class="field">
                    <label class="label">Preço Material (R$/kg) *</label>
                    <div class="control">
                        <input class="input ${this[_0x536647(0x1da)]['preco']?'is-danger':''}" type="number" step="any" min="0" required
                                .value=${this[_0x536647(0x1be)]['preco']} @input=${_0x4414b8=>this['_handleInput'](_0x536647(0x1de),_0x4414b8)}>
                    </div>
                    ${this[_0x536647(0x1c5)][_0x536647(0x1df)](_0x536647(0x1bf))?html`<p class="help">Preço apenas do material. O serviço será adicionado automaticamente.</p>`:''}
                    ${this['_errors'][_0x536647(0x1de)]?html`<p class="help is-danger">${this['_errors'][_0x536647(0x1de)]}</p>`:''}
                </div>

                <input type="submit" style="display: none;">
            </form>
        `;}}function voti_38_0x2aa1(){const _0x4f6b39=['diametro','connectedCallback','27786YlzcNI','priceData','target','styles','8qYKUOo','resetForm','preventDefault','_formData','chapa','1022YgnQbl','47950YGBbLO','2472FVtFYI','value','120390TKbxEE','type','35CnDUXK','redonda','_onSave','is-danger','willUpdate','61646aNHozW','302115gqzvhQ','specific-price-form','close-modal','16WoefkY','8TvMaEa','324imnVsR','isEditing','4335583zbzeso','Campo\x20obrigatório','dispatchEvent','has','largura','205231sdxqHP','chata','_errors','_validate','_handleInput','espessura','preco','includes'];voti_38_0x2aa1=function(){return _0x4f6b39;};return voti_38_0x2aa1();}customElements['define'](voti_38_0x34ae12(0x1cd),SpecificPriceForm);