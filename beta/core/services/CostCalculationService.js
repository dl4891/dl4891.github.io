import { CalculationService, CuttingOptimizer, separarMateriais } from './CalculationService.js';
import { FormattingService } from './FormattingService.js';
import { CONFIG } from '../../shared/config.js';

export class CostCalculationService {

    static calcular(itemOrcamento, template, precosController) {
        const resultadoCalculo = CalculationService.calcular(itemOrcamento, template, precosController);
        const precosProcessos = precosController.getProcessPrices(template);

        const custoMaoObra = resultadoCalculo.pesoComMargem * precosProcessos.maoObra;
        const custoGalvanizacao = resultadoCalculo.pesoComMargem * precosProcessos.galvanizacao;

        return {
            ...resultadoCalculo,
            custos: {
                maoObra: custoMaoObra,
                galvanizacao: custoGalvanizacao
            }
        };
    }

    static calcularCustoMaterialConsolidado(dadosBarras, precosController, todosTemplates) {
        let custoTotal = 0;
        const detalhesCusto = {};

        Object.entries(dadosBarras).forEach(([nomeTemplate, materiais]) => {
            const template = todosTemplates.find(t => t.nome === nomeTemplate);
            const densidade = template ? template.densidade : CONFIG.DENSIDADE_ACO;

            Object.entries(materiais).forEach(([dimensao, dadosMaterial]) => {
                if (dadosMaterial.pecas.length === 0) return;

                const planoCorte = CuttingOptimizer.otimizar(dadosMaterial.pecas);
                let pesoMateriaPrima, precoKg;

                if (dadosMaterial.tipo === 'redonda') {
                    const raio = (dadosMaterial.diam / 1000) / 2;
                    pesoMateriaPrima = Math.PI * raio * raio * (CONFIG.BARRA_PADRAO / 1000) * densidade * planoCorte.barras;
                    precoKg = precosController.getMaterialPrice('redonda', 0, 0, dadosMaterial.diam);
                } else { // Chata
                    pesoMateriaPrima = (dadosMaterial.esp / 1000) * (dadosMaterial.larg / 1000) * (CONFIG.BARRA_PADRAO / 1000) * densidade * planoCorte.barras;
                    if (dimensao.includes("Chapa Lateral")) {
                        precoKg = precosController.getChapaLateralPrice(dadosMaterial.esp, dadosMaterial.larg);
                    } else if (dimensao.includes("Chapa Xadrez")) {
                        precoKg = precosController.getChapaXadrezPrice(dadosMaterial.esp, dadosMaterial.larg);
                    } else {
                        precoKg = precosController.getMaterialPrice('chata', dadosMaterial.esp, dadosMaterial.larg, 0);
                    }
                }

                const custoMaterial = pesoMateriaPrima * precoKg;
                custoTotal += custoMaterial;
                detalhesCusto[`${nomeTemplate}_${dimensao}`] = {
                    template: nomeTemplate,
                    dimensao: dimensao,
                    numBarras: planoCorte.barras,
                    pesoMateriaPrima: pesoMateriaPrima,
                    precoKg: precoKg,
                    custo: custoMaterial,
                    densidade: densidade
                };
            });
        });

        return { total: custoTotal, detalhes: detalhesCusto };
    }

    static calcularCustoChapas(dadosChapas, precosController, todosTemplates) {
        let custoTotalMaterial = 0;
        let custoTotalServico = 0;
        const detalhesCusto = {};

        Object.entries(dadosChapas).forEach(([nomeTemplate, chapas]) => {
            const template = todosTemplates.find(t => t.nome === nomeTemplate);
            if (!template) return;

            Object.entries(chapas).forEach(([tipoChapa, dadosChapa]) => {
                if (dadosChapa.peso <= 0) return;

                const chaveDetalhe = `${nomeTemplate}_${tipoChapa}`;
                let precoMaterialKg = 0, precoServicoKg = 0;
                let custoMaterial = 0, custoServico = 0;

                if (tipoChapa === 'chapaLateral') {
                    const chavePreco = `chapa_lateral_${dadosChapa.esp}x${dadosChapa.larg}`;
                    precoMaterialKg = precosController.getSpecificPrices()[chavePreco] || precosController.getGlobalPrices().chapaLateralPadrao;
                    precoServicoKg = precosController.getGlobalPrices().corteChpaLateral;
                    custoMaterial = dadosChapa.peso * precoMaterialKg;
                    custoServico = dadosChapa.peso * precoServicoKg;
                } else if (tipoChapa === 'chapaXadrez') {
                    const chavePreco = `chapa_xadrez_${dadosChapa.esp}x${dadosChapa.larg}`;
                    precoMaterialKg = precosController.getSpecificPrices()[chavePreco] || precosController.getGlobalPrices().chapaXadrezPadrao;
                    precoServicoKg = precosController.getGlobalPrices().corteDobraChpaXadrez;
                    custoMaterial = dadosChapa.peso * precoMaterialKg;
                    custoServico = dadosChapa.peso * precoServicoKg;
                }

                custoTotalMaterial += custoMaterial;
                custoTotalServico += custoServico;

                detalhesCusto[chaveDetalhe] = {
                    template: nomeTemplate,
                    tipo: tipoChapa,
                    peso: dadosChapa.peso,
                    precoMaterialKg: precoMaterialKg,
                    precoServicoKg: precoServicoKg,
                    custoMaterial: custoMaterial,
                    custoServico: custoServico,
                    custoTotal: custoMaterial + custoServico
                };
            });
        });

        return {
            totalMaterial: custoTotalMaterial,
            totalServico: custoTotalServico,
            totalGeral: custoTotalMaterial + custoTotalServico,
            detalhes: detalhesCusto
        };
    }

    static calcularCustoPorTemplate(itensOrcamento, todosTemplates, precosController) {
        const custosPorM2 = { material: {}, maoObra: {}, galvanizacao: {} };
        const totalAreaPorTemplate = {};
        const totalPesoPorTemplate = {};
        const consolidadoBarras = {};
        const consolidadoChapas = {};

        // 1. Consolidar dados por template
        itensOrcamento.forEach(item => {
            const template = todosTemplates.find(t => t.id === item.templateId);
            if (!template) return;

            const calculo = CalculationService.calcular(item, template, precosController);

            if (!totalAreaPorTemplate[template.nome]) {
                totalAreaPorTemplate[template.nome] = 0;
                totalPesoPorTemplate[template.nome] = 0;
                consolidadoBarras[template.nome] = {};
                consolidadoChapas[template.nome] = {};
                custosPorM2.material[template.nome] = 0;
                custosPorM2.maoObra[template.nome] = 0;
                custosPorM2.galvanizacao[template.nome] = 0;
            }

            totalAreaPorTemplate[template.nome] += calculo.area;
            totalPesoPorTemplate[template.nome] += calculo.pesoComMargem;

            const { barras, chapas } = separarMateriais(calculo.materiais, template.isDegrau);

            Object.entries(barras).forEach(([nomeMaterial, dadosMaterial]) => {
                if (dadosMaterial.peso > 0) {
                    const chaveDimensao = FormattingService.formatDimensionKey(dadosMaterial.tipo, dadosMaterial.esp, dadosMaterial.larg, dadosMaterial.diam);
                    if (!consolidadoBarras[template.nome][chaveDimensao]) {
                        consolidadoBarras[template.nome][chaveDimensao] = { esp: dadosMaterial.esp || '-', larg: dadosMaterial.larg || '-', diam: dadosMaterial.diam || 0, tipo: dadosMaterial.tipo, qtd: 0, peso: 0, pecas: [] };
                    }
                    const material = consolidadoBarras[template.nome][chaveDimensao];
                    material.qtd += dadosMaterial.qtd;
                    material.peso += dadosMaterial.peso;
                    for (let i = 0; i < dadosMaterial.qtd; i++) {
                        material.pecas.push(dadosMaterial.comp);
                    }
                }
            });

            Object.entries(chapas).forEach(([nomeChapa, dadosChapa]) => {
                if (dadosChapa.peso > 0) {
                    if (!consolidadoChapas[template.nome][nomeChapa]) {
                        consolidadoChapas[template.nome][nomeChapa] = { esp: dadosChapa.esp, larg: dadosChapa.larg, tipo: 'chapa', qtd: 0, peso: 0 };
                    }
                    const chapa = consolidadoChapas[template.nome][nomeChapa];
                    chapa.qtd += dadosChapa.qtd;
                    chapa.peso += dadosChapa.peso;
                }
            });
        });

        // 2. Calcular custos consolidados
        const custoTotalBarras = this.calcularCustoMaterialConsolidado(consolidadoBarras, precosController, todosTemplates);
        const custoTotalChapas = this.calcularCustoChapas(consolidadoChapas, precosController, todosTemplates);

        // 3. Distribuir custos por template e calcular por m²
        Object.keys(totalAreaPorTemplate).forEach(nomeTemplate => {
            const template = todosTemplates.find(t => t.nome === nomeTemplate);
            if (!template) return;

            const areaTotal = totalAreaPorTemplate[nomeTemplate];
            const pesoTotal = totalPesoPorTemplate[nomeTemplate];

            if (areaTotal > 0) {
                let custoMaterialTemplate = 0;
                // Custo das barras para este template
                Object.entries(consolidadoBarras[nomeTemplate]).forEach(([dimensao, _]) => {
                    const chaveCusto = `${nomeTemplate}_${dimensao}`;
                    if (custoTotalBarras.detalhes[chaveCusto]) {
                        custoMaterialTemplate += custoTotalBarras.detalhes[chaveCusto].custo;
                    }
                });
                // Custo das chapas para este template
                Object.entries(consolidadoChapas[nomeTemplate]).forEach(([tipoChapa, _]) => {
                    const chaveCusto = `${nomeTemplate}_${tipoChapa}`;
                    if (custoTotalChapas.detalhes[chaveCusto]) {
                        custoMaterialTemplate += custoTotalChapas.detalhes[chaveCusto].custoTotal;
                    }
                });

                custosPorM2.material[nomeTemplate] = custoMaterialTemplate / areaTotal;

                const precosProcessos = precosController.getProcessPrices(template);
                custosPorM2.maoObra[nomeTemplate] = (pesoTotal * precosProcessos.maoObra) / areaTotal;
                custosPorM2.galvanizacao[nomeTemplate] = (pesoTotal * precosProcessos.galvanizacao) / areaTotal;
            }
        });

        return custosPorM2;
    }
}