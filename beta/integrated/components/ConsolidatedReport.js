function voti_31_0xfa84(){var _0x852fdc=['template','consolidadoGrampos','render','reportData','length','custoTotal','42yeidFg','456170uKNdeM','9081584OuharH','classeDesperdicio','93znubBt','define','consolidadoBarras','larg','formatInteger','tipoBarra','4181404bjJrtl','cards','884376XdDXGP','properties','pesoTotal','numBarras','formatNumber','48337fmpxOy','planoCorte','consolidated-report','formatCurrency','comp','26750043NVVFro','qtd','tipo','esp','pesoMP','icon','tamanhoBarra','consolidadoChapas','29642fJRIGW','styles','10QAnMTy','hasData'];voti_31_0xfa84=function(){return _0x852fdc;};return voti_31_0xfa84();}var voti_31_0x4b5ce4=voti_31_0x4d1a;(function(_0x3e90bd,_0x4b6dbf){var _0x549c93=voti_31_0x4d1a,_0x610d7b=_0x3e90bd();while(!![]){try{var _0x5507cb=parseInt(_0x549c93(0x109))/0x1+-parseInt(_0x549c93(0x116))/0x2*(-parseInt(_0x549c93(0xfc))/0x3)+parseInt(_0x549c93(0x102))/0x4+parseInt(_0x549c93(0xf9))/0x5+parseInt(_0x549c93(0x104))/0x6*(parseInt(_0x549c93(0xf8))/0x7)+parseInt(_0x549c93(0xfa))/0x8+parseInt(_0x549c93(0x10e))/0x9*(-parseInt(_0x549c93(0x118))/0xa);if(_0x5507cb===_0x4b6dbf)break;else _0x610d7b['push'](_0x610d7b['shift']());}catch(_0xf0ece6){_0x610d7b['push'](_0x610d7b['shift']());}}}(voti_31_0xfa84,0xa8e08));import{LitElement,html,css}from'lit';import{map}from'lit/directives/map.js';function voti_31_0x4d1a(_0x212029,_0x3e19f4){var _0xfa841e=voti_31_0xfa84();return voti_31_0x4d1a=function(_0x4d1a30,_0x30fc29){_0x4d1a30=_0x4d1a30-0xf1;var _0x5b9180=_0xfa841e[_0x4d1a30];return _0x5b9180;},voti_31_0x4d1a(_0x212029,_0x3e19f4);}import{FormattingService}from'../../../core/services/FormattingService.js';export class ConsolidatedReport extends LitElement{static [voti_31_0x4b5ce4(0x117)]=css`
        :host {
            display: block;
        }
        .table-container {
            overflow-x: auto;
        }
        /* Estilos movidos do styles.css para garantir encapsulamento */
        .data-table {
            width: 100%;
            font-size: 0.875rem;
            border-collapse: collapse;
            margin-bottom: 1rem;
        }
        .data-table th, .data-table td {
            padding: 0.5rem;
            border: 1px solid #e8e8e8;
            vertical-align: top;
            text-align: left;
        }
        .data-table th {
            background: #3273dc;
            color: white;
            font-weight: 600;
        }
        .template-cutting-plan-box {
            margin-bottom: 2rem;
            padding: 0;
            border: 1px solid #e0e0e0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
            border-radius: 8px;
            overflow: hidden;
        }
        .template-cutting-plan-header {
            background-color: #fafafa;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e0e0e0;
        }
        .template-cutting-plan-header .title {
            margin-bottom: 0;
            color: #363636;
        }
        .template-cutting-plan-body {
            padding: 1.5rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        .aproveitamento-card.box {
            padding: 1.25rem;
            background-color: #ffffff;
            border: 1px solid #dbdbdb;
            border-left: 4px solid #3298dc;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .aproveitamento-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            gap: 1rem;
        }
        .aproveitamento-title {
            margin-bottom: 0 !important;
            color: #363636;
        }
        .aproveitamento-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            flex-grow: 1;
        }
        .aproveitamento-info {
            font-size: 1rem;
            font-weight: 600;
        }
        .aproveitamento-peso {
            font-size: 0.875rem;
            color: #666;
        }
        .waste-indicator {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
        }
        .waste-low { background: #d4edda; color: #155724; }
        .waste-medium { background: #fff3cd; color: #856404; }
        .waste-high { background: #f8d7da; color: #721c24; }
    `;static [voti_31_0x4b5ce4(0x105)]={'reportData':{'type':Object}};constructor(){var _0x398436=voti_31_0x4b5ce4;super(),this[_0x398436(0xf5)]={'consolidadoBarras':[],'consolidadoChapas':[],'consolidadoGrampos':[],'planoCorte':[],'hasData':![]};}[voti_31_0x4b5ce4(0xf4)](){var _0x2601d5=voti_31_0x4b5ce4;if(!this[_0x2601d5(0xf5)][_0x2601d5(0xf1)])return html`<p class="has-text-grey">Adicione itens ao orçamento para ver o consolidado geral.</p>`;return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            ${this[_0x2601d5(0xf5)]['consolidadoBarras'][_0x2601d5(0xf6)]>0x0?html`
                <h5 class="subtitle is-5">
                    <i class="fas fa-bars mr-2"></i>
                    Consolidado de Barras Metálicas (Grades)
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Esp./Ø (mm)</th>
                            <th>Larg. (mm)</th>
                            <th>Comp. (mm)</th>
                            <th>Qtd Total</th>
                            <th>Peso Total (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this[_0x2601d5(0xf5)][_0x2601d5(0xfe)],_0x536d50=>html`
                            <tr>
                                <td><strong>${_0x536d50[_0x2601d5(0xf2)]}</strong></td>
                                <td>${_0x536d50[_0x2601d5(0x111)]}</td>
                                <td>${_0x536d50[_0x2601d5(0xff)]}</td>
                                <td>${_0x536d50['comp']}</td>
                                <td>${_0x536d50[_0x2601d5(0x10f)]}</td>
                                <td>${_0x536d50['peso']}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            `:''}

            ${this[_0x2601d5(0xf5)][_0x2601d5(0x115)][_0x2601d5(0xf6)]>0x0?html`
                <h5 class="subtitle is-5" style="margin-top: 2rem;">
                    <i class="fas fa-layer-group mr-2"></i>
                    Consolidado de Chapas para Degraus
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Tipo</th>
                            <th>Esp. (mm)</th>
                            <th>Larg. (mm)</th>
                            <th>Comp. (mm)</th>
                            <th>Qtd Total</th>
                            <th>Peso Total (kg)</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this[_0x2601d5(0xf5)]['consolidadoChapas'],_0x5f1592=>html`
                            <tr>
                                <td><strong>${_0x5f1592[_0x2601d5(0xf2)]}</strong></td>
                                <td>${_0x5f1592[_0x2601d5(0x110)]}</td>
                                <td>${_0x5f1592[_0x2601d5(0x111)]}</td>
                                <td>${_0x5f1592['larg']}</td>
                                <td>${_0x5f1592[_0x2601d5(0x10d)]}</td>
                                <td>${_0x5f1592[_0x2601d5(0x10f)]}</td>
                                <td>${_0x5f1592['peso']}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            `:''}

            ${this['reportData'][_0x2601d5(0xf3)][_0x2601d5(0xf6)]>0x0?html`
                <h5 class="subtitle is-5" style="margin-top: 2rem;">
                    <i class="fas fa-paperclip mr-2"></i>
                    Consolidado de Grampos de Fixação
                </h5>
                <div class="table-container">
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth data-table">
                        <thead>
                        <tr>
                            <th>Modelo</th>
                            <th>Qtd Total</th>
                            <th>Peso Unit. (kg)</th>
                            <th>Peso Total (kg)</th>
                            <th>Custo Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${map(this[_0x2601d5(0xf5)][_0x2601d5(0xf3)],_0x13fa69=>html`
                            <tr>
                                <td><strong>${_0x13fa69[_0x2601d5(0xf2)]}</strong></td>
                                <td>${FormattingService[_0x2601d5(0x100)](_0x13fa69[_0x2601d5(0x10f)])}</td>
                                <td>${FormattingService[_0x2601d5(0x108)](_0x13fa69['pesoUnitario'],0x3)}</td>
                                <td>${FormattingService[_0x2601d5(0x108)](_0x13fa69[_0x2601d5(0x106)])}</td>
                                <td>${FormattingService[_0x2601d5(0x10c)](_0x13fa69[_0x2601d5(0xf7)])}</td>
                            </tr>
                        `)}
                        </tbody>
                    </table>
                </div>
            `:''}

            ${this['reportData']['planoCorte'][_0x2601d5(0xf6)]>0x0?html`
                <div style="margin-top: 2rem;">
                    <h4 class="subtitle is-5">
                        <i class="fas fa-cut mr-2"></i>
                        Plano de Corte - Barras de ${this[_0x2601d5(0xf5)][_0x2601d5(0x10a)][0x0][_0x2601d5(0x114)]}mm
                    </h4>
                    ${map(this['reportData']['planoCorte'],_0xf2bf56=>html`
                        <div class="box template-cutting-plan-box">
                            <div class="template-cutting-plan-header">
                                <h2 class="title is-5">
                                    <i class="fas fa-cog mr-2"></i>
                                    Modelo: ${_0xf2bf56[_0x2601d5(0xf2)]}
                                </h2>
                            </div>
                            <div class="template-cutting-plan-body">
                                ${map(_0xf2bf56[_0x2601d5(0x103)],_0x34a810=>html`
                                    <div class="box aproveitamento-card">
                                        <div class="aproveitamento-header">
                                            <h6 class="subtitle is-6 aproveitamento-title">
                                                <i class="fas ${_0x34a810[_0x2601d5(0x113)]} mr-2"></i>
                                                ${_0x34a810[_0x2601d5(0x101)]}: ${_0x34a810['dimensao']}mm
                                            </h6>
                                            <span class="waste-indicator ${_0x34a810[_0x2601d5(0xfb)]}">
                                                Desperdício: ${_0x34a810['desperdicio']}%
                                            </span>
                                        </div>
                                        <div class="aproveitamento-body">
                                            <div class="aproveitamento-info">
                                                <strong>${_0x34a810[_0x2601d5(0x107)]} barras</strong> de ${_0xf2bf56[_0x2601d5(0x114)]}mm
                                            </div>
                                            <div class="aproveitamento-peso">
                                                <strong>Peso MP:</strong> ${_0x34a810[_0x2601d5(0x112)]} kg
                                            </div>
                                        </div>
                                    </div>
                                `)}
                            </div>
                        </div>
                    `)}
                </div>
            `:''}
        `;}}customElements[voti_31_0x4b5ce4(0xfd)](voti_31_0x4b5ce4(0x10b),ConsolidatedReport);