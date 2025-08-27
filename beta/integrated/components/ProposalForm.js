function voti_37_0x2116(){const _0x20e48e=['validUntil','ufDestino','1213977ucRzNC','566971sREhiI','target','map','headerLine1','quoteNumber','1213855PPZkEd','12MGkbNS','clientName','sellerContact','deliveryTime','_handleInput','update-logo','Nenhuma\x20imagem\x20selecionada.','headerLine2','shippingInfo','sellerName','13645161wkvdpJ','2ySiuwy','render','proposal-form','update-commercial-data','963510SZYEOq','9363296SzSvgy','none','properties','dispatchEvent','_handleLogoChange','Logotipo\x20carregado','commercialData','paymentTerms','clientIdentifier','headerLine3','logoBase64','files','7087633gfssaE','keys','value','block'];voti_37_0x2116=function(){return _0x20e48e;};return voti_37_0x2116();}const voti_37_0x40fc3e=voti_37_0x4f21;(function(_0xbfc162,_0x71eb5f){const _0x5e60f9=voti_37_0x4f21,_0x12de04=_0xbfc162();while(!![]){try{const _0x14e4bb=parseInt(_0x5e60f9(0x1a0))/0x1+parseInt(_0x5e60f9(0x1b1))/0x2*(parseInt(_0x5e60f9(0x19f))/0x3)+parseInt(_0x5e60f9(0x1a6))/0x4*(-parseInt(_0x5e60f9(0x1a5))/0x5)+-parseInt(_0x5e60f9(0x1b5))/0x6+parseInt(_0x5e60f9(0x199))/0x7+parseInt(_0x5e60f9(0x1b6))/0x8+-parseInt(_0x5e60f9(0x1b0))/0x9;if(_0x14e4bb===_0x71eb5f)break;else _0x12de04['push'](_0x12de04['shift']());}catch(_0x1669fc){_0x12de04['push'](_0x12de04['shift']());}}}(voti_37_0x2116,0xb6fde));function voti_37_0x4f21(_0x1ecf21,_0x3718db){const _0x2116ce=voti_37_0x2116();return voti_37_0x4f21=function(_0x4f2102,_0x5b892c){_0x4f2102=_0x4f2102-0x191;let _0xd80190=_0x2116ce[_0x4f2102];return _0xd80190;},voti_37_0x4f21(_0x1ecf21,_0x3718db);}import{LitElement,html,css}from'lit';import{UF_DATA}from'../../shared/config.js';export class ProposalForm extends LitElement{static ['styles']=css`
        :host {
            display: block;
        }
        .form-section {
            margin-bottom: 1.5rem;
        }
        .bar-column {
            padding-right: 1.5rem;
            margin-right: 1.5rem;
            border-right: 1px solid #eee;
        }
    `;static [voti_37_0x40fc3e(0x1b8)]={'commercialData':{'type':Object}};constructor(){super(),this['commercialData']={};}[voti_37_0x40fc3e(0x1aa)](_0x4b74ac,_0xa7ef81){const _0x3ce71e=voti_37_0x40fc3e,_0x11aeed=_0xa7ef81[_0x3ce71e(0x1a1)][_0x3ce71e(0x19b)];this['dispatchEvent'](new CustomEvent(_0x3ce71e(0x1b4),{'detail':{'field':_0x4b74ac,'value':_0x11aeed},'bubbles':!![],'composed':!![]}));}[voti_37_0x40fc3e(0x191)](_0x11e145){const _0xc218ea=voti_37_0x40fc3e,_0x1630b3=_0x11e145[_0xc218ea(0x1a1)][_0xc218ea(0x198)][0x0];this[_0xc218ea(0x1b9)](new CustomEvent('update-logo',{'detail':{'file':_0x1630b3},'bubbles':!![],'composed':!![]})),_0x11e145[_0xc218ea(0x1a1)][_0xc218ea(0x19b)]=null;}['_handleRemoveLogo'](){const _0x196965=voti_37_0x40fc3e;this['dispatchEvent'](new CustomEvent(_0x196965(0x1ab),{'detail':{'file':null},'bubbles':!![],'composed':!![]}));}[voti_37_0x40fc3e(0x1b2)](){const _0x2f59a5=voti_37_0x40fc3e,_0x2262dd=this[_0x2f59a5(0x193)]||{},_0x5bb17e=Object[_0x2f59a5(0x19a)](UF_DATA);return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

            <form id="proposta-form">
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-building mr-2"></i>Dados da Empresa (Cabeçalho da Proposta)</h6>
                    <div class="columns">
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 1 (Nome)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${_0x2262dd[_0x2f59a5(0x1a3)]||''} @input=${_0x412bdb=>this['_handleInput'](_0x2f59a5(0x1a3),_0x412bdb)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 2 (Endereço)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${_0x2262dd['headerLine2']||''} @input=${_0x6925fe=>this['_handleInput'](_0x2f59a5(0x1ad),_0x6925fe)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Linha 3 (CNPJ, IE, etc)</label>
                                <div class="control">
                                    <input class="input" type="text" .value=${_0x2262dd[_0x2f59a5(0x196)]||''} @input=${_0x1a67b5=>this[_0x2f59a5(0x1aa)](_0x2f59a5(0x196),_0x1a67b5)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-image mr-2"></i>Logotipo da Empresa (para PDF)</h6>
                    <div class="columns is-vcentered">
                        <div class="column is-two-thirds">
                            <div class="field">
                                <div class="file has-name is-fullwidth">
                                    <label class="file-label">
                                        <input class="file-input" type="file" accept="image/png" @change=${this[_0x2f59a5(0x191)]}>
                                        <span class="file-cta">
                                            <span class="file-icon"><i class="fas fa-upload"></i></span>
                                            <span class="file-label">Escolher imagem PNG…</span>
                                        </span>
                                        <span class="file-name">${_0x2262dd[_0x2f59a5(0x197)]?_0x2f59a5(0x192):_0x2f59a5(0x1ac)}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div id="logo-preview-container" style="display: ${_0x2262dd[_0x2f59a5(0x197)]?_0x2f59a5(0x19c):_0x2f59a5(0x1b7)};">
                                <img src="${_0x2262dd['logoBase64']||''}" alt="Pré-visualização do Logotipo" style="max-height: 60px; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">
                                <button type="button" class="button is-small is-danger is-light ml-2" @click=${this['_handleRemoveLogo']}>Remover</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-info-circle mr-2"></i>Informações do Orçamento</h6>
                    <div class="columns">
                        <div class="column bar-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Dados do Cliente</h6>
                            <div class="field">
                                <label class="label">Nome/Razão Social *</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: AÇO S/A" required .value=${_0x2262dd[_0x2f59a5(0x1a7)]||''} @input=${_0x474b2e=>this[_0x2f59a5(0x1aa)](_0x2f59a5(0x1a7),_0x474b2e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">CNPJ / CPF</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 88.416.482/0001-06" .value=${_0x2262dd[_0x2f59a5(0x195)]||''} @input=${_0x3ae99f=>this['_handleInput'](_0x2f59a5(0x195),_0x3ae99f)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">UF de Destino *</label>
                                <div class="control">
                                    <div class="select is-fullwidth">
                                        <select required .value=${_0x2262dd[_0x2f59a5(0x19e)]||''} @change=${_0x80e12b=>this[_0x2f59a5(0x1aa)](_0x2f59a5(0x19e),_0x80e12b)}>
                                            <option value="">Selecione a UF...</option>
                                            ${_0x5bb17e[_0x2f59a5(0x1a2)](_0xbad1fd=>html`<option value="${_0xbad1fd}">${_0xbad1fd}</option>`)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Dados do Orçamento</h6>
                            <div class="field">
                                <label class="label">Número do Orçamento *</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 7809" required .value=${_0x2262dd[_0x2f59a5(0x1a4)]||''} @input=${_0x5bb25d=>this[_0x2f59a5(0x1aa)]('quoteNumber',_0x5bb25d)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Válido Até</label>
                                <div class="control">
                                    <input class="input" type="date" .value=${(_0x2262dd[_0x2f59a5(0x19d)]||'')['split']('T')[0x0]} @input=${_0x167787=>this[_0x2f59a5(0x1aa)]('validUntil',_0x167787)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Vendedor</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Nome do vendedor" .value=${_0x2262dd[_0x2f59a5(0x1af)]||''} @input=${_0x3d8c2e=>this[_0x2f59a5(0x1aa)]('sellerName',_0x3d8c2e)}>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Contato do Vendedor</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="(12) 3456 7890" .value=${_0x2262dd['sellerContact']||''} @input=${_0x12bba9=>this['_handleInput'](_0x2f59a5(0x1a8),_0x12bba9)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-handshake mr-2"></i>Termos Comerciais</h6>
                    <div class="columns">
                        <div class="column bar-column">
                            <div class="field">
                                <label class="label">Prazo de Entrega</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 15 a 18 dias úteis" .value=${_0x2262dd['deliveryTime']||''} @input=${_0x13288c=>this[_0x2f59a5(0x1aa)](_0x2f59a5(0x1a9),_0x13288c)}>
                                </div>
                            </div>
                        </div>
                        <div class="column bar-column">
                            <div class="field">
                                <label class="label">Condições de Pagamento</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: 07 DDL (sujeito a análise de crédito)" .value=${_0x2262dd[_0x2f59a5(0x194)]||''} @input=${_0x4f1c93=>this[_0x2f59a5(0x1aa)](_0x2f59a5(0x194),_0x4f1c93)}>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="field">
                                <label class="label">Frete</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Ex: FOB (Material a retirar)" .value=${_0x2262dd[_0x2f59a5(0x1ae)]||''} @input=${_0x52ce36=>this['_handleInput']('shippingInfo',_0x52ce36)}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `;}}customElements['define'](voti_37_0x40fc3e(0x1b3),ProposalForm);