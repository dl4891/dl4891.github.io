const voti_36_0x4ea7fb=voti_36_0x3141;(function(_0x36c391,_0x37552e){const _0x38e924=voti_36_0x3141,_0x2aa3f5=_0x36c391();while(!![]){try{const _0x2efd7c=parseInt(_0x38e924(0x6a))/0x1+parseInt(_0x38e924(0x6c))/0x2*(parseInt(_0x38e924(0x6f))/0x3)+-parseInt(_0x38e924(0x7b))/0x4+-parseInt(_0x38e924(0xa1))/0x5*(parseInt(_0x38e924(0x80))/0x6)+parseInt(_0x38e924(0xa4))/0x7+-parseInt(_0x38e924(0x70))/0x8+-parseInt(_0x38e924(0x7e))/0x9;if(_0x2efd7c===_0x37552e)break;else _0x2aa3f5['push'](_0x2aa3f5['shift']());}catch(_0x65b88b){_0x2aa3f5['push'](_0x2aa3f5['shift']());}}}(voti_36_0x1fbc,0xd8c24));import{LitElement,html,css}from'lit';import{CONFIG,UF_DATA}from'../../shared/config.js';import{FormattingService}from'../../core/services/FormattingService.js';function voti_36_0x3141(_0x1039d7,_0x498af3){const _0x1fbc09=voti_36_0x1fbc();return voti_36_0x3141=function(_0x3141c7,_0x29a9d6){_0x3141c7=_0x3141c7-0x64;let _0x44ae58=_0x1fbc09[_0x3141c7];return _0x44ae58;},voti_36_0x3141(_0x1039d7,_0x498af3);}export class PricingTemplatePanel extends LitElement{static [voti_36_0x4ea7fb(0x72)]=css`
        :host { display: block; }
        .pricing-panel-content {
            padding: 1.5rem;
            background-color: #fff;
        }
        .context-section {
            padding-bottom: 1.5rem;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #dbdbdb;
        }
        .columns {
            margin-left: -0.75rem;
            margin-right: -0.75rem;
        }
        .column {
            padding: 0.75rem;
        }
        .result-section {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #dbdbdb;
        }
        .result-box {
            background-color: #f5f5f5;
            padding: 1rem;
            border-radius: 6px;
        }
        .result-final {
            background-color: #d4edda; /* success-light */
            border: 1px solid #c3e6cb;
        }
        .is-readonly {
            background-color: #f5f5f5 !important;
            cursor: not-allowed;
            color: #7a7a7a;
        }
        /* Adicionado para garantir que os campos de IPI tenham margem quando fora do box */
        .field.ipi-field {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px dashed #dbdbdb;
        }
    `;static [voti_36_0x4ea7fb(0x7d)]={'template':{'type':Object},'masterUfDestino':{'type':String}};constructor(){const _0xbcb8a0=voti_36_0x4ea7fb;super(),this[_0xbcb8a0(0xa5)]={},this[_0xbcb8a0(0x8e)]='';}[voti_36_0x4ea7fb(0xa7)](){const _0x29d319=voti_36_0x4ea7fb,_0x48e660=this['shadowRoot'][_0x29d319(0x78)]('form');if(!_0x48e660)return null;const _0x4f2e8b=CONFIG['PRICING'][_0x29d319(0x92)],_0x17ee24=(_0x3eb1e9,_0x2a686b)=>{const _0x4fc2cc=_0x29d319,_0x5ebacd=_0x48e660[_0x4fc2cc(0x78)](_0x3eb1e9);if(!_0x5ebacd)return _0x2a686b;const _0x38c49d=parseFloat(_0x5ebacd[_0x4fc2cc(0x87)]);return isNaN(_0x38c49d)?_0x2a686b:_0x38c49d;},_0x573f95={'tipoConfiguracao':_0x48e660[_0x29d319(0x78)](_0x29d319(0x73))[_0x29d319(0x87)],'lucroLiquido':_0x17ee24(_0x29d319(0x64),_0x4f2e8b[_0x29d319(0x98)]),'despesasFixas':_0x17ee24(_0x29d319(0x91),_0x4f2e8b[_0x29d319(0x9a)]),'comissoesInternas':_0x17ee24('.template-comissoes',_0x4f2e8b[_0x29d319(0x86)]),'comissoesRepres':_0x17ee24(_0x29d319(0x74),_0x4f2e8b['comissoesRepres']),'despesasFinanceiras':_0x17ee24(_0x29d319(0x88),_0x4f2e8b[_0x29d319(0x66)]),'csllIrpj':_0x17ee24(_0x29d319(0x83),_0x4f2e8b[_0x29d319(0x75)]),'icmsMaterial':_0x17ee24('.template-icms-material',_0x4f2e8b[_0x29d319(0x6b)]),'ipiMaterial':_0x17ee24(_0x29d319(0x89),_0x4f2e8b[_0x29d319(0x7c)]),'ipiRevenda':_0x17ee24(_0x29d319(0x7a),_0x4f2e8b['ipiRevenda']),'ipiVendaFinal':_0x17ee24('.template-ipi-venda',_0x4f2e8b[_0x29d319(0xa8)]),'fretePerc':_0x17ee24(_0x29d319(0x71),_0x4f2e8b[_0x29d319(0x65)]),'freteValor':_0x17ee24('.template-frete-valor',_0x4f2e8b[_0x29d319(0x76)]),'stCompraQtde':_0x17ee24(_0x29d319(0x9e),_0x4f2e8b[_0x29d319(0x84)]),'stCompraUnit':_0x17ee24('.template-st-unit',_0x4f2e8b[_0x29d319(0x90)]),'taxaEnergiaQtde':_0x17ee24('.template-energia-qtde',_0x4f2e8b[_0x29d319(0x94)]),'taxaEnergiaUnit':_0x17ee24(_0x29d319(0x8a),_0x4f2e8b[_0x29d319(0x8b)]),'vendaEstaleiro':_0x48e660[_0x29d319(0x78)](_0x29d319(0x6d))[_0x29d319(0x87)]===_0x29d319(0x68),'vendaExportacao':_0x48e660[_0x29d319(0x78)](_0x29d319(0x8f))[_0x29d319(0x87)]===_0x29d319(0x68)};return _0x573f95;}['_handleCalculateClick'](){const _0x2eda8e=voti_36_0x4ea7fb,_0x5daeea=this[_0x2eda8e(0xa7)]();_0x5daeea&&this[_0x2eda8e(0xa0)](new CustomEvent(_0x2eda8e(0x96),{'detail':{'templateId':this[_0x2eda8e(0xa5)]['id'],'formData':_0x5daeea},'bubbles':!![],'composed':!![]}));}[voti_36_0x4ea7fb(0x67)](){const _0x553446=voti_36_0x4ea7fb;this[_0x553446(0xa0)](new CustomEvent(_0x553446(0x79),{'detail':{'templateId':this[_0x553446(0xa5)]['id']},'bubbles':!![],'composed':!![]}));}[voti_36_0x4ea7fb(0x97)](){const _0x5a3ffe=voti_36_0x4ea7fb;if(!this[_0x5a3ffe(0xa5)]['id'])return html``;const _0x7b077=this[_0x5a3ffe(0xa5)][_0x5a3ffe(0x99)]||{},_0x5badfe=CONFIG[_0x5a3ffe(0x9b)][_0x5a3ffe(0x92)],_0x113c43=_0x7b077[_0x5a3ffe(0x7c)]!==undefined?_0x7b077[_0x5a3ffe(0x7c)]:_0x5badfe[_0x5a3ffe(0x7c)],_0x8203df=_0x7b077['ipiRevenda']!==undefined?_0x7b077[_0x5a3ffe(0x9c)]:_0x5badfe[_0x5a3ffe(0x9c)],_0x5cea9a=_0x7b077['ipiVendaFinal']!==undefined?_0x7b077[_0x5a3ffe(0xa8)]:_0x5badfe['ipiVendaFinal'];return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <div class="pricing-panel-content">
                <form class="template-pricing-form" data-template-id="${this['template']['id']}">

                    <div class="context-section">
                        <div class="columns is-multiline">
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Tipo de Configuração *</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-tipo-config" required>
                                                <option value="">Selecione o tipo...</option>
                                                <option value="grade" ?selected=${_0x7b077['tipoConfiguracao']===_0x5a3ffe(0x6e)}>Venda de Grade ST</option>
                                                <option value="grampo" ?selected=${_0x7b077[_0x5a3ffe(0xa6)]==='grampo'}>Vendas de Grampo ST</option>
                                                <option value="telas" ?selected=${_0x7b077['tipoConfiguracao']===_0x5a3ffe(0x69)}>Telas/Revenda/Consumo ST</option>
                                                <option value="naoContribuinte" ?selected=${_0x7b077[_0x5a3ffe(0xa6)]==='naoContribuinte'}>Venda para Não Contribuinte</option>
                                                <option value="consumidorFinal" ?selected=${_0x7b077[_0x5a3ffe(0xa6)]===_0x5a3ffe(0x8d)}>Venda para Consumidor Final</option>
                                                <option value="revendaNormal" ?selected=${_0x7b077['tipoConfiguracao']==='revendaNormal'}>Venda/Revenda Normal (padrão)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">UF de Destino *</label>
                                    <div class="control">
                                        <input class="input is-readonly" type="text" readonly .value=${this[_0x5a3ffe(0x8e)]||'N/A'}>
                                    </div>
                                    <p class="help">Definido na aba "Proposta".</p>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Venda para Estaleiro</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-venda-estaleiro">
                                                <option value="false" ?selected=${!_0x7b077[_0x5a3ffe(0x85)]}>Não</option>
                                                <option value="true" ?selected=${_0x7b077[_0x5a3ffe(0x85)]}>Sim</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half-tablet is-one-quarter-desktop">
                                <div class="field">
                                    <label class="label">Venda para Exportação</label>
                                    <div class="control">
                                        <div class="select is-fullwidth">
                                            <select class="template-venda-exportacao">
                                                <option value="false" ?selected=${!_0x7b077['vendaExportacao']}>Não</option>
                                                <option value="true" ?selected=${_0x7b077[_0x5a3ffe(0xa2)]}>Sim</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-primary">
                                <i class="fas fa-receipt mr-2"></i>Custos e Fatores de Entrada
                            </h6>
                            <div class="field">
                                <label class="label">IPI Material (%) <span class="tag is-info is-light is-small">Industrialização</span></label>
                                <input class="input template-ipi-material" type="number" step="0.01" min="0" max="100" value="${_0x113c43}">
                            </div>
                            <div class="field">
                                <label class="label">ICMS Material (%)</label>
                                <input class="input template-icms-material" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x6b)]!==undefined?_0x7b077[_0x5a3ffe(0x6b)]:_0x5badfe[_0x5a3ffe(0x6b)]}">
                            </div>
                            <div class="field">
                                <label class="label">IPI na Revenda (%) <span class="tag is-warning is-light is-small">Revenda</span></label>
                                <input class="input template-ipi-revenda" type="number" step="0.01" min="0" max="100" value="${_0x8203df}">
                            </div>
                            <div class="field">
                                <label class="label">ST Compra - Quantidade</label>
                                <input class="input template-st-qtde" type="number" step="0.01" min="0"
                                        value="${_0x7b077[_0x5a3ffe(0x84)]!==undefined?_0x7b077[_0x5a3ffe(0x84)]:_0x5badfe[_0x5a3ffe(0x84)]}">
                            </div>
                            <div class="field">
                                <label class="label">ST Compra - Valor Unitário (R$)</label>
                                <input class="input template-st-unit" type="number" step="0.01" min="0"
                                        value="${_0x7b077[_0x5a3ffe(0x90)]!==undefined?_0x7b077[_0x5a3ffe(0x90)]:_0x5badfe[_0x5a3ffe(0x90)]}">
                            </div>
                            <div class="field">
                                <label class="label">Taxa Energia - Quantidade</label>
                                <input class="input template-energia-qtde" type="number" step="0.01" min="0"
                                        value="${_0x7b077[_0x5a3ffe(0x94)]!==undefined?_0x7b077[_0x5a3ffe(0x94)]:_0x5badfe[_0x5a3ffe(0x94)]}">
                            </div>
                            <div class="field">
                                <label class="label">Taxa Energia - Valor Unitário (R$)</label>
                                <input class="input template-energia-unit" type="number" step="0.01" min="0"
                                        value="${_0x7b077[_0x5a3ffe(0x8b)]!==undefined?_0x7b077[_0x5a3ffe(0x8b)]:_0x5badfe[_0x5a3ffe(0x8b)]}">
                            </div>
                        </div>

                        <div class="column">
                            <h6 class="subtitle is-6 has-text-success">
                                <i class="fas fa-chart-pie mr-2"></i>Composição do Preço de Venda
                            </h6>
                            <div class="field">
                                <label class="label">Lucro Líquido (%)</label>
                                <input class="input template-lucro" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x98)]!==undefined?_0x7b077[_0x5a3ffe(0x98)]:_0x5badfe[_0x5a3ffe(0x98)]}">
                            </div>
                            <div class="field">
                                <label class="label">Despesas Fixas (%)</label>
                                <input class="input template-despesas" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x9a)]!==undefined?_0x7b077[_0x5a3ffe(0x9a)]:_0x5badfe[_0x5a3ffe(0x9a)]}">
                            </div>
                            <div class="field">
                                <label class="label">Comissões Internas (%)</label>
                                <input class="input template-comissoes" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x86)]!==undefined?_0x7b077['comissoesInternas']:_0x5badfe['comissoesInternas']}">
                            </div>
                            <div class="field">
                                <label class="label">Comissões Representantes (%)</label>
                                <input class="input template-comissoes-repres" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x9d)]!==undefined?_0x7b077[_0x5a3ffe(0x9d)]:_0x5badfe[_0x5a3ffe(0x9d)]}">
                            </div>
                            <div class="field">
                                <label class="label">Despesas Financeiras (%)</label>
                                <input class="input template-despesas-financeiras" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x66)]!==undefined?_0x7b077[_0x5a3ffe(0x66)]:_0x5badfe[_0x5a3ffe(0x66)]}">
                            </div>
                            <div class="field">
                                <label class="label">CSLL/IRPJ (%)</label>
                                <input class="input template-csll" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x75)]!==undefined?_0x7b077['csllIrpj']:_0x5badfe[_0x5a3ffe(0x75)]}">
                            </div>

                            <div class="field ipi-field">
                                <label class="label">Frete Percentual (%)</label>
                                <input class="input template-frete-perc" type="number" step="0.01" min="0" max="100"
                                        value="${_0x7b077[_0x5a3ffe(0x65)]!==undefined?_0x7b077[_0x5a3ffe(0x65)]:_0x5badfe[_0x5a3ffe(0x65)]}">
                            </div>
                            <div class="field">
                                <label class="label">Frete Valor Fixo (R$)</label>
                                <input class="input template-frete-valor" type="number" step="0.01" min="0"
                                        value="${_0x7b077['freteValor']!==undefined?_0x7b077['freteValor']:_0x5badfe[_0x5a3ffe(0x76)]}">
                            </div>
                            <div class="field">
                                <label class="label">IPI Venda Final (%) <span class="tag is-success is-light is-small">Venda</span></label>
                                <input class="input template-ipi-venda" type="number" step="0.01" min="0" max="100" value="${_0x5cea9a}">
                            </div>
                        </div>
                    </div>

                    <div class="result-section">
                        ${this[_0x5a3ffe(0xa5)][_0x5a3ffe(0x82)]?html`
                            <div class="result-box result-final">
                                <h6 class="subtitle is-6">Resultado do Cálculo</h6>
                                <div class="level">
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Preço de Venda (c/ DIFAL)</p>
                                            <p class="title is-5">${FormattingService['formatCurrency'](_0x7b077[_0x5a3ffe(0x8c)][_0x5a3ffe(0xa3)])}</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Preço por m²</p>
                                            <p class="title is-5">${FormattingService['formatCurrency'](this[_0x5a3ffe(0xa5)][_0x5a3ffe(0x77)]||0x0)}</p>
                                        </div>
                                    </div>
                                    <div class="level-item has-text-centered">
                                        <div>
                                            <p class="heading">Valor Final (c/ IPI+ST)</p>
                                            <p class="title is-4">${FormattingService[_0x5a3ffe(0x81)](_0x7b077[_0x5a3ffe(0x8c)][_0x5a3ffe(0x93)])}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `:''}

                        <div class="field is-grouped mt-4">
                            <div class="control">
                                <button type="button" class="button is-primary" @click=${this[_0x5a3ffe(0x95)]}>
                                    <span class="icon"><i class="fas fa-calculator"></i></span>
                                    <span>${this[_0x5a3ffe(0xa5)][_0x5a3ffe(0x82)]?_0x5a3ffe(0x7f):'Calcular\x20Preço'}</span>
                                </button>
                            </div>
                            <div class="control">
                                <button type="button" class="button is-info is-outlined" @click=${this[_0x5a3ffe(0x67)]}>
                                    <span class="icon"><i class="fas fa-copy"></i></span>
                                    <span>Copiar Configuração</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        `;}}customElements[voti_36_0x4ea7fb(0x9f)]('pricing-template-panel',PricingTemplatePanel);function voti_36_0x1fbc(){const _0x591f36=['taxaEnergiaUnit','result','consumidorFinal','masterUfDestino','.template-venda-exportacao','stCompraUnit','.template-despesas','DEFAULTS','B102_valorFinalComIPIST','taxaEnergiaQtde','_handleCalculateClick','calculate-pricing','render','lucroLiquido','pricingConfig','despesasFixas','PRICING','ipiRevenda','comissoesRepres','.template-st-qtde','define','dispatchEvent','1121030qbOuER','vendaExportacao','B97_precoVendaComDifal','12002900OZsMjG','template','tipoConfiguracao','_extractFormData','ipiVendaFinal','.template-lucro','fretePerc','despesasFinanceiras','_handleCopyClick','true','telas','801149NOnPAQ','icmsMaterial','4PfVkCi','.template-venda-estaleiro','grade','2093379SwbFIB','6091720MQCoXy','.template-frete-perc','styles','.template-tipo-config','.template-comissoes-repres','csllIrpj','freteValor','pricePerM2','querySelector','copy-config','.template-ipi-revenda','427060yukItj','ipiMaterial','properties','7291125tdxrCu','Recalcular\x20Preço','36EooQvl','formatCurrency','hasResult','.template-csll','stCompraQtde','vendaEstaleiro','comissoesInternas','value','.template-despesas-financeiras','.template-ipi-material','.template-energia-unit'];voti_36_0x1fbc=function(){return _0x591f36;};return voti_36_0x1fbc();}