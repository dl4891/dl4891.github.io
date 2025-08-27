function voti_41_0x2a58(){const _0xbc25d9=['teorico','pesoUnitario','868388CbGuPE','PESO\x20TEÓRICO','stopPropagation','9031pPvXIW','formatNumber','pesoCalcMode','template-item','render','PESO\x20REAL','templateType','bp_larg','properties','1910vGIALL','263PDKsHc','template','nome','styles','2256qitAYD','_onDelete','110358gUEqZM','48381zbjFdU','isDegrau','dispatchEvent','_onEdit','malha_maior','superficie','is-clamp','delete-template','define','isEditing','1933135meTaQb','328lkFzmR','grade','bp_esp','4942goCXig','16680TOzBMd','is-degrau'];voti_41_0x2a58=function(){return _0xbc25d9;};return voti_41_0x2a58();}const voti_41_0x54c8ce=voti_41_0x3641;(function(_0x36602d,_0x182839){const _0x3a3c13=voti_41_0x3641,_0x432036=_0x36602d();while(!![]){try{const _0x47ca5a=-parseInt(_0x3a3c13(0x12f))/0x1*(-parseInt(_0x3a3c13(0x12e))/0x2)+parseInt(_0x3a3c13(0x136))/0x3+-parseInt(_0x3a3c13(0x122))/0x4+-parseInt(_0x3a3c13(0x119))/0x5+-parseInt(_0x3a3c13(0x133))/0x6*(parseInt(_0x3a3c13(0x11d))/0x7)+parseInt(_0x3a3c13(0x11a))/0x8*(-parseInt(_0x3a3c13(0x135))/0x9)+parseInt(_0x3a3c13(0x11e))/0xa*(parseInt(_0x3a3c13(0x125))/0xb);if(_0x47ca5a===_0x182839)break;else _0x432036['push'](_0x432036['shift']());}catch(_0x387942){_0x432036['push'](_0x432036['shift']());}}}(voti_41_0x2a58,0x40a5e));function voti_41_0x3641(_0x152a22,_0x3226ca){const _0x2a58db=voti_41_0x2a58();return voti_41_0x3641=function(_0x3641d3,_0x10f0ca){_0x3641d3=_0x3641d3-0x110;let _0x435355=_0x2a58db[_0x3641d3];return _0x435355;},voti_41_0x3641(_0x152a22,_0x3226ca);}import{LitElement,html,css}from'lit';import{FormattingService}from'../../../core/services/FormattingService.js';export class TemplateItem extends LitElement{static [voti_41_0x54c8ce(0x132)]=css`
        :host {
            display: block;
            margin-bottom: var(--spacing-md);
        }
        .template-item {
            border: var(--border-width) solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            background: var(--bg-white);
            transition: var(--transition);
            position: relative;
        }
        .template-item:hover {
            border-color: var(--primary-color);
            box-shadow: var(--shadow);
            transform: translateY(-2px);
        }
        .is-degrau {
            border-left: 4px solid var(--warning-color);
            background: linear-gradient(135deg, #ffffff 0%, #fffdf7 100%);
        }
        .is-clamp {
            border-left: 4px solid var(--info-color);
            background: linear-gradient(135deg, #ffffff 0%, #f6fbff 100%);
        }
        .editing-highlight {
            border-color: var(--primary-color) !important;
            background-color: var(--bg-section) !important;
            box-shadow: 0 0 0 3px rgba(50, 115, 220, 0.25) !important;
        }
        h6 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.25rem; /* Espaçamento entre as tags */
        }
        p {
            font-size: 0.8rem;
            color: #666;
            margin: 0;
        }
        .template-actions {
            display: flex;
            gap: var(--spacing-xs);
            margin-top: var(--spacing-sm);
        }
        .tag {
            font-size: 0.65rem;
            margin-left: 0.5rem;
            vertical-align: middle;
            background-color: #f5f5f5;
            border-radius: 4px;
            color: #4a4a4a;
            display: inline-block;
            line-height: 1.5;
            padding: 0.25em 0.75em;
            white-space: nowrap;
        }
        .tag.is-primary {
            background-color: #eef6ff;
            color: #3273dc;
        }
        .tag.is-info {
            background-color: #3298dc;
            color: #fff;
        }
        .tag.is-info.is-light {
            background-color: #eef6ff;
            color: #3273dc;
        }
        .tag.is-warning {
            background-color: #ffdd57;
            color: rgba(0, 0, 0, 0.7);
        }
        .tag.is-dark {
            background-color: #363636;
            color: #fff;
        }
    `;static [voti_41_0x54c8ce(0x12d)]={'template':{'type':Object},'isEditing':{'type':Boolean}};constructor(){const _0x1f756b=voti_41_0x54c8ce;super(),this[_0x1f756b(0x130)]={},this[_0x1f756b(0x118)]=![];}[voti_41_0x54c8ce(0x112)](_0x2ad8dd){const _0xca84f6=voti_41_0x54c8ce;_0x2ad8dd[_0xca84f6(0x124)](),this['dispatchEvent'](new CustomEvent('edit-template',{'detail':{'templateId':this[_0xca84f6(0x130)]['id']},'bubbles':!![],'composed':!![]}));}['_onDelete'](_0x296b33){const _0x1e11d1=voti_41_0x54c8ce;_0x296b33[_0x1e11d1(0x124)](),this[_0x1e11d1(0x111)](new CustomEvent(_0x1e11d1(0x116),{'detail':{'templateId':this[_0x1e11d1(0x130)]['id']},'bubbles':!![],'composed':!![]}));}[voti_41_0x54c8ce(0x129)](){const _0xd39bed=voti_41_0x54c8ce;if(!this[_0xd39bed(0x130)]['id'])return html``;const _0x1a2b1b=this[_0xd39bed(0x130)][_0xd39bed(0x12b)]===_0xd39bed(0x11b),_0x75095a=this[_0xd39bed(0x130)][_0xd39bed(0x12b)]==='clamp';let _0x4403ff='';if(_0x75095a)_0x4403ff=html`<span class="tag is-info is-small">GRAMPO</span>`;else!this[_0xd39bed(0x130)][_0xd39bed(0x110)]&&(_0x4403ff=html`<span class="tag is-primary is-small">GRADE</span>`);const _0x4282de=this[_0xd39bed(0x130)][_0xd39bed(0x110)]?html`<span class="tag is-warning is-small">DEGRAU</span>`:'',_0x586502=_0x1a2b1b&&this[_0xd39bed(0x130)][_0xd39bed(0x114)]==='serrilhada'?html`<span class="tag is-dark is-small">SERRILHADA</span>`:'',_0x5e131e=_0x1a2b1b&&this['template']['precosCustomizados']?html`<span class="tag is-info is-light is-small">PREÇOS CUSTOM</span>`:'',_0x3c9ae5=_0x1a2b1b?html`<span class="tag is-info is-light is-small">${this[_0xd39bed(0x130)][_0xd39bed(0x127)]===_0xd39bed(0x120)?_0xd39bed(0x123):_0xd39bed(0x12a)}</span>`:'',_0x39ba51=_0x75095a?_0xd39bed(0x115):this[_0xd39bed(0x130)][_0xd39bed(0x110)]?_0xd39bed(0x11f):'',_0x5c0da3=this[_0xd39bed(0x118)]?'editing-highlight':'';return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="template-item ${_0x39ba51} ${_0x5c0da3}">
                <h6>
                    ${this[_0xd39bed(0x130)][_0xd39bed(0x131)]}
                    ${_0x4403ff}
                    ${_0x4282de}
                    ${_0x586502}
                    ${_0x5e131e}
                    ${_0x3c9ae5}
                </h6>
                ${_0x1a2b1b?html`
                    <p>
                        BP: ${FormattingService[_0xd39bed(0x126)](this[_0xd39bed(0x130)][_0xd39bed(0x11c)])}x${FormattingService[_0xd39bed(0x126)](this[_0xd39bed(0x130)][_0xd39bed(0x12c)])}mm |
                        Malha: ${FormattingService['formatInteger'](this['template']['malha_menor'])}x${FormattingService['formatInteger'](this[_0xd39bed(0x130)][_0xd39bed(0x113)])}mm
                    </p>
                `:html`
                    <p style="font-size: 0.75rem; color: #999;">
                        Peso Unitário: ${FormattingService[_0xd39bed(0x126)](this[_0xd39bed(0x130)][_0xd39bed(0x121)],0x3)} kg
                    </p>
                `}
                <div class="template-actions">
                    <button class="button is-small is-info" @click=${this[_0xd39bed(0x112)]} title="Editar">
                        <span class="icon"><i class="fas fa-edit"></i></span>
                    </button>
                    <button class="button is-small is-danger" @click=${this[_0xd39bed(0x134)]} title="Excluir">
                        <span class="icon"><i class="fas fa-trash"></i></span>
                    </button>
                </div>
            </div>
        `;}}customElements[voti_41_0x54c8ce(0x117)](voti_41_0x54c8ce(0x128),TemplateItem);