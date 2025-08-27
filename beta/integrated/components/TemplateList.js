const voti_43_0x5925ab=voti_43_0x382f;(function(_0x4f0209,_0x87948a){const _0xb6f62b=voti_43_0x382f,_0x343aa8=_0x4f0209();while(!![]){try{const _0x805083=parseInt(_0xb6f62b(0x123))/0x1+-parseInt(_0xb6f62b(0x10e))/0x2+parseInt(_0xb6f62b(0x115))/0x3*(parseInt(_0xb6f62b(0x11b))/0x4)+parseInt(_0xb6f62b(0x117))/0x5+-parseInt(_0xb6f62b(0x126))/0x6*(-parseInt(_0xb6f62b(0x112))/0x7)+parseInt(_0xb6f62b(0x125))/0x8+-parseInt(_0xb6f62b(0x129))/0x9;if(_0x805083===_0x87948a)break;else _0x343aa8['push'](_0x343aa8['shift']());}catch(_0x58a133){_0x343aa8['push'](_0x343aa8['shift']());}}}(voti_43_0x1cfe,0x614f3));function voti_43_0x1cfe(){const _0x1df7b8=['_handleAddClick','length','getElementById','click','448972ksdrNd','properties','5098768oELfwO','81984jUjGcW','dispatchEvent','styles','8028774SMbuLp','_handleImportClick','onload','open-template-modal','45572DxLbqp','template-list','import-templates-input','files','21WzyCSZ','editingTemplateId','_handleFileChange','157974RaonXY','templates','667415ICUXxt','result','target','shadowRoot','4zQljDc','map','value','readAsText'];voti_43_0x1cfe=function(){return _0x1df7b8;};return voti_43_0x1cfe();}import{LitElement,html,css}from'lit';function voti_43_0x382f(_0x37d7cd,_0x429c79){const _0x1cfe35=voti_43_0x1cfe();return voti_43_0x382f=function(_0x382f5b,_0x24e6ba){_0x382f5b=_0x382f5b-0x10b;let _0x1a9902=_0x1cfe35[_0x382f5b];return _0x1a9902;},voti_43_0x382f(_0x37d7cd,_0x429c79);}import'./TemplateItem.js';export class TemplateList extends LitElement{static [voti_43_0x5925ab(0x128)]=css`
        :host { display: block; }
        .has-text-grey { color: #7a7a7a; }
    `;static [voti_43_0x5925ab(0x124)]={'templates':{'type':Array},'editingTemplateId':{'type':String}};constructor(){const _0x83d4d7=voti_43_0x5925ab;super(),this[_0x83d4d7(0x116)]=[],this[_0x83d4d7(0x113)]=null;}[voti_43_0x5925ab(0x10b)](){const _0x127e1d=voti_43_0x5925ab;this[_0x127e1d(0x11a)][_0x127e1d(0x121)](_0x127e1d(0x110))[_0x127e1d(0x122)]();}['_handleFileChange'](_0x2ad3b5){const _0xd53cc0=voti_43_0x5925ab,_0x2b19f6=_0x2ad3b5[_0xd53cc0(0x119)][_0xd53cc0(0x111)][0x0];if(!_0x2b19f6)return;const _0x3c24d0=new FileReader();_0x3c24d0[_0xd53cc0(0x10c)]=_0x237523=>{const _0x1468f4=_0xd53cc0;this[_0x1468f4(0x127)](new CustomEvent('import-templates-csv',{'detail':{'content':_0x237523[_0x1468f4(0x119)][_0x1468f4(0x118)]},'bubbles':!![],'composed':!![]}));},_0x3c24d0[_0xd53cc0(0x11e)](_0x2b19f6),_0x2ad3b5['target'][_0xd53cc0(0x11d)]=null;}['_handleAddClick'](){const _0x5f1c4a=voti_43_0x5925ab;this[_0x5f1c4a(0x127)](new CustomEvent(_0x5f1c4a(0x10d),{'bubbles':!![],'composed':!![]}));}['render'](){const _0x4a353b=voti_43_0x5925ab;return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <div class="level">
                    <div class="level-left">
                        <h3 class="subtitle is-5">Modelos de Produtos Salvos</h3>
                    </div>
                    <div class="level-right">
                        <div class="field is-grouped">
                            <p class="control">
                                <button class="button is-primary" @click=${this[_0x4a353b(0x11f)]}>
                                    <span class="icon"><i class="fas fa-plus"></i></span>
                                    <span>Adicionar Modelo</span>
                                </button>
                            </p>
                            <p class="control">
                                <button class="button is-link" @click=${this[_0x4a353b(0x10b)]}>
                                    <i class="fas fa-upload mr-2"></i>Importar Modelos
                                </button>
                                <input type="file" id="import-templates-input" style="display:none" accept=".csv" @change=${this[_0x4a353b(0x114)]}>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    ${this[_0x4a353b(0x116)][_0x4a353b(0x120)]>0x0?this[_0x4a353b(0x116)][_0x4a353b(0x11c)](_0x3ec9eb=>html`
                                <template-item
                                        .template=${_0x3ec9eb}
                                        .isEditing=${this[_0x4a353b(0x113)]===_0x3ec9eb['id']}>
                                </template-item>
                            `):html`<p class="has-text-grey">Nenhum modelo criado ainda.</p>`}
                </div>
            </div>
        `;}}customElements['define'](voti_43_0x5925ab(0x10f),TemplateList);