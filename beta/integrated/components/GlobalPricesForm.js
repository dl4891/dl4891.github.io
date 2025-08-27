const voti_34_0x95f3c0=voti_34_0x213a;(function(_0x24e021,_0x19da5e){const _0x497064=voti_34_0x213a,_0x5d8f7e=_0x24e021();while(!![]){try{const _0x5cb2f7=parseInt(_0x497064(0x19f))/0x1+-parseInt(_0x497064(0x17f))/0x2+-parseInt(_0x497064(0x199))/0x3+parseInt(_0x497064(0x18e))/0x4*(-parseInt(_0x497064(0x187))/0x5)+-parseInt(_0x497064(0x19d))/0x6*(parseInt(_0x497064(0x183))/0x7)+parseInt(_0x497064(0x188))/0x8+-parseInt(_0x497064(0x189))/0x9*(-parseInt(_0x497064(0x185))/0xa);if(_0x5cb2f7===_0x19da5e)break;else _0x5d8f7e['push'](_0x5d8f7e['shift']());}catch(_0x461fad){_0x5d8f7e['push'](_0x5d8f7e['shift']());}}}(voti_34_0x13f4,0x663a1));import{LitElement,html,css}from'lit';export class GlobalPricesForm extends LitElement{static [voti_34_0x95f3c0(0x17e)]=css`
        :host { display: block; }
        .form-section { margin-bottom: 1.5rem; padding: 1.25rem; border: 1px solid #dbdbdb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .form-section .subtitle { border-bottom: 1px solid #eee; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .cost-column { padding-right: 1.5rem; margin-right: 1.5rem; border-right: 1px solid #eee; }
        .cost-column:last-child { border-right: none; margin-right: 0; padding-right: 0.75rem; }
    `;static ['properties']={'prices':{'type':Object},'materialType':{'type':String},'roundingConfig':{'type':Object},'totalWeightCalcMethod':{'type':String}};constructor(){const _0x516766=voti_34_0x95f3c0;super(),this[_0x516766(0x17b)]={},this[_0x516766(0x18a)]='AÇO\x20CARBONO',this[_0x516766(0x19b)]={'method':_0x516766(0x1a0),'decimals':0x2},this[_0x516766(0x17c)]=_0x516766(0x19c);}['_handleMaterialTypeChange'](_0x5cef2f){const _0x3910c6=voti_34_0x95f3c0;this['dispatchEvent'](new CustomEvent(_0x3910c6(0x196),{'detail':{'materialType':_0x5cef2f['target'][_0x3910c6(0x198)]},'bubbles':!![],'composed':!![]}));}['_handleSave'](_0x29b9fd){const _0x3253e2=voti_34_0x95f3c0;_0x29b9fd[_0x3253e2(0x18b)]();const _0x3a6850=this[_0x3253e2(0x18c)][_0x3253e2(0x19e)](_0x3253e2(0x192));_0x3a6850[_0x3253e2(0x190)]()?this[_0x3253e2(0x191)](new CustomEvent(_0x3253e2(0x17d),{'bubbles':!![],'composed':!![]})):_0x3a6850['reportValidity']();}[voti_34_0x95f3c0(0x1a1)](){const _0x34b48f=voti_34_0x95f3c0;this[_0x34b48f(0x191)](new CustomEvent(_0x34b48f(0x186),{'bubbles':!![],'composed':!![]}));}[voti_34_0x95f3c0(0x18f)](){const _0x28a3b0=voti_34_0x95f3c0,_0x35d3db=this[_0x28a3b0(0x17b)]||{},_0x683515=this['roundingConfig']||{'method':'none','decimals':0x2},_0xe35df3=this['totalWeightCalcMethod']||'component',_0x1aca18=_0x683515['method']===_0x28a3b0(0x1a0);return html`
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <form id="precos-form" @submit=${this[_0x28a3b0(0x18d)]}>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-file-alt mr-2"></i>Configurações da Proposta</h6>
                    <div class="field">
                        <label class="label">Tipo de Material (para PDF)</label>
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select id="material-type-select" .value=${this['materialType']} @change=${this['_handleMaterialTypeChange']}>
                                    <option value="AÇO CARBONO">Aço Carbono</option>
                                    <option value="AÇO INOX">Aço Inox</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-dollar-sign mr-2"></i>Custos Globais</h6>
                    <div class="columns">
                        <div class="column cost-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Matéria Prima (R$/kg)</h6>
                            <div class="field"><label class="label">Barra Chata Padrão *</label><div class="control"><input id="preco-chata-padrao" class="input" type="number" step="any" min="0" required .value=${_0x35d3db['chataPadrao']||''}></div></div>
                            <div class="field"><label class="label">Barra Redonda Padrão *</label><div class="control"><input id="preco-redonda-padrao" class="input" type="number" step="any" min="0" required .value=${_0x35d3db['redondaPadrao']||''}></div></div>
                            <div class="field"><label class="label">Chapa Lateral Padrão *</label><div class="control"><input id="preco-chapa-lateral-padrao" class="input" type="number" step="any" min="0" required .value=${_0x35d3db[_0x28a3b0(0x19a)]||''}></div></div>
                            <div class="field"><label class="label">Chapa Xadrez Padrão *</label><div class="control"><input id="preco-chapa-xadrez-padrao" class="input" type="number" step="any" min="0" required .value=${_0x35d3db[_0x28a3b0(0x194)]||''}></div></div>
                        </div>
                        <div class="column cost-column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Serviços (R$/kg)</h6>
                            <div class="field"><label class="label">Corte Chapa Lateral *</label><div class="control"><input id="preco-corte-chapa-lateral" class="input" type="number" step="any" min="0" required .value=${_0x35d3db[_0x28a3b0(0x184)]||''}></div></div>
                            <div class="field"><label class="label">Corte+Dobra Chapa Xadrez *</label><div class="control"><input id="preco-corte-dobra-chapa-xadrez" class="input" type="number" step="any" min="0" required .value=${_0x35d3db['corteDobraChpaXadrez']||''}></div></div>
                        </div>
                        <div class="column">
                            <h6 class="subtitle is-6 has-text-grey-dark">Processos (R$/kg)</h6>
                            <div class="field"><label class="label">Mão de Obra *</label><div class="control"><input id="preco-mao-obra" class="input" type="number" step="any" min="0" required .value=${_0x35d3db[_0x28a3b0(0x195)]||''}></div></div>
                            <div class="field"><label class="label">Galvanização</label><div class="control"><input id="preco-galvanizacao" class="input" type="number" step="any" min="0" .value=${_0x35d3db[_0x28a3b0(0x197)]||''}></div></div>
                        </div>
                    </div>
                </div>
                <div class="box form-section">
                    <h6 class="subtitle is-6"><i class="fas fa-calculator mr-2"></i>Configurações de Cálculo de Peso</h6>
                    <div class="columns">
                        <div class="column is-half">
                            <div class="field">
                                <label class="label">Método de Cálculo de Peso Total</label>
                                <div class="control">
                                    <label class="radio"><input type="radio" name="total-weight-calc-method" value="component" .checked=${_0xe35df3===_0x28a3b0(0x19c)}> Por Componente Total (Padrão)</label><br>
                                    <label class="radio"><input type="radio" name="total-weight-calc-method" value="unit" .checked=${_0xe35df3===_0x28a3b0(0x182)}> Por Unidade Multiplicada</label>
                                </div>
                            </div>
                        </div>
                        <div class="column is-half">
                            <div class="columns is-mobile">
                                <div class="column is-8">
                                    <div class="field">
                                        <label class="label">Tipo de Arredondamento</label>
                                        <div class="control"><div class="select is-fullwidth"><select id="rounding-method" .value=${_0x683515[_0x28a3b0(0x193)]}>
                                            <option value="none">Nenhum</option>
                                            <option value="round">Padrão (Matemático)</option>
                                            <option value="ceil">Para Cima (Teto)</option>
                                        </select></div></div>
                                    </div>
                                </div>
                                <div class="column is-4">
                                    <div class="field"><label class="label">Decimais</label><div class="control"><input id="rounding-decimals" class="input" type="number" step="1" min="0" max="4" .value=${_0x683515[_0x28a3b0(0x180)]} ?disabled=${_0x1aca18}></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control"><button type="submit" class="button is-primary is-medium"><span class="icon"><i class="fas fa-save"></i></span><span>Salvar Preços e Configurações</span></button></div>
                    <div class="control"><button type="button" @click=${this[_0x28a3b0(0x1a1)]} class="button is-light is-medium"><span>Resetar</span></button></div>
                </div>
            </form>
        `;}}customElements['define'](voti_34_0x95f3c0(0x181),GlobalPricesForm);function voti_34_0x213a(_0x59f413,_0x33e10e){const _0x13f4fd=voti_34_0x13f4();return voti_34_0x213a=function(_0x213aba,_0x47e351){_0x213aba=_0x213aba-0x17b;let _0x2fcc6d=_0x13f4fd[_0x213aba];return _0x2fcc6d;},voti_34_0x213a(_0x59f413,_0x33e10e);}function voti_34_0x13f4(){const _0x590644=['reset-global-prices','35805ncGRAg','3511528vHKofi','549XobLul','materialType','preventDefault','shadowRoot','_handleSave','384TxcliI','render','checkValidity','dispatchEvent','form','method','chapaXadrezPadrao','maoObra','material-type-change','galvanizacao','value','2139258IvQwTh','chapaLateralPadrao','roundingConfig','component','4296nbiSmM','querySelector','418621NHMdJU','none','_handleReset','prices','totalWeightCalcMethod','save-global-prices','styles','79336igZXHB','decimals','global-prices-form','unit','3066wXiSfG','corteChpaLateral','215570FZBibT'];voti_34_0x13f4=function(){return _0x590644;};return voti_34_0x13f4();}