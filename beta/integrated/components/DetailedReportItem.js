const voti_33_0x542d33=voti_33_0x2211;function voti_33_0x2211(_0x33b183,_0x1d07d1){const _0xb57e04=voti_33_0xb57e();return voti_33_0x2211=function(_0x22118b,_0x320fe4){_0x22118b=_0x22118b-0x125;let _0xdbdcee=_0xb57e04[_0x22118b];return _0xdbdcee;},voti_33_0x2211(_0x33b183,_0x1d07d1);}(function(_0x152cf0,_0x465933){const _0x4909fc=voti_33_0x2211,_0x5613ac=_0x152cf0();while(!![]){try{const _0x10a7c6=-parseInt(_0x4909fc(0x142))/0x1+parseInt(_0x4909fc(0x13e))/0x2+-parseInt(_0x4909fc(0x12c))/0x3*(-parseInt(_0x4909fc(0x127))/0x4)+-parseInt(_0x4909fc(0x128))/0x5*(parseInt(_0x4909fc(0x139))/0x6)+-parseInt(_0x4909fc(0x141))/0x7*(-parseInt(_0x4909fc(0x14c))/0x8)+parseInt(_0x4909fc(0x147))/0x9+-parseInt(_0x4909fc(0x13c))/0xa*(-parseInt(_0x4909fc(0x133))/0xb);if(_0x10a7c6===_0x465933)break;else _0x5613ac['push'](_0x5613ac['shift']());}catch(_0x4f3533){_0x5613ac['push'](_0x5613ac['shift']());}}}(voti_33_0xb57e,0x8f624));function voti_33_0xb57e(){const _0x59fd2a=['getItemDisplayData','nome','peso','isDegrau','serrilhada','custoPorUnidade','55DeOJbq','qtd','custoMaoObra','formatCurrency','isExpanded','area','30UKBsSm','renderGradeDetails','reportItemData','904910fTndQG','clamp','426116OAfRer','expanded','rotated','42XPHkiQ','718050vTbqIY','detailed-report-item','render','renderClampDetails','grade','972846tUirKe','order','custoTotalItem','custoGalvanizacao','larg','1042968TIATXx','properties','custoMaterial','2552OYTfUn','1095195ywGdfY','_toggleExpand','styles','esp','3972ErpDZY'];voti_33_0xb57e=function(){return _0x59fd2a;};return voti_33_0xb57e();}import{LitElement,html,css}from'lit';import{FormattingService}from'../../../core/services/FormattingService.js';import{map}from'lit/directives/map.js';export class DetailedReportItem extends LitElement{static [voti_33_0x542d33(0x12a)]=css`
        :host {
            display: block;
        }
        .relatorio-item {
            border: var(--border-width, 1px) solid #e8e8e8;
            border-radius: var(--border-radius, 6px);
            margin-bottom: var(--spacing-lg, 1rem);
            overflow: hidden;
        }
        .relatorio-item-header {
            background: var(--bg-light, #f8f9fa);
            padding: var(--spacing-md, 0.75rem) var(--spacing-lg, 1rem);
            border-bottom: var(--border-width, 1px) solid #e8e8e8;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: var(--transition, all 0.2s ease);
        }
        .relatorio-item-header:hover {
            background: #e9ecef;
        }
        .relatorio-item-content {
            padding: var(--spacing-lg, 1rem);
            display: none;
        }
        .relatorio-item-content.expanded {
            display: block;
        }
        .expand-icon {
            transition: transform 0.3s ease;
        }
        .expand-icon.rotated {
            transform: rotate(90deg);
        }
        .data-table {
            width: 100%;
            font-size: var(--font-size-sm, 0.875rem);
            border-collapse: collapse;
            margin: var(--spacing-lg, 1rem) 0;
        }
        .data-table th, .data-table td {
            padding: var(--spacing-sm, 0.5rem);
            border: var(--border-width, 1px) solid #e8e8e8;
            vertical-align: top;
        }
        .data-table th {
            background: var(--primary-color, #3273dc);
            color: white;
            font-weight: 600;
            text-align: left;
        }
        .item-display-title .tag {
            vertical-align: middle;
        }
    `;static [voti_33_0x542d33(0x125)]={'reportItemData':{'type':Object},'isExpanded':{'type':Boolean,'state':!![]}};constructor(){const _0xfcbf29=voti_33_0x542d33;super(),this[_0xfcbf29(0x13b)]={},this[_0xfcbf29(0x137)]=![];}[voti_33_0x542d33(0x129)](){const _0x183329=voti_33_0x542d33;this[_0x183329(0x137)]=!this[_0x183329(0x137)];}[voti_33_0x542d33(0x13a)](_0x421c5c,_0x2d6402,_0x420dd4){const _0xf64c09=voti_33_0x542d33;return html`
            <table class="data-table">
                <thead>
                <tr>
                    <th>Material</th>
                    <th>Esp./Ø (mm)</th>
                    <th>Larg. (mm)</th>
                    <th>Comp. (mm)</th>
                    <th>Qtd</th>
                    <th>Peso (kg)</th>
                </tr>
                </thead>
                <tbody>
                ${map(_0x421c5c,_0x182913=>html`
                    <tr>
                        <td><strong>${_0x182913[_0xf64c09(0x12e)]}</strong></td>
                        <td>${_0x182913[_0xf64c09(0x12b)]}</td>
                        <td>${_0x182913[_0xf64c09(0x14b)]}</td>
                        <td>${_0x182913['comp']}</td>
                        <td>${_0x182913[_0xf64c09(0x134)]}</td>
                        <td>${_0x182913[_0xf64c09(0x12f)]}</td>
                    </tr>
                `)}
                </tbody>
            </table>

            <div style="margin-top: 1rem;">
                <h6 class="subtitle is-6">Custos Detalhados</h6>
                <div class="columns is-mobile">
                    <div class="column">
                        <strong>Material:</strong> ${FormattingService[_0xf64c09(0x136)](_0x2d6402[_0xf64c09(0x126)])}<br>
                        <strong>Mão de Obra:</strong> ${FormattingService[_0xf64c09(0x136)](_0x2d6402[_0xf64c09(0x135)])}<br>
                        <strong>Galvanização:</strong> ${FormattingService[_0xf64c09(0x136)](_0x2d6402['custoGalvanizacao'])}
                    </div>
                    <div class="column has-text-right">
                        <strong>TOTAL:</strong> ${FormattingService['formatCurrency'](_0x2d6402[_0xf64c09(0x149)])}<br>
                        <strong>Custo/unidade:</strong> ${FormattingService[_0xf64c09(0x136)](_0x2d6402[_0xf64c09(0x132)])}<br>
                        <small>Custo/m²: ${FormattingService[_0xf64c09(0x136)](_0x420dd4[_0xf64c09(0x138)]>0x0?_0x2d6402[_0xf64c09(0x149)]/_0x420dd4[_0xf64c09(0x138)]:0x0)}</small>
                    </div>
                </div>
            </div>
        `;}[voti_33_0x542d33(0x145)](_0x24a935){const _0x280a78=voti_33_0x542d33;return html`
            <div style="margin-top: 1rem;">
                <h6 class="subtitle is-6">Custos Detalhados (Valores Finais Inseridos)</h6>
                <div class="columns is-mobile">
                    <div class="column">
                        <strong>Material:</strong> ${FormattingService[_0x280a78(0x136)](_0x24a935['custoMaterial'])}<br>
                        <strong>Mão de Obra:</strong> ${FormattingService[_0x280a78(0x136)](_0x24a935['custoMaoObra'])}<br>
                        <strong>Galvanização:</strong> ${FormattingService[_0x280a78(0x136)](_0x24a935[_0x280a78(0x14a)])}
                    </div>
                    <div class="column has-text-right">
                        <strong>TOTAL:</strong> ${FormattingService['formatCurrency'](_0x24a935['custoTotalItem'])}<br>
                        <strong>Custo/unidade:</strong> ${FormattingService['formatCurrency'](_0x24a935['custoPorUnidade'])}<br>
                    </div>
                </div>
            </div>
        `;}[voti_33_0x542d33(0x144)](){const _0x2601c2=voti_33_0x542d33,{item:_0x420dbc,calculo:_0x10f617,custos:_0x2c0cca,materiais:_0x9779df,template:_0x76d2a}=this[_0x2601c2(0x13b)];if(!_0x420dbc||!_0x10f617||!_0x2c0cca||!_0x76d2a)return html``;const _0x400012=_0x76d2a['templateType']===_0x2601c2(0x146),_0x229c5f=FormattingService[_0x2601c2(0x12d)](_0x420dbc,_0x76d2a);let _0x10bbd6='';if(_0x76d2a['templateType']===_0x2601c2(0x13d))_0x10bbd6=html`<span class="tag is-info is-small">GRAMPO</span>`;else!_0x76d2a[_0x2601c2(0x130)]&&(_0x10bbd6=html`<span class="tag is-primary is-light is-small">GRADE</span>`);const _0x1cc76f=_0x76d2a[_0x2601c2(0x130)]?html`<span class="tag is-warning is-small">DEGRAU</span>`:'',_0x5951dd=_0x76d2a['superficie']===_0x2601c2(0x131)?html`<span class="tag is-dark is-small">SERRILHADA</span>`:'';return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="relatorio-item">
                <div class="relatorio-item-header" @click=${this[_0x2601c2(0x129)]}>
                    <div class="item-display-content">
                        <div class="item-display-title">
                            ${(_0x420dbc[_0x2601c2(0x148)]??0x0)+0x1}. ${_0x229c5f['title']} ${_0x10bbd6} ${_0x1cc76f} ${_0x5951dd}
                        </div>
                        <div class="item-display-details">
                            ${_0x229c5f['detailsLine']}
                        </div>
                        <div class="item-display-results mt-2">
                            <strong>Custo Total:</strong> ${FormattingService[_0x2601c2(0x136)](_0x2c0cca['custoTotalItem'])} |
                            <strong>Custo/unidade:</strong> ${FormattingService[_0x2601c2(0x136)](_0x2c0cca[_0x2601c2(0x132)])}
                        </div>
                    </div>
                    <span class="icon expand-icon ${this[_0x2601c2(0x137)]?_0x2601c2(0x140):''}">
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </div>
                <div class="relatorio-item-content ${this[_0x2601c2(0x137)]?_0x2601c2(0x13f):''}">
                    ${_0x400012?this[_0x2601c2(0x13a)](_0x9779df,_0x2c0cca,_0x10f617):this['renderClampDetails'](_0x2c0cca)}
                </div>
            </div>
        `;}}customElements['define'](voti_33_0x542d33(0x143),DetailedReportItem);