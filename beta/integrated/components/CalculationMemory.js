const voti_28_0x3629fe=voti_28_0x17f1;(function(_0x237c8b,_0x3b95ca){const _0x5d32c7=voti_28_0x17f1,_0x3180cd=_0x237c8b();while(!![]){try{const _0x4408b7=parseInt(_0x5d32c7(0x1f1))/0x1*(parseInt(_0x5d32c7(0x216))/0x2)+-parseInt(_0x5d32c7(0x20e))/0x3*(-parseInt(_0x5d32c7(0x1f2))/0x4)+parseInt(_0x5d32c7(0x207))/0x5*(-parseInt(_0x5d32c7(0x22a))/0x6)+-parseInt(_0x5d32c7(0x21d))/0x7+-parseInt(_0x5d32c7(0x220))/0x8+parseInt(_0x5d32c7(0x208))/0x9+parseInt(_0x5d32c7(0x1ff))/0xa;if(_0x4408b7===_0x3b95ca)break;else _0x3180cd['push'](_0x3180cd['shift']());}catch(_0x32a461){_0x3180cd['push'](_0x3180cd['shift']());}}}(voti_28_0x19dd,0xdccce));function voti_28_0x17f1(_0x1267d1,_0x2c9a8d){const _0x19dd97=voti_28_0x19dd();return voti_28_0x17f1=function(_0x17f10b,_0x26db1f){_0x17f10b=_0x17f10b-0x1ee;let _0x3f8835=_0x19dd97[_0x17f10b];return _0x3f8835;},voti_28_0x17f1(_0x1267d1,_0x2c9a8d);}function voti_28_0x19dd(){const _0x304f94=['isDegrau','pesoComMargem','length','renderClampMemory','2285760bhoMGi','densidade','template','tipo','teorico','is-degrau','getItemDisplayData','9307WuZGfD','8qWNgZS','pesoMP','maoDeObra','unit','tipoPreco','costs','renderMateriaisSection','PESO\x20TEÓRICO','custoUnitario','reduce','renderItensSection','styles','larg','26075520LdqYJh','entries','formatCurrency','rows','render','precosCustomizados','memoryData','custo','20fMUBzZ','3683502euEqDs','precoKg','templateType','PESO\x20REAL','pesoCalcMode','qtd','687912TMCDwt','area','renderProcessosSection','peso','properties','calculation-memory','renderChapasSection','detailsLine','270zzDaRF','define','title','superficie','Galvanização','values','renderGradeMemory','9543016WqpXFX','numBarras','total','7522856KxWkiE','nome','subtotal','Componente\x20Total','item','galvanizacao'];voti_28_0x19dd=function(){return _0x304f94;};return voti_28_0x19dd();}import{LitElement,html,css}from'lit';import{map}from'lit/directives/map.js';import{FormattingService}from'../../../core/services/FormattingService.js';export class CalculationMemory extends LitElement{static [voti_28_0x3629fe(0x1fd)]=css`
        :host {
            display: block;
        }
        /* Estilos críticos importados do shared/styles.css para garantir o encapsulamento e a aparência correta */
        .memoria-template {
            border: 2px solid #3273dc;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        }
        .memoria-template.is-degrau {
            border-color: #ffdd57;
        }
        .memoria-template.is-clamp {
            border-color: #3298dc; /* info color */
        }
        .memoria-template-header {
            background: linear-gradient(135deg, #3273dc 0%, #2366d1 100%);
            color: white;
            padding: 1rem;
        }
        .memoria-template-header.is-degrau {
            background: linear-gradient(135deg, #ffdd57 0%, #e6c441 100%);
            color: #363636;
        }
        .memoria-template-header.is-clamp {
            background: linear-gradient(135deg, #3298dc 0%, #208fce 100%);
        }
        .memoria-template-title {
            font-weight: 600;
            display: flex;
            align-items: center;
        }
        .memoria-template-title .tag {
            margin-left: 0.75rem;
        }
        .memoria-template-subtitle {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            flex-wrap: wrap;
        }
        .memoria-template-body {
            padding: 1rem;
        }
        .memoria-section {
            margin-bottom: 1.5rem;
        }
        .memoria-section-title {
            font-size: 1rem;
            font-weight: 600;
            color: #3273dc;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .memoria-items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 0.75rem;
        }
        .memoria-item-card {
            background: #f8f9fa;
            border: 1px solid #dbdbdb;
            border-radius: 6px;
            padding: 0.75rem;
        }
        .memoria-materials-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0.75rem 0;
            font-size: 0.875rem;
        }
        .memoria-materials-table th, .memoria-materials-table td {
            border: 1px solid #dbdbdb;
            padding: 0.5rem;
            text-align: left;
        }
        .memoria-materials-table th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .memoria-materials-table .custo-cell {
            background: #f0fff4;
            font-weight: 600;
            color: #48c774;
        }
        .memoria-processes {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 0.75rem;
        }
        .memoria-process-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .memoria-process-row:last-child {
            border-bottom: none;
        }
        .memoria-process-calc {
            font-size: 0.75rem;
            color: #666;
            font-family: 'Courier New', monospace;
        }
        .memoria-total {
            background: linear-gradient(135deg, #f0fff4 0%, #e8f5e8 100%);
            border: 2px solid #48c774;
            border-radius: 6px;
            padding: 1rem;
            text-align: center;
            margin-top: 1.5rem;
        }
        .memoria-total-value {
            font-size: 2rem;
            font-weight: bold;
            color: #48c774;
            margin-bottom: 0.25rem;
        }
        .memoria-total-per-m2 {
            font-size: 1rem;
            color: #666;
        }
        .custo-fixo-table {
            font-size: 0.9em;
        }
        .custo-fixo-table td {
            padding: 0.4em 0.6em;
        }
    `;static [voti_28_0x3629fe(0x212)]={'memoryData':{'type':Array}};constructor(){const _0x2c302e=voti_28_0x3629fe;super(),this[_0x2c302e(0x205)]=[];}[voti_28_0x3629fe(0x203)](){const _0x1122f7=voti_28_0x3629fe;if(!this['memoryData']||this['memoryData'][_0x1122f7(0x228)]===0x0)return html`<p class="has-text-grey">Adicione itens ao orçamento para ver a memória de cálculo detalhada.</p>`;return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            ${map(this[_0x1122f7(0x205)],_0x2abbba=>_0x2abbba[_0x1122f7(0x22c)][_0x1122f7(0x20a)]==='grade'?this[_0x1122f7(0x21c)](_0x2abbba):this['renderClampMemory'](_0x2abbba))}
        `;}[voti_28_0x3629fe(0x21c)](_0x544a92){const _0x3f6a91=voti_28_0x3629fe,{template:_0xf81b27,totais:_0x56a6bc,itens:_0xec9ebc,barras:_0x1c69a6,chapas:_0x18af9e,processos:_0x43c102,custoTotal:_0x1892be,totalWeightCalcMethod:_0x1ae99d}=_0x544a92,_0x1171e5=_0xf81b27[_0x3f6a91(0x226)],_0x40ebd7=_0x1ae99d===_0x3f6a91(0x1f5)?'Unidade\x20Multiplicada':_0x3f6a91(0x223),_0x4653c8=_0x1171e5?html`<span class="tag is-warning">DEGRAU</span>`:html`<span class="tag is-primary">GRADE</span>`,_0x131056=_0xf81b27[_0x3f6a91(0x204)]?html`<span class="tag is-info is-light">PREÇOS CUSTOM</span>`:'',_0x5cef03=html`<span class="tag is-info is-light">${_0xf81b27[_0x3f6a91(0x20c)]===_0x3f6a91(0x1ee)?_0x3f6a91(0x1f9):_0x3f6a91(0x20b)}</span>`,_0x4654ba=_0xf81b27[_0x3f6a91(0x219)]==='serrilhada'?html`<span class="tag is-dark">SERRILHADA</span>`:'';return html`
            <div class="memoria-template ${_0x1171e5?_0x3f6a91(0x1ef):''}">
                <div class="memoria-template-header ${_0x1171e5?_0x3f6a91(0x1ef):''}">
                    <div class="memoria-template-title">
                        <i class="fas fa-cogs mr-2"></i>${_0xf81b27[_0x3f6a91(0x221)]} ${_0x4653c8} ${_0x4654ba} ${_0x131056} ${_0x5cef03}
                    </div>
                    <div class="memoria-template-subtitle">
                        <span><i class="fas fa-list mr-1"></i>${_0xec9ebc['length']} itens</span>
                        <span><i class="fas fa-ruler-combined mr-1"></i>${_0x56a6bc[_0x3f6a91(0x20f)]} m²</span>
                        <span><i class="fas fa-weight mr-1"></i>${_0x56a6bc['pesoComMargem']} kg</span>
                        <span><i class="fas fa-th mr-1"></i>Malha: ${_0x56a6bc['malhaDisplay']}</span>
                        <span title="Método de Cálculo Total do Orçamento"><i class="fas fa-calculator mr-1"></i>${_0x40ebd7}</span>
                    </div>
                </div>

                <div class="memoria-template-body">
                    ${this[_0x3f6a91(0x1fc)](_0xec9ebc,_0xf81b27)}
                    ${this['renderMateriaisSection'](_0x1c69a6,_0xf81b27[_0x3f6a91(0x22b)])}
                    ${_0x1171e5?this[_0x3f6a91(0x214)](_0x18af9e):''}
                    ${this[_0x3f6a91(0x210)](_0x43c102)}

                    <div class="memoria-total">
                        <div class="memoria-total-value">${_0x1892be['total']}</div>
                        <div class="memoria-total-per-m2">Custo por m²: ${_0x1892be['porM2']}</div>
                    </div>
                </div>
            </div>
        `;}[voti_28_0x3629fe(0x229)](_0x313942){const _0x1e50fd=voti_28_0x3629fe,{template:_0x1f8bed,totais:_0x3a8a24,itens:_0x342d88,custoTotal:_0x1f91d0}=_0x313942,_0x252135=(_0x3cf15d,_0x29cd54)=>html`
            <h6 class="subtitle is-6 mt-4">${_0x3cf15d}</h6>
            <table class="table is-bordered is-narrow is-fullwidth custo-fixo-table">
                <tbody>
                ${Object[_0x1e50fd(0x200)](_0x29cd54)['map'](([_0x1aad09,_0x107e2c])=>html`
                    <tr>
                        <td>${FormattingService['capitalize'](_0x1aad09)}</td>
                        <td class="has-text-right">${FormattingService[_0x1e50fd(0x201)](_0x107e2c)}</td>
                    </tr>
                `)}
                <tr>
                    <td class="has-text-weight-bold">Subtotal</td>
                    <td class="has-text-right has-text-weight-bold">
                        ${FormattingService['formatCurrency'](Object[_0x1e50fd(0x21b)](_0x29cd54)[_0x1e50fd(0x1fb)]((_0x246192,_0x586762)=>_0x246192+_0x586762,0x0))}
                    </td>
                </tr>
                </tbody>
            </table>
        `;return html`
            <div class="memoria-template is-clamp">
                <div class="memoria-template-header is-clamp">
                    <div class="memoria-template-title">
                        <i class="fas fa-paperclip mr-2"></i>${_0x1f8bed['nome']}
                        <span class="tag is-info">GRAMPO</span>
                    </div>
                    <div class="memoria-template-subtitle">
                        <span><i class="fas fa-list mr-1"></i>${_0x342d88[_0x1e50fd(0x228)]} itens</span>
                        <span><i class="fas fa-weight mr-1"></i>${_0x3a8a24[_0x1e50fd(0x227)]} kg</span>
                    </div>
                </div>
                <div class="memoria-template-body">
                    ${this[_0x1e50fd(0x1fc)](_0x342d88,_0x1f8bed)}

                    <div class="memoria-section">
                        <div class="memoria-section-title"><i class="fas fa-dollar-sign"></i> Detalhamento de Custos Unitários (Fixos)</div>
                        <div class="columns">
                            <div class="column">
                                ${_0x252135('Matéria\x20Prima',_0x1f8bed[_0x1e50fd(0x1f7)]['material'])}
                            </div>
                            <div class="column">
                                ${_0x252135('Mão\x20de\x20Obra',_0x1f8bed['costs'][_0x1e50fd(0x1f4)])}
                                ${_0x252135(_0x1e50fd(0x21a),_0x1f8bed[_0x1e50fd(0x1f7)][_0x1e50fd(0x225)])}
                            </div>
                        </div>
                    </div>

                    <div class="memoria-total">
                        <div class="memoria-total-value">${_0x1f91d0[_0x1e50fd(0x21f)]}</div>
                        <div class="memoria-total-per-m2">Custo Total dos Itens</div>
                    </div>
                </div>
            </div>
        `;}[voti_28_0x3629fe(0x1fc)](_0x3ef39a,_0x14881e){return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-list"></i> Itens do Modelo</div>
                <div class="memoria-items-grid">
                    ${map(_0x3ef39a,_0x31bac0=>{const _0x1f0056=voti_28_0x17f1,_0x397623=_0x31bac0[_0x1f0056(0x224)],_0x4a5bab=FormattingService[_0x1f0056(0x1f0)](_0x397623,_0x14881e);return html`
                            <div class="memoria-item-card">
                                <div class="item-display-content">
                                    <div class="item-display-title">${(_0x397623['order']??0x0)+0x1}. ${_0x4a5bab[_0x1f0056(0x218)]}</div>
                                    <div class="item-display-details">${_0x4a5bab[_0x1f0056(0x215)]}</div>
                                    <div class="item-display-results mt-2">
                                        <strong>Peso Total:</strong> ${_0x31bac0[_0x1f0056(0x227)]}kg |
                                        <strong>Custo Total:</strong> ${_0x31bac0['custoTotal']} |
                                        <strong>Custo/unidade:</strong> ${_0x31bac0[_0x1f0056(0x1fa)]}
                                    </div>
                                </div>
                            </div>
                        `;})}
                </div>
            </div>
        `;}[voti_28_0x3629fe(0x1f8)](_0x1e6fe5,_0x1105e0){const _0xa1d858=voti_28_0x3629fe;if(!_0x1e6fe5[_0xa1d858(0x202)]||_0x1e6fe5['rows'][_0xa1d858(0x228)]===0x0)return'';return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-bars"></i> Barras Metálicas (Densidade: ${_0x1105e0} kg/m³)</div>
                <table class="memoria-materials-table">
                    <thead><tr><th>Esp./Ø</th><th>Largura</th><th>Barras</th><th>Peso MP</th><th>Preço/kg</th><th>Custo</th></tr></thead>
                    <tbody>
                    ${map(_0x1e6fe5[_0xa1d858(0x202)],_0x9c4072=>html`
                        <tr>
                            <td>${_0x9c4072['esp']}</td><td>${_0x9c4072[_0xa1d858(0x1fe)]}</td><td>${_0x9c4072[_0xa1d858(0x21e)]}</td>
                            <td>${_0x9c4072[_0xa1d858(0x1f3)]} kg</td><td>${_0x9c4072['precoKg']}/kg</td><td class="custo-cell">${_0x9c4072[_0xa1d858(0x206)]}</td>
                        </tr>
                    `)}
                    </tbody>
                </table>
                <div style="text-align: right; font-weight: 600; color: #48c774;">Subtotal Barras: ${_0x1e6fe5['subtotal']}</div>
            </div>
        `;}[voti_28_0x3629fe(0x214)](_0x455d50){const _0x43869b=voti_28_0x3629fe;if(!_0x455d50[_0x43869b(0x202)]||_0x455d50[_0x43869b(0x202)][_0x43869b(0x228)]===0x0)return'';return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-layer-group"></i> Chapas para Degraus</div>
                <table class="memoria-materials-table">
                    <thead><tr><th>Tipo</th><th>Dimensões</th><th>Comp. (mm)</th><th>Qtd</th><th>Peso</th><th>Preço Mat.</th><th>Custo Material</th></tr></thead>
                    <tbody>
                    ${map(_0x455d50['rows'],_0x29d937=>html`
                        <tr>
                            <td><strong>${_0x29d937[_0x43869b(0x22d)]}</strong></td><td>${_0x29d937['dimensoes']}</td><td>${_0x29d937['comp']}</td>
                            <td>${_0x29d937[_0x43869b(0x20d)]}</td><td>${_0x29d937[_0x43869b(0x211)]} kg${_0x29d937['observacao']}</td><td>${_0x29d937[_0x43869b(0x209)]}/kg</td><td class="custo-cell">${_0x29d937[_0x43869b(0x206)]}</td>
                        </tr>
                    `)}
                    </tbody>
                </table>
                <div style="text-align: right; font-weight: 600; color: #ffdd57;">Subtotal Material Chapas: ${_0x455d50[_0x43869b(0x222)]}</div>
            </div>
        `;}[voti_28_0x3629fe(0x210)](_0x12fe99){const _0x24068a=voti_28_0x3629fe;return html`
            <div class="memoria-section">
                <div class="memoria-section-title"><i class="fas fa-tools"></i> Processos ${_0x12fe99[_0x24068a(0x1f6)]}</div>
                <div class="memoria-processes">
                    ${map(_0x12fe99['items'],_0x50da51=>html`
                        <div class="memoria-process-row">
                            <div>
                                <strong>${_0x50da51[_0x24068a(0x221)]}</strong>
                                <div class="memoria-process-calc">${_0x50da51['calculo']}</div>
                            </div>
                            <div>${_0x50da51['custo']}</div>
                        </div>
                    `)}
                    <div class="memoria-process-row" style="font-weight: 600;">
                        <div><strong>Total Processos</strong></div>
                        <div>${_0x12fe99['total']}</div>
                    </div>
                </div>
            </div>
        `;}}customElements[voti_28_0x3629fe(0x217)](voti_28_0x3629fe(0x213),CalculationMemory);