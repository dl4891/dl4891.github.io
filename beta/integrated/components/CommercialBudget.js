const voti_30_0x496573=voti_30_0xb073;(function(_0x43890d,_0x8ba52e){const _0x14fd9c=voti_30_0xb073,_0x1a4d70=_0x43890d();while(!![]){try{const _0x404449=-parseInt(_0x14fd9c(0x8d))/0x1+parseInt(_0x14fd9c(0x99))/0x2*(-parseInt(_0x14fd9c(0x8e))/0x3)+-parseInt(_0x14fd9c(0x9d))/0x4*(-parseInt(_0x14fd9c(0x7d))/0x5)+parseInt(_0x14fd9c(0x9e))/0x6+-parseInt(_0x14fd9c(0x75))/0x7*(parseInt(_0x14fd9c(0x86))/0x8)+parseInt(_0x14fd9c(0x9c))/0x9*(-parseInt(_0x14fd9c(0x81))/0xa)+-parseInt(_0x14fd9c(0x90))/0xb*(-parseInt(_0x14fd9c(0x6f))/0xc);if(_0x404449===_0x8ba52e)break;else _0x1a4d70['push'](_0x1a4d70['shift']());}catch(_0x17e861){_0x1a4d70['push'](_0x1a4d70['shift']());}}}(voti_30_0x5e33,0x5e673));import{LitElement,html,css}from'lit';function voti_30_0xb073(_0x1826d4,_0x5c263f){const _0x5e33fb=voti_30_0x5e33();return voti_30_0xb073=function(_0xb0734e,_0x3a3ccc){_0xb0734e=_0xb0734e-0x65;let _0x390f9b=_0x5e33fb[_0xb0734e];return _0x390f9b;},voti_30_0xb073(_0x1826d4,_0x5c263f);}import{FormattingService}from'../../../core/services/FormattingService.js';import{unsafeHTML}from'lit/directives/unsafe-html.js';export class CommercialBudget extends LitElement{static ['styles']=css`
        :host {
            display: block;
        }
        .budget-detail-row {
            background-color: #f9f9f9;
        }
        .budget-detail-row td {
            padding: 0 !important;
            border: 0 !important;
            border-bottom: 2px solid #dbdbdb !important;
        }
        .budget-detail-content {
            padding: 1rem 1.5rem 1rem 4rem;
        }
        .item-number-col {
            width: 60px;
            text-align: center;
            font-weight: bold;
        }
        .item-description-cell {
            line-height: 1.4;
        }
        .item-description-cell small {
            color: var(--text-muted, #666);
        }
        .item-description-cell .tag {
            margin-left: 0.5rem;
            vertical-align: middle;
        }
        /* --- INÍCIO DA CORREÇÃO --- */
        .detail-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--primary-color, #3273dc);
            margin-bottom: 0.5rem;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem 2rem;
            font-size: 0.9rem;
        }
        .detail-item {
            display: flex;
            justify-content: space-between;
        }
        .detail-item strong {
            color: #555;
            margin-right: 1rem;
        }
        .detail-item span {
            font-weight: 600;
            color: var(--text-dark, #363636);
        }
        /* --- FIM DA CORREÇÃO --- */
    `;static ['properties']={'budgetItems':{'type':Array},'templates':{'type':Array},'pricingResults':{'type':Object}};constructor(){const _0x10960d=voti_30_0xb073;super(),this[_0x10960d(0x6b)]=[],this[_0x10960d(0x7f)]=[],this[_0x10960d(0x67)]={};}[voti_30_0x496573(0x9a)](_0x4650fc){const _0x3d2d4c=voti_30_0x496573,_0x17ac41=this['shadowRoot']['getElementById'](_0x3d2d4c(0x95)+_0x4650fc),_0xf01674=this['shadowRoot']['getElementById'](_0x3d2d4c(0x87)+_0x4650fc);if(_0x17ac41&&_0xf01674){const _0x3f5385=_0x17ac41[_0x3d2d4c(0xa0)][_0x3d2d4c(0x8a)]===_0x3d2d4c(0xa1);_0x17ac41[_0x3d2d4c(0xa0)]['display']=_0x3f5385?_0x3d2d4c(0x7b):'table-row',_0xf01674[_0x3d2d4c(0x76)][_0x3d2d4c(0x92)]('fa-chevron-down',_0x3f5385),_0xf01674[_0x3d2d4c(0x76)][_0x3d2d4c(0x92)](_0x3d2d4c(0x74),!_0x3f5385);}}[voti_30_0x496573(0x9b)](_0x5525c2,_0x2febeb){const _0x2f06b5=voti_30_0x496573;if(!_0x5525c2)return _0x2f06b5(0x68);const _0x4cf0a2=(_0x5525c2[_0x2f06b5(0x6d)]||0x0)*_0x2febeb,_0x34bb32=(_0x5525c2[_0x2f06b5(0x89)]||0x0)*_0x2febeb,_0x9f1680=(_0x5525c2[_0x2f06b5(0x7c)]||0x0)*_0x2febeb,_0x70bf95=(_0x5525c2[_0x2f06b5(0x83)]||0x0)*_0x2febeb,_0xb6944f=(_0x5525c2['B95_difal']||0x0)*0x64,_0x1ed3a0=(_0x5525c2[_0x2f06b5(0x98)]||0x0)*0x64,_0x43bf42=(_0x5525c2[_0x2f06b5(0x6a)]||0x0)*0x64;return _0x2f06b5(0x6e)+FormattingService['formatNumber'](_0xb6944f,0x2)+_0x2f06b5(0x88)+FormattingService[_0x2f06b5(0xa3)](_0x9f1680)+_0x2f06b5(0x66)+FormattingService['formatNumber']((_0x5525c2['B98_ipiVenda']||0x0)*0x64,0x2)+'%):</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>'+FormattingService[_0x2f06b5(0xa3)](_0x4cf0a2)+'</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22detail-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>(+)\x20ICMS-ST\x20('+FormattingService[_0x2f06b5(0x7e)](_0x1ed3a0,0x2)+_0x2f06b5(0x88)+FormattingService[_0x2f06b5(0xa3)](_0x70bf95)+_0x2f06b5(0x80)+FormattingService['formatNumber'](_0x43bf42,0x2)+_0x2f06b5(0xa2)+FormattingService['formatCurrency'](_0x34bb32)+_0x2f06b5(0x65);}[voti_30_0x496573(0x69)](){const _0xf9cc96=voti_30_0x496573;if(this[_0xf9cc96(0x6b)][_0xf9cc96(0x72)]===0x0)return html`<p class="has-text-grey">Nenhum item no orçamento.</p>`;let _0x334d5c=0x0,_0x447bc=0x0,_0x1e5bdc=![];const _0x26ccc3={};this[_0xf9cc96(0x6b)][_0xf9cc96(0x96)](_0x497a89=>{const _0x435a98=_0xf9cc96,_0x74d8f7=this['templates'][_0x435a98(0x70)](_0x517314=>_0x517314['id']===_0x497a89[_0x435a98(0x73)]);if(_0x74d8f7&&_0x74d8f7[_0x435a98(0x85)]===_0x435a98(0x79)){if(!_0x26ccc3[_0x497a89[_0x435a98(0x73)]])_0x26ccc3[_0x497a89['templateId']]=0x0;_0x26ccc3[_0x497a89[_0x435a98(0x73)]]+=_0x497a89[_0x435a98(0x8f)]*_0x497a89[_0x435a98(0x91)]/0xf4240*_0x497a89[_0x435a98(0x8c)];}});const _0x141e1b=this[_0xf9cc96(0x6b)]['map'](_0x16a9b0=>{const _0x128492=_0xf9cc96,_0x5ac9b8=this[_0x128492(0x7f)][_0x128492(0x70)](_0x56365a=>_0x56365a['id']===_0x16a9b0[_0x128492(0x73)]);if(!_0x5ac9b8)return'';const _0x7be193=this['pricingResults'][_0x5ac9b8['id']],_0x4fd833=FormattingService[_0x128492(0xa4)](_0x16a9b0,_0x5ac9b8,{'excludeQty':!![],'excludeDims':!![]});let _0x56186d='';if(_0x5ac9b8[_0x128492(0x85)]===_0x128492(0x78))_0x56186d=html`<span class="tag is-info is-small">GRAMPO</span>`;else!_0x5ac9b8['isDegrau']&&(_0x56186d=html`<span class="tag is-primary is-light is-small">GRADE</span>`);const _0x27c732=_0x5ac9b8['isDegrau']?html`<span class="tag is-warning is-small">DEGRAU</span>`:'',_0x57cfff=_0x5ac9b8[_0x128492(0x7a)]==='serrilhada'?html`<span class="tag is-dark is-small">SERRILHADA</span>`:'';let _0x1f90f4=0x0,_0x43ca58=0x0,_0x29355f=0x0,_0xdb89=0x1,_0x10307d=_0x128492(0x77),_0x190d53='N/A';if(_0x7be193){_0x1e5bdc=!![];if(_0x5ac9b8['templateType']===_0x128492(0x79)){const _0x177fdd=_0x16a9b0[_0x128492(0x8f)]*_0x16a9b0[_0x128492(0x91)]/0xf4240*_0x16a9b0[_0x128492(0x8c)],_0x2eed8c=_0x26ccc3[_0x5ac9b8['id']]||0x1;_0xdb89=_0x177fdd/_0x2eed8c,_0x10307d=FormattingService[_0x128492(0x7e)](_0x177fdd)+'\x20m²',_0x190d53=_0x16a9b0[_0x128492(0x8f)]+'x'+_0x16a9b0[_0x128492(0x91)]+'mm',_0x43ca58=(_0x7be193[_0x128492(0x93)]||0x0)*_0xdb89,_0x29355f=(_0x7be193[_0x128492(0x84)]||0x0)*_0xdb89,_0x1f90f4=_0x16a9b0['quantidade']>0x0?_0x43ca58/_0x16a9b0[_0x128492(0x8c)]:0x0;}else{const _0x5c3182=_0x7be193[_0x128492(0x9f)][0x0]?.[_0x128492(0x97)]||0x1,_0x244b14=(_0x7be193[_0x128492(0x93)]||0x0)/_0x5c3182;_0x1f90f4=Math['ceil'](_0x244b14*0x64)/0x64,_0x43ca58=_0x1f90f4*_0x16a9b0[_0x128492(0x8c)];const _0x24cab7=_0x7be193[_0x128492(0x93)]||0x0;if(_0x24cab7>0x0){const _0x1214fc=(_0x7be193['B99_valorIPI']||0x0)/_0x24cab7,_0x3d03be=(_0x7be193[_0x128492(0x83)]||0x0)/_0x24cab7,_0x56db6c=_0x43ca58*_0x1214fc,_0x5d5ad8=_0x43ca58*_0x3d03be;_0x29355f=_0x43ca58+_0x56db6c+_0x5d5ad8;}else _0x29355f=_0x43ca58;}_0x334d5c+=_0x43ca58,_0x447bc+=_0x29355f;}return html`
                <tr class="budget-item-row" id="item-row-${_0x16a9b0['id']}">
                    <td class="item-number-col">${(_0x16a9b0[_0x128492(0x94)]??0x0)+0x1}</td>
                    <td class="item-description-cell">
                        <strong>${_0x4fd833[_0x128492(0x6c)]} ${_0x56186d} ${_0x27c732} ${_0x57cfff}</strong>
                        ${_0x4fd833[_0x128492(0x82)]?html`<br><small>${_0x4fd833[_0x128492(0x82)]}</small>`:''}
                    </td>
                    <td>${_0x16a9b0[_0x128492(0x8c)]}</td>
                    <td>${_0x190d53}</td>
                    <td>${_0x10307d}</td>
                    <td>${_0x7be193?FormattingService[_0x128492(0xa3)](_0x1f90f4):'-'}</td>
                    <td>${_0x7be193?FormattingService[_0x128492(0xa3)](_0x43ca58):'-'}</td>
                    <td>${_0x7be193?FormattingService['formatCurrency'](_0x29355f):html`<span class="has-text-danger">Não calculado</span>`}</td>
                    <td>
                        <button class="button is-small is-info is-outlined" @click=${()=>this[_0x128492(0x9a)](_0x16a9b0['id'])} ?disabled=${!_0x7be193}>
                            <span class="icon"><i class="fas fa-chevron-down" id="icon-toggle-${_0x16a9b0['id']}"></i></span>
                        </button>
                    </td>
                </tr>
                <tr class="budget-detail-row" id="detail-row-${_0x16a9b0['id']}" style="display: none;">
                    <td colspan="9">
                        <div class="budget-detail-content">
                            ${unsafeHTML(this['_renderTaxDetails'](_0x7be193,_0xdb89))}
                        </div>
                    </td>
                </tr>
            `;});return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box">
                <h4 class="subtitle is-4">Orçamento Comercial Final</h4>
                ${!_0x1e5bdc?html`<div class="notification is-warning"><p><strong>Atenção:</strong> Execute o cálculo de pricing para gerar valores.</p></div>`:''}
                ${_0x1e5bdc?html`
                    <div class="notification is-success is-light">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Subtotal (c/ DIFAL)</p>
                                    <p class="title is-5">${FormattingService['formatCurrency'](_0x334d5c)}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">TOTAL FINAL (c/ IPI+ST)</p>
                                    <p class="title is-4">${FormattingService[_0xf9cc96(0xa3)](_0x447bc)}</p>
                                </div>
                            </div>
                        </div>
                    </div>`:''}
                <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                    <tr>
                        <th class="item-number-col">Núm</th>
                        <th>Item</th>
                        <th>Qtd</th>
                        <th>Dimensões</th>
                        <th>Área</th>
                        <th>Valor Unitário (Subtotal)</th>
                        <th>Valor Total (Subtotal)</th>
                        <th>Valor Total Final</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${_0x141e1b}
                    </tbody>
                </table>
            </div>
        `;}}customElements[voti_30_0x496573(0x8b)](voti_30_0x496573(0x71),CommercialBudget);function voti_30_0x5e33(){const _0x1eef45=['414280hlNhdW','1779DaAmly','largura','9330134COLwrv','comprimento','toggle','B97_precoVendaComDifal','order','detail-row-','forEach','qty','B38_icmsSTBruto','1270NglnbC','toggleDetailRow','_renderTaxDetails','63gcgopB','8AcHDQG','2929686bRkAQE','materiaisDetalhes','style','table-row','%):</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>(','formatCurrency','getItemDisplayData',')</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22detail-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>(+)\x20IPI\x20(','pricingResults','Detalhes\x20indisponíveis.','render','B82_icmsOpPropria','budgetItems','title','B99_valorIPI','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h6\x20class=\x22detail-title\x22>Composição\x20de\x20Valores</h6>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22detail-grid\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22detail-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>(DIFAL\x20','12oGKhYv','find','commercial-budget','length','templateId','fa-chevron-up','52080eVssXZ','classList','N/A','clamp','grade','superficie','none','B96_valorDifal','7545OeaSOS','formatNumber','templates','</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22detail-item\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>(ICMS\x20Próprio\x20','114490ccCcCL','detailsLine','B101_valorDifST','B102_valorFinalComIPIST','templateType','88UlYnfC','icon-toggle-','%):</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span>','B83_valorICMSOpPropria','display','define','quantidade'];voti_30_0x5e33=function(){return _0x1eef45;};return voti_30_0x5e33();}