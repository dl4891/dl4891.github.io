import { UF_DATA } from "../shared/config.js";

export class CalculationEngine {

    static getAliquotaByUF(uf, tipoAliquota) {
        if (!uf || !UF_DATA[uf]) return 0;
        switch (tipoAliquota) {
            case 'aliq_int':
                return UF_DATA[uf].aliq_int;
            case 'aliq_sp':
                return UF_DATA[uf].aliq_sp;
            default:
                return 0;
        }
    }

    static getMVAByUF(uf, tipoProduto) {
        if (!uf || !UF_DATA[uf]) return 0;
        switch (tipoProduto) {
            case 'grade':
                return UF_DATA[uf].mva_grade;
            case 'grampo':
                return UF_DATA[uf].mva_grampo;
            case 'telas':
                return UF_DATA[uf].mva_telas;
            default:
                return 0;
        }
    }

    static validateIPIRules(pricingConfig) {
        const { ipiMaterial = 0, ipiRevenda = 0, ipiVendaFinal = 0 } = pricingConfig;

        if (ipiMaterial > 0) {
            if (ipiRevenda > 0) {
                return { valid: false, error: "Quando IPI Material > 0, IPI na Revenda deve ser 0", fields: ['ipiMaterial', 'ipiRevenda'] };
            }
            if (ipiVendaFinal === 0) {
                return { valid: false, error: "Quando IPI Material > 0, IPI Venda Final deve ser > 0", fields: ['ipiMaterial', 'ipiVendaFinal'] };
            }
        }

        if (ipiRevenda > 0) {
            if (ipiMaterial > 0) {
                return { valid: false, error: "Quando IPI na Revenda > 0, IPI Material deve ser 0", fields: ['ipiRevenda', 'ipiMaterial'] };
            }
            if (ipiVendaFinal > 0) {
                return { valid: false, error: "Quando IPI na Revenda > 0, IPI Venda Final deve ser 0", fields: ['ipiRevenda', 'ipiVendaFinal'] };
            }
        }
        return { valid: true, error: null, fields: [] };
    }

    static determineOperationType(pricingConfig) {
        const ipiRevenda = pricingConfig.ipiRevenda || 0;
        return ipiRevenda > 0 ? 'revenda' : 'venda';
    }

    static calculatePrice(pricingData) {
        const validationResult = this.validateIPIRules(pricingData);
        if (!validationResult.valid) {
            throw new Error(`Erro de validação IPI: ${validationResult.error}`);
        }

        const result = {};
        const operationType = this.determineOperationType(pricingData);
        result.tipoOperacao = operationType;

        // Custos Iniciais
        result.B1_custoMaterial = pricingData.materiaisDetalhes.reduce((sum, material) => sum + (material.qty * material.unit), 0);
        result.materiaisDetalhes = pricingData.materiaisDetalhes;
        result.B5_icmsMaterial = pricingData.icmsMaterial / 100;

        // Flags de Operação
        result.B68_vendaEstaleiro = pricingData.vendaEstaleiro || false;
        result.B69_vendaExportacao = pricingData.vendaExportacao || false;

        // Configuração de IPI baseada no tipo de operação
        if (operationType === 'venda') {
            result.B3_ipiMaterial = (pricingData.ipiMaterial || 0) / 100;
            result.B7_ipiRevenda = 0;
            result.B98_ipiVenda = (pricingData.ipiVendaFinal || 0) / 100;
        } else { // revenda
            result.B3_ipiMaterial = 0;
            result.B7_ipiRevenda = (pricingData.ipiRevenda || 0) / 100;
            result.B98_ipiVenda = 0;
        }

        // Cálculo de Custos com Impostos Iniciais
        result.B2_custoMaterialComIPI = result.B1_custoMaterial * result.B3_ipiMaterial + result.B1_custoMaterial;
        result.B4_valorIPIMaterial = result.B68_vendaEstaleiro ? 0 : (result.B1_custoMaterial * result.B3_ipiMaterial);
        result.B6_valorICMSMaterial = result.B68_vendaEstaleiro ? 0 : (result.B1_custoMaterial * result.B5_icmsMaterial);
        result.B8_valorIPIRevenda = result.B1_custoMaterial * result.B7_ipiRevenda;

        // Custos de Serviços
        result.B10_servicoConstante = 1; // Fator de serviço
        result.B11_somaServicos = pricingData.servicosDetalhes.reduce((sum, servico) => sum + (servico.qty * servico.unit), 0);
        result.B12_servicoTotal = result.B10_servicoConstante * result.B11_somaServicos;
        result.servicosDetalhes = pricingData.servicosDetalhes;

        // Outros Custos
        result.B28_stCompraTotal = (pricingData.stCompraQtde || 0) * (pricingData.stCompraUnit || 0);
        result.B32_taxaEnergiaTotal = (pricingData.taxaEnergiaQtde || 0) * (pricingData.taxaEnergiaUnit || 0);

        // Custo Líquido
        result.B34_custoLiquido = result.B2_custoMaterialComIPI - result.B4_valorIPIMaterial - result.B6_valorICMSMaterial + result.B8_valorIPIRevenda + result.B12_servicoTotal + result.B28_stCompraTotal + result.B32_taxaEnergiaTotal;

        // Configuração de UFs
        result.ufGrade = pricingData.ufGrade || '';
        result.ufGrampo = pricingData.ufGrampo || '';
        result.ufTelas = pricingData.ufTelas || '';
        result.ufNaoContribuinte = pricingData.ufNaoContribuinte || '';
        result.ufConsumidorFinal = pricingData.ufConsumidorFinal || '';
        result.ufRevendaNormal = pricingData.ufRevendaNormal || '';

        // Busca de Alíquotas e MVA por UF
        result.B42_aliqIntGrade = this.getAliquotaByUF(result.ufGrade, 'aliq_int');
        result.B43_aliqSPGrade = this.getAliquotaByUF(result.ufGrade, 'aliq_sp');
        result.B44_ivaGrade = this.getMVAByUF(result.ufGrade, 'grade');

        result.B47_aliqIntGrampo = this.getAliquotaByUF(result.ufGrampo, 'aliq_int');
        result.B48_aliqSPGrampo = this.getAliquotaByUF(result.ufGrampo, 'aliq_sp');
        result.B49_ivaGrampo = this.getMVAByUF(result.ufGrampo, 'grampo');

        result.B52_aliqIntTelas = this.getAliquotaByUF(result.ufTelas, 'aliq_int');
        result.B53_aliqSPTelas = this.getAliquotaByUF(result.ufTelas, 'aliq_sp');
        result.B54_ivaTelas = this.getMVAByUF(result.ufTelas, 'telas');

        result.B57_aliqIntNaoContrib = this.getAliquotaByUF(result.ufNaoContribuinte, 'aliq_int');
        result.B58_aliqSPNaoContrib = this.getAliquotaByUF(result.ufNaoContribuinte, 'aliq_sp');

        result.B61_aliqIntConsumidor = this.getAliquotaByUF(result.ufConsumidorFinal, 'aliq_int');
        result.B62_aliqSPConsumidor = this.getAliquotaByUF(result.ufConsumidorFinal, 'aliq_sp');

        result.B65_aliqIntRevenda = this.getAliquotaByUF(result.ufRevendaNormal, 'aliq_int');
        result.B66_aliqSPRevenda = this.getAliquotaByUF(result.ufRevendaNormal, 'aliq_sp');

        // Base de ICMS ST
        result.B35_baseICMSST = result.B44_ivaGrade + result.B49_ivaGrampo + result.B54_ivaTelas;

        // Percentuais de Venda
        result.B72_lucroLiquido = (pricingData.lucroLiquido || 0) / 100;
        result.B74_despesasFixas = (pricingData.despesasFixas || 0) / 100;
        result.B76_comissoesRepres = (pricingData.comissoesRepres || 0) / 100;
        result.B78_comissoesInternas = (pricingData.comissoesInternas || 0) / 100;
        result.B80_despesasFinanceiras = (pricingData.despesasFinanceiras || 0) / 100;
        result.B88_csllIrpj = (pricingData.csllIrpj || 0) / 100;
        result.B90_fretePerc = (pricingData.fretePerc || 0) / 100;
        result.B91_freteValor = pricingData.freteValor || 0;

        // Percentuais de Impostos sobre Venda
        result.B82_icmsOpPropria = (result.B43_aliqSPGrade + result.B48_aliqSPGrampo + result.B53_aliqSPTelas + result.B58_aliqSPNaoContrib + result.B62_aliqSPConsumidor + result.B66_aliqSPRevenda) / 100;
        result.B84_cofins = (result.B68_vendaEstaleiro || result.B69_vendaExportacao) ? 0 : 0.03;
        result.B86_pis = (result.B68_vendaEstaleiro || result.B69_vendaExportacao) ? 0 : 0.0065;

        // Cálculo do Preço de Venda
        result.B92_percAntesMercadoria = result.B72_lucroLiquido + result.B74_despesasFixas + result.B76_comissoesRepres + result.B78_comissoesInternas + result.B80_despesasFinanceiras + result.B82_icmsOpPropria + result.B84_cofins + result.B86_pis + result.B88_csllIrpj + result.B90_fretePerc;
        result.B94_valorMercadoria = (result.B34_custoLiquido / (1 - result.B92_percAntesMercadoria)) + result.B91_freteValor;

        // Valores calculados sobre o preço de venda
        result.B73_valorLucroLiquido = result.B94_valorMercadoria * result.B72_lucroLiquido;
        result.B75_valorDespesasFixas = result.B94_valorMercadoria * result.B74_despesasFixas;
        result.B77_valorComissoesRepres = result.B94_valorMercadoria * result.B76_comissoesRepres;
        result.B79_valorComissoesInternas = result.B94_valorMercadoria * result.B78_comissoesInternas;
        result.B81_valorDespesasFinanceiras = result.B94_valorMercadoria * result.B80_despesasFinanceiras;
        result.B89_valorCSLLIRPJ = result.B94_valorMercadoria * result.B88_csllIrpj;

        // Cálculo de IPI e ICMS sobre a venda
        result.B99_valorIPI = (result.B68_vendaEstaleiro || result.B69_vendaExportacao) ? 0 : result.B94_valorMercadoria * result.B98_ipiVenda;
        result.B36_baseICMSSTTotal = (result.B35_baseICMSST > 0) ? (result.B94_valorMercadoria + result.B99_valorIPI) * result.B35_baseICMSST : 0;
        result.B38_icmsSTBruto = (result.B42_aliqIntGrade + result.B47_aliqIntGrampo + result.B52_aliqIntTelas) / 100;
        result.B39_icmsSTBrutoTotal = result.B36_baseICMSSTTotal * result.B38_icmsSTBruto;

        if (result.B57_aliqIntNaoContrib + result.B61_aliqIntConsumidor > 0) {
            result.B83_valorICMSOpPropria = (result.B94_valorMercadoria + result.B99_valorIPI) * result.B82_icmsOpPropria;
        } else {
            result.B83_valorICMSOpPropria = result.B94_valorMercadoria * result.B82_icmsOpPropria;
        }

        result.B85_valorCOFINS = (result.B94_valorMercadoria - result.B83_valorICMSOpPropria) * result.B84_cofins;
        result.B87_valorPIS = (result.B94_valorMercadoria - result.B83_valorICMSOpPropria) * result.B86_pis;

        // DIFAL e Valor Final
        result.B95_difal = result.B57_aliqIntNaoContrib / 100;
        result.B96_valorDifal = (result.B57_aliqIntNaoContrib > 0) ? ((result.B94_valorMercadoria + result.B99_valorIPI) * result.B95_difal) - result.B83_valorICMSOpPropria : 0;
        result.B97_precoVendaComDifal = result.B94_valorMercadoria + result.B96_valorDifal;

        result.B101_valorDifST = (result.B39_icmsSTBrutoTotal > 0) ? result.B39_icmsSTBrutoTotal - result.B83_valorICMSOpPropria : 0;
        result.B100_difST = result.B94_valorMercadoria > 0 ? result.B101_valorDifST / result.B94_valorMercadoria : 0;
        result.B102_valorFinalComIPIST = result.B97_precoVendaComDifal + result.B99_valorIPI + result.B101_valorDifST;

        // Soma de verificação
        result.B93_valorAntesMercadoria = result.B73_valorLucroLiquido + result.B75_valorDespesasFixas + result.B77_valorComissoesRepres + result.B79_valorComissoesInternas + result.B81_valorDespesasFinanceiras + result.B83_valorICMSOpPropria + result.B85_valorCOFINS + result.B87_valorPIS + result.B89_valorCSLLIRPJ + result.B91_freteValor;

        return result;
    }
}