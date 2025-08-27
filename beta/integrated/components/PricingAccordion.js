const voti_35_0x2a6e5d=voti_35_0x2aab;(function(_0x16e5a5,_0xf09f5b){const _0x397057=voti_35_0x2aab,_0x4a492a=_0x16e5a5();while(!![]){try{const _0x59d36a=parseInt(_0x397057(0x1c9))/0x1+-parseInt(_0x397057(0x1c5))/0x2+parseInt(_0x397057(0x1b2))/0x3*(parseInt(_0x397057(0x1cf))/0x4)+parseInt(_0x397057(0x1ca))/0x5+-parseInt(_0x397057(0x19d))/0x6*(parseInt(_0x397057(0x1cd))/0x7)+parseInt(_0x397057(0x1ba))/0x8+parseInt(_0x397057(0x1a6))/0x9;if(_0x59d36a===_0xf09f5b)break;else _0x4a492a['push'](_0x4a492a['shift']());}catch(_0x4c95ed){_0x4a492a['push'](_0x4a492a['shift']());}}}(voti_35_0x8b9f,0x657b3));function voti_35_0x8b9f(){const _0x198089=['bulk-copy','Não\x20configurado','nextElementSibling','isConfigured','2109321ATptSF','_handleBulkCopy','not-configured','pricePerM2','querySelector','Sem\x20itens','calculated','currentTarget','map','_getTemplateStatusIcon','calculate-all','formatCurrency','34896VvwDZY','define','<i\x20class=\x22fas\x20fa-minus-circle\x20has-text-grey\x22></i>','<i\x20class=\x22fas\x20fa-cog\x20has-text-info\x22></i>','/m²','length','status','expanded','3137632KoqmvR','hasItems','templatesWithStatus','configured','styles','rotated','ufDestino','Calculado','toggle','status-info','status-warning','942914aErmfN','no-items','_getTemplateStatusText','<i\x20class=\x22fas\x20fa-exclamation-triangle\x20has-text-warning\x22></i>','138686XrFYVw','979435VEqUDT','<i\x20class=\x22fas\x20fa-check-circle\x20has-text-success\x22></i>','_getTemplateStatusClass','165809ROufoq','pricing-accordion','56AyMDbi','filter','_handleCalculateAll','60Welqou','_togglePanel','dispatchEvent','nome','classList'];voti_35_0x8b9f=function(){return _0x198089;};return voti_35_0x8b9f();}function voti_35_0x2aab(_0x2fd130,_0x4689e8){const _0x8b9f68=voti_35_0x8b9f();return voti_35_0x2aab=function(_0x2aab2b,_0x53cd57){_0x2aab2b=_0x2aab2b-0x19d;let _0x1b8d7e=_0x8b9f68[_0x2aab2b];return _0x1b8d7e;},voti_35_0x2aab(_0x2fd130,_0x4689e8);}import{LitElement,html,css}from'lit';import'./PricingTemplatePanel.js';import{FormattingService}from'../../core/services/FormattingService.js';export class PricingAccordion extends LitElement{static [voti_35_0x2a6e5d(0x1be)]=css`
        :host { display: block; }
        .template-pricing-card { border: 2px solid #dbdbdb; border-radius: 6px; margin-bottom: 1rem; background: white; overflow: hidden; transition: all .2s ease; }
        .template-pricing-card:hover { box-shadow: 0 4px 8px rgba(0,0,0,.15); transform: translateY(-2px); }
        .template-pricing-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; cursor: pointer; transition: background-color .2s ease; background: #f8f9fa; }
        .template-pricing-header:hover { background: #e9ecef; }
        .template-pricing-header.status-no-items { border-left: 4px solid #6c757d; }
        .template-pricing-header.status-warning { border-left: 4px solid #ffdd57; }
        .template-pricing-header.status-info { border-left: 4px solid #3298dc; }
        .template-pricing-header.status-success { border-left: 4px solid #48c774; }
        .template-pricing-title { font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem; }
        .template-pricing-status { display: flex; align-items: center; gap: 1rem; font-size: 0.875rem; font-weight: 600; }
        .expand-icon { transition: transform .3s; }
        .expand-icon.rotated { transform: rotate(180deg); }
        .template-pricing-content { display: none; }
        .template-pricing-content.expanded { display: block; }
    `;static ['properties']={'templatesWithStatus':{'type':Array}};constructor(){super(),this['templatesWithStatus']=[];}['_getTemplateStatusClass'](_0xe7ca){const _0x57c575=voti_35_0x2a6e5d,_0xc3bb3f={'no-items':'status-no-items','not-configured':_0x57c575(0x1c4),'configured':_0x57c575(0x1c3),'calculated':'status-success'};return _0xc3bb3f[_0xe7ca]||'';}[voti_35_0x2a6e5d(0x1af)](_0x519ff6){const _0x329d15=voti_35_0x2a6e5d,_0x125871={'no-items':_0x329d15(0x1b4),'not-configured':_0x329d15(0x1c8),'configured':_0x329d15(0x1b5),'calculated':_0x329d15(0x1cb)};return _0x125871[_0x519ff6]||'';}[voti_35_0x2a6e5d(0x1c7)](_0x30738c){const _0x4f92bb=voti_35_0x2a6e5d;switch(_0x30738c[_0x4f92bb(0x1b8)]){case _0x4f92bb(0x1ac):return _0x30738c[_0x4f92bb(0x1a9)]?FormattingService[_0x4f92bb(0x1b1)](_0x30738c[_0x4f92bb(0x1a9)])+_0x4f92bb(0x1b6):_0x4f92bb(0x1c1);case _0x4f92bb(0x1bd):return'Pronto\x20para\x20calcular';case _0x4f92bb(0x1a8):return _0x4f92bb(0x1a3);case _0x4f92bb(0x1c6):return _0x4f92bb(0x1ab);default:return'Não\x20calculado';}}[voti_35_0x2a6e5d(0x19e)](_0xffb5e5){const _0x3c4812=voti_35_0x2a6e5d,_0x657d3=_0xffb5e5[_0x3c4812(0x1ad)],_0x5412e9=_0x657d3[_0x3c4812(0x1a4)],_0x2467e5=_0x657d3[_0x3c4812(0x1aa)]('.expand-icon');_0x5412e9[_0x3c4812(0x1a1)][_0x3c4812(0x1c2)](_0x3c4812(0x1b9)),_0x2467e5[_0x3c4812(0x1a1)][_0x3c4812(0x1c2)](_0x3c4812(0x1bf));}[voti_35_0x2a6e5d(0x1a7)](){const _0x922bd5=voti_35_0x2a6e5d;this[_0x922bd5(0x19f)](new CustomEvent(_0x922bd5(0x1a2),{'bubbles':!![],'composed':!![]}));}[voti_35_0x2a6e5d(0x1d1)](){const _0x5b0b19=voti_35_0x2a6e5d;this[_0x5b0b19(0x19f)](new CustomEvent(_0x5b0b19(0x1b0),{'bubbles':!![],'composed':!![]}));}['render'](){const _0x3ec9e1=voti_35_0x2a6e5d,_0x435913=this['templatesWithStatus'][_0x3ec9e1(0x1d0)](_0x34dc66=>_0x34dc66[_0x3ec9e1(0x1bb)])[_0x3ec9e1(0x1b7)],_0x599191=this[_0x3ec9e1(0x1bc)][_0x3ec9e1(0x1d0)](_0x4ee09f=>_0x4ee09f[_0x3ec9e1(0x1a5)]&&_0x4ee09f['hasItems']);return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <h3 class="subtitle is-4">Configuração de Pricing por Modelo</h3>
                <div class="pricing-toolbar" style="margin-bottom: 1.5rem;">
                    <div class="field is-grouped">
                        <div class="control">
                            <div class="select">
                                <select id="bulk-template-source">
                                    <option value="">Copiar de...</option>
                                    ${_0x599191[_0x3ec9e1(0x1ae)](_0x4def8a=>html`<option value="${_0x4def8a['id']}">${_0x4def8a[_0x3ec9e1(0x1a0)]}</option>`)}
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button class="button is-info" @click=${this[_0x3ec9e1(0x1a7)]}><i class="fas fa-copy"></i>&nbsp;Copiar para Não Configurados</button>
                        </div>
                        <div class="control">
                            <button class="button is-primary" ?disabled=${_0x435913===0x0} @click=${this[_0x3ec9e1(0x1d1)]}><i class="fas fa-calculator"></i>&nbsp;Calcular Todos</button>
                        </div>
                    </div>
                </div>
                ${this[_0x3ec9e1(0x1bc)]['length']>0x0?this[_0x3ec9e1(0x1bc)][_0x3ec9e1(0x1ae)](_0xf5a8e6=>html`
                        <div class="template-pricing-card">
                            <div class="template-pricing-header ${this[_0x3ec9e1(0x1cc)](_0xf5a8e6[_0x3ec9e1(0x1b8)])}" @click=${this['_togglePanel']}>
                                <div class="template-pricing-title" .innerHTML=${this['_getTemplateStatusIcon'](_0xf5a8e6['status'])+'\x20'+_0xf5a8e6[_0x3ec9e1(0x1a0)]}></div>
                                <div class="template-pricing-status">
                                    ${this[_0x3ec9e1(0x1c7)](_0xf5a8e6)}
                                    <i class="fas fa-chevron-down expand-icon"></i>
                                </div>
                            </div>
                            <div class="template-pricing-content">
                                <pricing-template-panel .template=${_0xf5a8e6} .masterUfDestino=${_0xf5a8e6[_0x3ec9e1(0x1c0)]||''} data-template-id-for-query=${_0xf5a8e6['id']}></pricing-template-panel>
                            </div>
                        </div>
                    `):html`<p class="has-text-grey">Crie modelos e adicione itens ao orçamento para configurar o pricing.</p>`}
            </div>
        `;}}customElements[voti_35_0x2a6e5d(0x1b3)](voti_35_0x2a6e5d(0x1ce),PricingAccordion);