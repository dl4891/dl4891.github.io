import { FormattingService } from "../core/services/FormattingService.js";
import { NOTIFICATION_TYPES } from "../shared/config.js";

export class PriceController {
    constructor(budgetStore, notificationManager) {
        this.store = budgetStore;
        this.notifications = notificationManager;
    }

    saveGlobalPrices() {
        const formElement = window.app.globalPricesFormComponent.shadowRoot.querySelector('form');
        if (!window.app.validator.validateForm(formElement)) {
            this.notifications.show("Corrija os erros no formulário de preços globais", NOTIFICATION_TYPES.WARNING);
            return;
        }
        const pricesData = {
            maoObra: formElement.querySelector("#preco-mao-obra").value,
            galvanizacao: formElement.querySelector("#preco-galvanizacao").value,
            chataPadrao: formElement.querySelector("#preco-chata-padrao").value,
            redondaPadrao: formElement.querySelector("#preco-redonda-padrao").value,
            chapaLateralPadrao: formElement.querySelector("#preco-chapa-lateral-padrao").value,
            chapaXadrezPadrao: formElement.querySelector("#preco-chapa-xadrez-padrao").value,
            corteChpaLateral: formElement.querySelector("#preco-corte-chapa-lateral").value,
            corteDobraChpaXadrez: formElement.querySelector("#preco-corte-dobra-chapa-xadrez").value,
            roundingMethod: formElement.querySelector("#rounding-method").value,
            roundingDecimals: formElement.querySelector("#rounding-decimals").value,
            totalWeightCalcMethod: formElement.querySelector('input[name="total-weight-calc-method"]:checked').value,
        };
        this.store.updateGlobalPrices(pricesData);
        this.notifications.show("Preços e configurações salvos!", NOTIFICATION_TYPES.SUCCESS);
    }

    resetPrices() {
        window.app.showConfirmation(
            'Resetar Preços',
            '<p>Deseja resetar todos os preços e configurações para os valores padrão?</p>',
            () => {
                this.store.resetGlobalPrices();
                this.notifications.show("Preços e configurações resetados", NOTIFICATION_TYPES.INFO);
            },
            { confirmText: 'Resetar', type: 'is-warning' }
        );
    }

    addSpecificPrice(tipo, dimensao, preco, originalDimensao = null) {
        const key = `${tipo}_${dimensao}`;
        const originalKey = originalDimensao ? `${tipo}_${originalDimensao}` : null;
        this.store.addOrUpdateSpecificPrice(key, preco, originalKey);
    }

    removeSpecificPrice(tipo, dimensao) {
        const key = `${tipo}_${dimensao}`;
        this.store.removeSpecificPrice(key);
    }

    _applyRounding(value) {
        const prices = this.store.getPrices();
        const config = prices.roundingConfig || { method: 'none', decimals: 2 };
        if (config.method === 'none') return value;
        const factor = Math.pow(10, config.decimals);
        if (config.method === 'ceil') return Math.ceil(value * factor) / factor;
        if (config.method === 'round') return Math.round(value * factor) / factor;
        return value;
    }

    getGlobalPrices() {
        return this.store.getPrices().global;
    }

    getSpecificPrices() {
        return { ...this.store.getPrices().especificos };
    }

    getMaterialPrice(tipoMaterial, espessura, largura, diametro) {
        const prices = this.store.getPrices();
        if (tipoMaterial === 'redonda') {
            const chave = `redonda_${diametro}`;
            return prices.especificos[chave] || prices.global.redondaPadrao;
        } else { // 'chata'
            const chave = `chata_${espessura}x${largura}`;
            return prices.especificos[chave] || prices.global.chataPadrao;
        }
    }

    getChapaLateralPrice(espessura, largura) {
        const prices = this.store.getPrices();
        const chave = `chapa_lateral_${espessura}x${largura}`;
        const precoMaterial = prices.especificos[chave] || prices.global.chapaLateralPadrao;
        const precoServico = prices.global.corteChpaLateral;
        return precoMaterial + precoServico;
    }

    getChapaXadrezPrice(espessura, largura) {
        const prices = this.store.getPrices();
        const chave = `chapa_xadrez_${espessura}x${largura}`;
        const precoMaterial = prices.especificos[chave] || prices.global.chapaXadrezPadrao;
        const precoServico = prices.global.corteDobraChpaXadrez;
        return precoMaterial + precoServico;
    }

    getProcessPrices(template) {
        const prices = this.store.getPrices();
        if (template.precosCustomizados) {
            return {
                maoObra: FormattingService.toSafeNumber(template.customMaoObra),
                galvanizacao: FormattingService.toSafeNumber(template.customGalvanizacao)
            };
        }
        return {
            maoObra: prices.global.maoObra,
            galvanizacao: prices.global.galvanizacao
        };
    }
}