function voti_25_0x3973(_0x268864,_0x5d7e6b){const _0x12a24a=voti_25_0x12a2();return voti_25_0x3973=function(_0x3973a3,_0xa21787){_0x3973a3=_0x3973a3-0x170;let _0x2f539d=_0x12a24a[_0x3973a3];return _0x2f539d;},voti_25_0x3973(_0x268864,_0x5d7e6b);}const voti_25_0x3ef1f7=voti_25_0x3973;(function(_0x119ea9,_0x6a83d1){const _0x3cf7a9=voti_25_0x3973,_0x2cf8b9=_0x119ea9();while(!![]){try{const _0x58abc8=-parseInt(_0x3cf7a9(0x185))/0x1*(parseInt(_0x3cf7a9(0x17f))/0x2)+parseInt(_0x3cf7a9(0x196))/0x3*(-parseInt(_0x3cf7a9(0x1ae))/0x4)+-parseInt(_0x3cf7a9(0x193))/0x5+-parseInt(_0x3cf7a9(0x1a4))/0x6*(-parseInt(_0x3cf7a9(0x1a3))/0x7)+parseInt(_0x3cf7a9(0x181))/0x8*(-parseInt(_0x3cf7a9(0x173))/0x9)+-parseInt(_0x3cf7a9(0x18c))/0xa+-parseInt(_0x3cf7a9(0x17a))/0xb*(-parseInt(_0x3cf7a9(0x186))/0xc);if(_0x58abc8===_0x6a83d1)break;else _0x2cf8b9['push'](_0x2cf8b9['shift']());}catch(_0x4afa49){_0x2cf8b9['push'](_0x2cf8b9['shift']());}}}(voti_25_0x12a2,0x77858));import{LitElement,html,css}from'lit';export class BudgetItemForm extends LitElement{static [voti_25_0x3ef1f7(0x19a)]=css`
        :host { display: block; }
        .form-section { padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .help.is-danger { display: block; }
        .is-disabled { background-color: #f5f5f5 !important; cursor: not-allowed; border-color: #dbdbdb !important; }
        .is-disabled-label { color: #7a7a7a !important; }
        .description-field { display: flex; align-items: center; gap: 1rem; }
        .description-field .control.is-expanded { flex-grow: 1; }
    `;static [voti_25_0x3ef1f7(0x188)]={'templates':{'type':Array},'budgetItems':{'type':Array},'editingItem':{'type':Object},'isEditing':{'type':Boolean},'_formData':{'state':!![]},'_selectedTemplateType':{'state':!![]}};constructor(){const _0xc13839=voti_25_0x3ef1f7;super(),this['templates']=[],this[_0xc13839(0x171)]=[],this['editingItem']=null,this[_0xc13839(0x199)]=![],this[_0xc13839(0x17e)]=this[_0xc13839(0x1a2)](),this[_0xc13839(0x179)]='grade';}[voti_25_0x3ef1f7(0x1a2)](){return{'templateId':'','quantidade':'1','largura':'','comprimento':'','descricao':'','imprimirDescricao':![],'referenciaTecnica':''};}[voti_25_0x3ef1f7(0x1ac)](_0x4eeed6){const _0x3df49d=voti_25_0x3ef1f7;if(_0x4eeed6[_0x3df49d(0x198)](_0x3df49d(0x19f))){if(this['editingItem']){this[_0x3df49d(0x199)]=!![],this[_0x3df49d(0x17e)]={'templateId':this[_0x3df49d(0x19f)]['templateId'],'quantidade':this[_0x3df49d(0x19f)][_0x3df49d(0x1a1)],'largura':this[_0x3df49d(0x19f)][_0x3df49d(0x189)],'comprimento':this[_0x3df49d(0x19f)]['comprimento'],'descricao':this['editingItem'][_0x3df49d(0x1b0)],'imprimirDescricao':this[_0x3df49d(0x19f)][_0x3df49d(0x17d)]||![],'referenciaTecnica':this[_0x3df49d(0x19f)][_0x3df49d(0x195)]||''};const _0x3e8c7e=this[_0x3df49d(0x1a5)][_0x3df49d(0x1a0)](_0x2256bc=>_0x2256bc['id']===this['editingItem'][_0x3df49d(0x172)]);this['_selectedTemplateType']=_0x3e8c7e?.[_0x3df49d(0x18e)]||'grade';}else this['isEditing']=![],this[_0x3df49d(0x17e)]=this[_0x3df49d(0x1a2)](),this['_selectedTemplateType']='grade';}}[voti_25_0x3ef1f7(0x1a9)](_0x24a59f,_0x223e77){const _0x2829a0=voti_25_0x3ef1f7;this['_formData']={...this[_0x2829a0(0x17e)],[_0x24a59f]:_0x223e77[_0x2829a0(0x187)][_0x2829a0(0x1af)]};}['_handleCheckbox'](_0x51c5b4,_0xf9d438){const _0x3b02e4=voti_25_0x3ef1f7;this[_0x3b02e4(0x17e)]={...this['_formData'],[_0x51c5b4]:_0xf9d438['target'][_0x3b02e4(0x18d)]};}[voti_25_0x3ef1f7(0x19e)](_0x10af35){const _0xb910f0=voti_25_0x3ef1f7,_0x555952=_0x10af35[_0xb910f0(0x187)]['value'],_0x3683cb=this[_0xb910f0(0x1a5)][_0xb910f0(0x1a0)](_0x14e088=>_0x14e088['id']===_0x555952);this[_0xb910f0(0x179)]=_0x3683cb?_0x3683cb[_0xb910f0(0x18e)]:_0xb910f0(0x180);const _0x514367={...this[_0xb910f0(0x17e)],'templateId':_0x555952};this[_0xb910f0(0x179)]==='clamp'&&(_0x514367['largura']='',_0x514367[_0xb910f0(0x1a6)]=''),this[_0xb910f0(0x17e)]=_0x514367;}[voti_25_0x3ef1f7(0x19b)](_0x372742){const _0x3fb3a0=voti_25_0x3ef1f7;_0x372742[_0x3fb3a0(0x1aa)](),this[_0x3fb3a0(0x18b)](new CustomEvent(_0x3fb3a0(0x182),{'detail':this['_formData'],'bubbles':!![],'composed':!![]}));}[voti_25_0x3ef1f7(0x17b)](){const _0x37e8e2=voti_25_0x3ef1f7;this['dispatchEvent'](new CustomEvent(_0x37e8e2(0x18a),{'bubbles':!![],'composed':!![]}));}[voti_25_0x3ef1f7(0x17c)](){const _0x56f5ab=voti_25_0x3ef1f7;this[_0x56f5ab(0x18b)](new CustomEvent(_0x56f5ab(0x1ab),{'bubbles':!![],'composed':!![]}));}[voti_25_0x3ef1f7(0x192)](){const _0x252cfe=voti_25_0x3ef1f7,_0x94f41c=new Set(this[_0x252cfe(0x171)][_0x252cfe(0x178)](_0x25e239=>this[_0x252cfe(0x1a5)][_0x252cfe(0x1a0)](_0x12b4fe=>_0x12b4fe['id']===_0x25e239[_0x252cfe(0x172)]))['filter'](_0x17ace3=>_0x17ace3?.[_0x252cfe(0x176)])['map'](_0x47f5b2=>_0x47f5b2['id'])),_0x5bd377=this['_selectedTemplateType']==='clamp';return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box form-section">
                <div class="level">
                    <div class="level-left"><h3 class="subtitle is-4">Adicionar Item ao Orçamento</h3></div>
                    <div class="level-right">
                        <button class="button is-small is-link" @click=${()=>this['shadowRoot'][_0x252cfe(0x175)]('import-items-input-internal')[_0x252cfe(0x190)]()}>
                            <i class="fas fa-upload mr-2"></i>Importar itens
                        </button>
                        <input type="file" id="import-items-input-internal" style="display:none" accept=".csv" @change=${_0x3c86a7=>this[_0x252cfe(0x18b)](new CustomEvent(_0x252cfe(0x1a8),{'detail':{'file':_0x3c86a7[_0x252cfe(0x187)][_0x252cfe(0x184)][0x0]},'bubbles':!![],'composed':!![]}))}>
                    </div>
                </div>
                <form id="item-form" @submit=${this[_0x252cfe(0x19b)]}>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Modelo *</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select id="select-template" required .value=${this[_0x252cfe(0x17e)][_0x252cfe(0x172)]} @change=${this['_handleTemplateChange']}>
                                            <option value="">Selecione um modelo</option>
                                            ${this[_0x252cfe(0x1a5)][_0x252cfe(0x178)](_0x3f1839=>{const _0x510df2=_0x252cfe;let _0x3f93f2=_0x3f1839[_0x510df2(0x18e)]===_0x510df2(0x19d)?_0x510df2(0x183):_0x3f1839[_0x510df2(0x176)]?_0x510df2(0x177):'';const _0x5d6798=_0x3f1839[_0x510df2(0x176)]&&_0x94f41c[_0x510df2(0x198)](_0x3f1839['id']),_0x4f6026=_0x5d6798?_0x510df2(0x18f):'',_0x2556fe=_0x5d6798&&!this['isEditing'];return html`<option value="${_0x3f1839['id']}" ?disabled=${_0x2556fe}>${_0x3f1839[_0x510df2(0x170)]}${_0x3f93f2}${_0x4f6026}</option>`;})}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Quantidade *</label>
                                <div class="control">
                                    <input id="item-quantidade" class="input" type="number" min="1" max="9999" step="1" required .value=${this[_0x252cfe(0x17e)]['quantidade']} @input=${_0x531b72=>this[_0x252cfe(0x1a9)](_0x252cfe(0x1a1),_0x531b72)}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label ${_0x5bd377?_0x252cfe(0x191):''}">Largura (mm) ${!_0x5bd377?'*':_0x252cfe(0x194)}</label>
                                <div class="control">
                                    <input id="item-largura" class="input ${_0x5bd377?_0x252cfe(0x1b1):''}" type="number" min="50" max="6000" step="1" ?required=${!_0x5bd377} ?disabled=${_0x5bd377} .value=${this[_0x252cfe(0x17e)][_0x252cfe(0x189)]} @input=${_0x424f55=>this[_0x252cfe(0x1a9)]('largura',_0x424f55)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label ${_0x5bd377?_0x252cfe(0x191):''}">Comprimento (mm) ${!_0x5bd377?'*':_0x252cfe(0x194)}</label>
                                <div class="control">
                                    <input id="item-comprimento" class="input ${_0x5bd377?_0x252cfe(0x1b1):''}" type="number" min="50" max="6000" step="1" ?required=${!_0x5bd377} ?disabled=${_0x5bd377} .value=${this['_formData'][_0x252cfe(0x1a6)]} @input=${_0x45885c=>this[_0x252cfe(0x1a9)](_0x252cfe(0x1a6),_0x45885c)}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Descrição (Complementar)</label>
                        <div class="description-field">
                            <div class="control is-expanded">
                                <input id="item-descricao" class="input" type="text" placeholder="Ex: Grades para área externa" maxlength="100" .value=${this['_formData'][_0x252cfe(0x1b0)]} @input=${_0x4ef5b1=>this[_0x252cfe(0x1a9)](_0x252cfe(0x1b0),_0x4ef5b1)}>
                            </div>
                            <div class="control">
                                <label class="checkbox" title="Marque para incluir esta descrição complementar no PDF">
                                    <input id="item-imprimir-descricao" type="checkbox" .checked=${this['_formData'][_0x252cfe(0x17d)]} @change=${_0x1303dd=>this[_0x252cfe(0x197)]('imprimirDescricao',_0x1303dd)}> Imprimir no PDF
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Referência Técnica / Desenho</label>
                        <div class="control">
                            <input id="item-referencia-tecnica" class="input" type="text" placeholder="Ex: Desenho #123-A, Ref: XYZ" maxlength="100" .value=${this[_0x252cfe(0x17e)][_0x252cfe(0x195)]} @input=${_0x27c337=>this[_0x252cfe(0x1a9)](_0x252cfe(0x195),_0x27c337)}>
                        </div>
                        <p class="help">Esta informação será sempre incluída na descrição do item no PDF.</p>
                    </div>
                    <div class="field is-grouped mt-5">
                        <div class="control">
                            <button type="submit" class="button ${this['isEditing']?_0x252cfe(0x1a7):_0x252cfe(0x19c)} is-medium">
                                ${this[_0x252cfe(0x199)]?html`<span class="icon"><i class="fas fa-save"></i></span><span>Atualizar Item</span>`:html`<span class="icon"><i class="fas fa-plus"></i></span><span>Adicionar Item</span>`}
                            </button>
                        </div>
                        ${this['isEditing']?html`
                            <div class="control">
                                <button type="button" @click=${this[_0x252cfe(0x17b)]} class="button is-light is-medium">
                                    <span class="icon"><i class="fas fa-times"></i></span><span>Cancelar</span>
                                </button>
                            </div>
                        `:html`
                            <div class="control">
                                <button type="button" @click=${this[_0x252cfe(0x17c)]} class="button is-danger is-light is-medium">
                                    <span>Limpar Orçamento</span>
                                </button>
                            </div>
                        `}
                    </div>
                </form>
            </div>
        `;}}function voti_25_0x12a2(){const _0x465e95=['2960880qzxqjS','(N/A)','referenciaTecnica','299946WfVQAN','_handleCheckbox','has','isEditing','styles','_handleSubmit','is-success','clamp','_handleTemplateChange','editingItem','find','quantidade','getInitialFormData','7SLVRbS','44592NNhLvq','templates','comprimento','is-warning','import-items','_handleInput','preventDefault','clear-budget','willUpdate','define','32TucmWE','value','descricao','is-disabled','nome','budgetItems','templateId','3741246eezXvY','budget-item-form','getElementById','isDegrau','\x20(DEGRAU)','map','_selectedTemplateType','55RcAABH','_handleCancel','_handleClearBudget','imprimirDescricao','_formData','15454EmdOMY','grade','8MPKVCg','save-item','\x20[GRAMPO]','files','38BSAQrK','7060392mAVqox','target','properties','largura','cancel-edit','dispatchEvent','3583500yGmeSk','checked','templateType','\x20[JÁ\x20USADO]','click','is-disabled-label','render'];voti_25_0x12a2=function(){return _0x465e95;};return voti_25_0x12a2();}customElements[voti_25_0x3ef1f7(0x1ad)](voti_25_0x3ef1f7(0x174),BudgetItemForm);