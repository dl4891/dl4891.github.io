export const COMPANY_INFO = {
    name: "FUROEXPRESS IND E COM DE CHAPAS E GRADES LTDA",
    address: "Rua Serra de Santa Marta, 303 - Vila Carmosina - São Paulo - SP - CEP: 08290-420",
    cnpj: "07.707.181/0001-30",
    ie: "123.240.611.115",
    phone: "(11) 2055-8999"
};

export const CONFIG = {
    PRECISION: 2,
    MAX_ITEMS: 100,
    BARRA_PADRAO: 6e3,
    DENSIDADE_ACO: 7850,
    MARGEM_PADRAO: 5,
    ANIMATION: {DURATION_FAST: "0.1s", DURATION_NORMAL: "0.2s", DURATION_SLOW: "0.3s", NOTIFICATION_DURATION: 4e3},
    VALIDATION: {DELAY: 300, MIN_MATERIALS: 1, MAX_DECIMALS: 4},
    PRICING: {
        DEFAULTS: {
            icmsMaterial: 18,
            ipiMaterial: 3.25,
            ipiRevenda: 0,
            ipiVendaFinal: 3.25,
            lucroLiquido: 20,
            despesasFixas: 9.5,
            comissoesRepres: 0,
            comissoesInternas: 3.5,
            despesasFinanceiras: .26,
            csllIrpj: 2.81,
            fretePerc: 0,
            freteValor: 0,
            stCompraQtde: 0,
            stCompraUnit: 0,
            taxaEnergiaQtde: 0,
            taxaEnergiaUnit: 0,
            tipoOperacao: "venda"
        },
        IPI_RULES: {
            MATERIAL_RULES: {requires_revenda_zero: !0, requires_venda_final_positive: !0},
            REVENDA_RULES: {requires_material_zero: !0, requires_venda_final_zero: !0}
        },
        TAXES: {cofins: {normal: .03, exportacao: 0}, pis: {normal: .0065, exportacao: 0}}
    }
};
export const MESSAGES = {
    ERRORS: {
        noTipoConfiguracao: "Por favor, selecione o tipo de configuração de venda.",
        noUfDestino: "Por favor, selecione a UF de destino.",
        calculationError: "Erro no cálculo. Verifique os dados inseridos.",
        minMaterials: "Deve haver pelo menos um material na lista.",
        fieldRequired: "Campo obrigatório",
        invalidNumber: "Valor numérico inválido",
        templateExists: "Já existe um modelo com este nome",
        templateNotFound: "Modelo selecionado não existe",
        dimensionExists: "Já existe um preço para esta dimensão"
    },
    CONFIRMATIONS: {
        resetAliquotas: "Deseja restaurar todas as alíquotas para os valores padrão? Esta ação não pode ser desfeita.",
        resetTemplate: "Deseja restaurar os valores padrão?",
        deleteTemplate: 'Excluir modelo "{name}"?',
        deleteItem: 'Remover "{description}"?',
        clearBudget: "Limpar orçamento com {count} item(s)?",
        resetPrices: "Resetar todos os preços?"
    },
    SUCCESS: {
        templateSaved: "Modelo salvo!",
        templateUpdated: "Modelo atualizado!",
        templateDeleted: "Modelo excluído",
        itemAdded: "Item adicionado!",
        itemUpdated: "Item atualizado!",
        itemRemoved: "Item removido",
        pricesSaved: "Preços salvos!",
        pricesReset: "Preços resetados",
        aliquotasSaved: "Alíquotas salvas com sucesso!",
        calculationComplete: "Cálculo realizado com sucesso!"
    }
};
export const NOTIFICATION_TYPES = {SUCCESS: "success", WARNING: "warning", DANGER: "danger", INFO: "info"};
export const MATERIAL_NAMES = {
    portante: "Barras Portantes",
    ligacaoDiam: "Barras Ligação Ø",
    ligacaoChata: "Barras Ligação Chata",
    fechTerminal: "Fechamento Terminal",
    fechLateral: "Fechamento Lateral",
    chapaLateral: "Chapa Lateral",
    chapaXadrez: "Chapa Xadrez"
};
export const MATERIAL_SHORT_NAMES = {
    portante: "Portante",
    ligacaoDiam: "Ligação Ø",
    ligacaoChata: "Ligação Chata",
    fechTerminal: "Fech. Terminal",
    fechLateral: "Fech. Lateral",
    chapaLateral: "Chapa Lateral",
    chapaXadrez: "Chapa Xadrez"
};
export const UF_DATA = {
    AC: {mva_grade: 0, aliq_int: 19, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    AL: {mva_grade: 1.5765, aliq_int: 20, mva_grampo: 1.7554, mva_telas: 1.6159, aliq_sp: 7},
    AP: {mva_grade: 1.5084, aliq_int: 18, mva_grampo: 1.5991, mva_telas: 1.5084, aliq_sp: 7},
    AM: {mva_grade: 0, aliq_int: 20, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    BA: {mva_grade: 1.5311, aliq_int: 20.5, mva_grampo: 1.8132, mva_telas: 1.5792, aliq_sp: 7},
    CE: {mva_grade: 0, aliq_int: 20, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    DF: {mva_grade: 1.5084, aliq_int: 20, mva_grampo: 1.6973, mva_telas: 1.5084, aliq_sp: 7},
    ES: {mva_grade: 1.4902, aliq_int: 17, mva_grampo: 1.6359, mva_telas: 1.4902, aliq_sp: 7},
    GO: {mva_grade: 1.4902, aliq_int: 17, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    MA: {mva_grade: 0, aliq_int: 22, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    MT: {mva_grade: 0, aliq_int: 17, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    MS: {mva_grade: 0, aliq_int: 17, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    MG: {mva_grade: 1.4488, aliq_int: 18, mva_grampo: 1.6098, mva_telas: 1.4488, aliq_sp: 12},
    PA: {mva_grade: 1.4223, aliq_int: 19, mva_grampo: 0, mva_telas: 1.527, aliq_sp: 7},
    PB: {mva_grade: 0, aliq_int: 20, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    PR: {mva_grade: 1.5195, aliq_int: 19.5, mva_grampo: 1.6398, mva_telas: 1.5195, aliq_sp: 12},
    PE: {mva_grade: 1.5765, aliq_int: 20.5, mva_grampo: 1.7664, mva_telas: 1.626, aliq_sp: 7},
    PI: {mva_grade: 0, aliq_int: 21, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    RJ: {mva_grade: 1.4223, aliq_int: 14, mva_grampo: 1.4735, mva_telas: 1.4223, aliq_sp: 12},
    RN: {mva_grade: 0, aliq_int: 18, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    RS: {mva_grade: 1.5691, aliq_int: 17, mva_grampo: 1.7918, mva_telas: 1.5691, aliq_sp: 12},
    RO: {mva_grade: 0, aliq_int: 19.5, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    RR: {mva_grade: 0, aliq_int: 20, mva_grampo: 0, mva_telas: 0, aliq_sp: 7},
    SC: {mva_grade: 0, aliq_int: 17, mva_grampo: 0, mva_telas: 0, aliq_sp: 12},
    SP: {mva_grade: 1.68, aliq_int: 18, mva_grampo: 0, mva_telas: 0, aliq_sp: 18},
    SE: {mva_grade: 1.5084, aliq_int: 22, mva_grampo: 0, mva_telas: 1.5084, aliq_sp: 7},
    TO: {mva_grade: 0, aliq_int: 20, mva_grampo: 0, mva_telas: 0, aliq_sp: 7}
};
export const UF_DATA_ORIGINAL = JSON.parse(JSON.stringify(UF_DATA));
export const UI = {
    NOTIFICATION_CONTAINER_ID: "notification-container",
    AUTO_RECALCULATE: !0,
    SHOW_MEMORIA_BY_DEFAULT: !1,
    SCROLL_BEHAVIOR: "smooth",
    DEBOUNCE_DELAY: 300
};
export const CSS_CLASSES = {
    FIELD_ERROR: "field-error",
    IS_ACTIVE: "is-active",
    IS_LOADING: "is-loading",
    FADE_IN: "fade-in",
    EDITING: "editing",
    EXPANDED: "expanded",
    ROTATED: "rotated",
    DESTACADO: "destacado",
    RESULTADO_FINAL: "resultado-final"
};
export const EVENTS = {
    TEMPLATE_SAVED: "template:saved",
    TEMPLATE_DELETED: "template:deleted",
    ITEM_ADDED: "item:added",
    ITEM_REMOVED: "item:removed",
    PRICES_UPDATED: "prices:updated",
    CALCULATION_COMPLETE: "calculation:complete"
};