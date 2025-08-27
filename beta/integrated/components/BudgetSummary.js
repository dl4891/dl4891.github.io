function voti_27_0xfbca(_0x375eed,_0xfc1628){const _0x32fa8b=voti_27_0x32fa();return voti_27_0xfbca=function(_0xfbca8d,_0xcc18fd){_0xfbca8d=_0xfbca8d-0x144;let _0x126755=_0x32fa8b[_0xfbca8d];return _0x126755;},voti_27_0xfbca(_0x375eed,_0xfc1628);}const voti_27_0x54bca7=voti_27_0xfbca;(function(_0xdc39e,_0x47cfed){const _0x42c820=voti_27_0xfbca,_0x88fa5e=_0xdc39e();while(!![]){try{const _0x27b43d=parseInt(_0x42c820(0x165))/0x1*(-parseInt(_0x42c820(0x150))/0x2)+-parseInt(_0x42c820(0x14e))/0x3+-parseInt(_0x42c820(0x145))/0x4+-parseInt(_0x42c820(0x147))/0x5+parseInt(_0x42c820(0x163))/0x6+-parseInt(_0x42c820(0x167))/0x7+parseInt(_0x42c820(0x15d))/0x8;if(_0x27b43d===_0x47cfed)break;else _0x88fa5e['push'](_0x88fa5e['shift']());}catch(_0x1189db){_0x88fa5e['push'](_0x88fa5e['shift']());}}}(voti_27_0x32fa,0x7ddb1));import{LitElement,html,css}from'lit';import{FormattingService}from'../../../core/services/FormattingService.js';export class BudgetSummary extends LitElement{static [voti_27_0x54bca7(0x14f)]=css`
        :host { display: block; }
        .totals-box { background: #f8f9fa; border-left: 4px solid #3273dc; }
        .total-cost .title { color: #48c774; }
        .material-consolidado { font-size: 0.8rem; margin-bottom: 0.5rem; }
        .has-text-grey { color: #7a7a7a; }
    `;static [voti_27_0x54bca7(0x14a)]={'summary':{'type':Object}};constructor(){const _0x277d17=voti_27_0x54bca7;super(),this[_0x277d17(0x15e)]={'totalGrades':0x0,'totalGrampos':0x0,'totalArea':0x0,'totalPesoMargem':0x0,'custoMaterial':0x0,'custoGeral':0x0,'consolidado':{},'hasTeoricoWeights':![]};}[voti_27_0x54bca7(0x157)](){const _0x2c4b04=voti_27_0x54bca7,_0x59f96e={'portante':_0x2c4b04(0x149),'ligacaoDiam':_0x2c4b04(0x144),'ligacaoChata':_0x2c4b04(0x148),'fechTerminal':_0x2c4b04(0x14c),'fechLateral':_0x2c4b04(0x15b),'chapaLateral':_0x2c4b04(0x153),'chapaXadrez':_0x2c4b04(0x152),'grampo':_0x2c4b04(0x166)},_0xfc4a8f=Object[_0x2c4b04(0x168)](this['summary'][_0x2c4b04(0x164)])[_0x2c4b04(0x146)](([_0x3e46d4,_0x5cd3ee])=>_0x5cd3ee[_0x2c4b04(0x15f)]>0x0)[_0x2c4b04(0x151)](([_0x3ea43a],[_0x152c1f])=>(_0x59f96e[_0x3ea43a]||_0x3ea43a)['localeCompare'](_0x59f96e[_0x152c1f]||_0x152c1f));if(_0xfc4a8f[_0x2c4b04(0x154)]===0x0)return html`<p class="has-text-grey is-size-7">Adicione itens para ver o consolidado</p>`;return _0xfc4a8f['map'](([_0xb9f3c7,_0x4c7c84])=>html`
            <div class="material-consolidado">
                <strong>${_0x59f96e[_0xb9f3c7]||_0x4c7c84[_0x2c4b04(0x156)]||_0xb9f3c7}</strong><br>
                ${FormattingService[_0x2c4b04(0x15c)](_0x4c7c84[_0x2c4b04(0x15a)])} pçs | ${FormattingService['formatNumber'](_0x4c7c84[_0x2c4b04(0x15f)])} kg
            </div>
        `);}[voti_27_0x54bca7(0x158)](){const _0x2572cc=voti_27_0x54bca7,_0x497369=this[_0x2572cc(0x15e)]['hasTeoricoWeights']?html`<span class="icon is-small has-text-info ml-1" title="O peso total inclui itens com cálculo 'Teórico'"><i class="fas fa-info-circle"></i></span>`:'';return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <div class="box totals-box">
                <h3 class="subtitle is-4">Resumo do Orçamento</h3>
                <div class="content">
                    <div class="level">
                        <div class="level-item has-text-centered"><div><p class="heading">Itens (Grades)</p><p class="title is-4">${FormattingService[_0x2572cc(0x15c)](this[_0x2572cc(0x15e)][_0x2572cc(0x162)]||0x0)}</p></div></div>
                        <div class="level-item has-text-centered"><div><p class="heading">Itens (Grampos)</p><p class="title is-4">${FormattingService[_0x2572cc(0x15c)](this[_0x2572cc(0x15e)][_0x2572cc(0x14d)]||0x0)}</p></div></div>
                    </div>
                    <div class="level">
                        <div class="level-item has-text-centered"><div><p class="heading">Área Total (Grades)</p><p class="title is-5">${FormattingService[_0x2572cc(0x159)](this['summary']['totalArea']||0x0)} m²</p></div></div>
                        <div class="level-item has-text-centered"><div><p class="heading">Peso Total ${_0x497369}</p><p class="title is-5">${FormattingService[_0x2572cc(0x159)](this[_0x2572cc(0x15e)][_0x2572cc(0x160)]||0x0)} kg</p></div></div>
                    </div>
                    <hr>
                    <div class="level"><div class="level-item"><div><p class="heading">Custo Material</p><p class="title is-6">${FormattingService['formatCurrency'](this['summary']['custoMaterial']||0x0)}</p></div></div></div>
                    <div class="level total-cost"><div class="level-item"><div><p class="heading">TOTAL GERAL</p><p class="title is-4">${FormattingService[_0x2572cc(0x14b)](this[_0x2572cc(0x15e)][_0x2572cc(0x155)]||0x0)}</p></div></div></div>
                    <hr>
                    <h6 class="subtitle is-6">Consolidado de Materiais</h6>
                    <div id="consolidado-materiais">${this[_0x2572cc(0x157)]()}</div>
                </div>
            </div>
        `;}}function voti_27_0x32fa(){const _0x28da70=['formatInteger','17782040TKobQp','summary','peso','totalPesoMargem','define','totalGrades','2099580EIAyhO','consolidado','82uCtbiV','Grampos\x20de\x20Fixação','2490005bHVjDA','entries','Barras\x20Ligação\x20Ø','3182072crEewH','filter','672915NTfypG','Barras\x20Ligação\x20Chata','Barras\x20Portantes','properties','formatCurrency','Fechamento\x20Terminal','totalGrampos','2272272vIBIUi','styles','340sTQNYD','sort','Chapa\x20Xadrez','Chapa\x20Lateral','length','custoGeral','nome','renderConsolidado','render','formatNumber','qtd','Fechamento\x20Lateral'];voti_27_0x32fa=function(){return _0x28da70;};return voti_27_0x32fa();}customElements[voti_27_0x54bca7(0x161)]('budget-summary',BudgetSummary);