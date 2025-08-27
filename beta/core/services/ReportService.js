import { FormattingService } from "./FormattingService.js";
import { CalculationService, CuttingOptimizer, separarMateriais } from "./CalculationService.js";
import { CostCalculationService } from "./CostCalculationService.js";
import { CONFIG, MATERIAL_SHORT_NAMES } from "../../shared/config.js";

export class ReportService {
    constructor(budgetManager, templates, priceManager, templatesMap) {
        this.budgetManager = budgetManager; // Instância do BudgetController
        this.templates = templates;
        this.priceManager = priceManager;
        this.templatesMap = templatesMap;
    }

    generateIndividualReportData() {
        if (this.budgetManager.store.getBudgetItems().length === 0) {
            return [];
        }

        const custosPorMetroQuadrado = this.budgetManager.calculateCostsByM2();

        return this.budgetManager.store.getBudgetItems().map(itemOrcamento => {
            const template = this.templatesMap.get(itemOrcamento.templateId);
            if (!template) return null;

            const calculo = this.budgetManager._calculateItemTotals(itemOrcamento, template, this.priceManager);

            let custos;
            if (template.templateType === 'grade') {
                const totaisGerais = this.budgetManager.calculateCosts();
                const totalAreaGrades = this.budgetManager.store.getBudgetItems()
                .filter(item => {
                    const t = this.templatesMap.get(item.templateId);
                    return t && t.templateType === 'grade';
                })
                .reduce((sum, item) => {
                    const t = this.templatesMap.get(item.templateId);
                    return sum + this.budgetManager._calculateItemTotals(item, t, this.priceManager).area;
                }, 0);

                const custoGeralPorM2 = totalAreaGrades > 0 ? totaisGerais.totalCustoGeral / totalAreaGrades : 0;
                const custoTotalItem = calculo.area * custoGeralPorM2;
                const custoPorUnidade = itemOrcamento.quantidade > 0 ? custoTotalItem / itemOrcamento.quantidade : 0;

                custos = {
                    custoMaterial: (custosPorMetroQuadrado.material[template.nome] || 0) * calculo.area,
                    custoMaoObra: (custosPorMetroQuadrado.maoObra[template.nome] || 0) * calculo.area,
                    custoGalvanizacao: (custosPorMetroQuadrado.galvanizacao[template.nome] || 0) * calculo.area,
                    custoTotalItem,
                    custoPorUnidade
                };
            } else { // Clamp
                const unitMatCost = Object.values(template.costs.material).reduce((s, v) => s + v, 0);
                const unitMoCost = Object.values(template.costs.maoDeObra).reduce((s, v) => s + v, 0);
                const unitGalvCost = Object.values(template.costs.galvanizacao).reduce((s, v) => s + v, 0);
                custos = {
                    custoMaterial: unitMatCost * itemOrcamento.quantidade,
                    custoMaoObra: unitMoCost * itemOrcamento.quantidade,
                    custoGalvanizacao: unitGalvCost * itemOrcamento.quantidade,
                    custoTotalItem: calculo.custoTotal,
                    custoPorUnidade: calculo.custoTotal / itemOrcamento.quantidade
                };
            }

            const calculoMateriais = template.templateType === 'grade'
                ? CalculationService.calcular(itemOrcamento, template, this.priceManager)
                : { materiais: {} };

            return {
                item: itemOrcamento, template, calculo, custos,
                materiais: this.generateMaterialData(calculoMateriais.materiais)
            };
        }).filter(Boolean);
    }

    generateMaterialData(materiais) {
        return Object.entries(materiais).map(([nomeMaterial, dados]) => {
            if (dados.peso <= 0) return null;
            const dimensoesFormatadas = FormattingService.formatDimensionDisplay(dados);
            const nomeCurto = MATERIAL_SHORT_NAMES[nomeMaterial] || nomeMaterial;
            return {
                nome: nomeCurto, esp: dimensoesFormatadas.esp, larg: dimensoesFormatadas.larg,
                comp: FormattingService.formatInteger(dados.comp),
                qtd: FormattingService.formatInteger(dados.qtd),
                peso: FormattingService.formatNumber(dados.peso)
            };
        }).filter(Boolean);
    }

    generateConsolidatedReportData() {
        if (this.budgetManager.store.getBudgetItems().length === 0) {
            return { hasData: false };
        }

        const consolidadoBarras = this.budgetManager.buildConsolidatedByTemplate(this.templates, this.priceManager);
        const consolidadoChapas = this.budgetManager.buildConsolidatedChapas(this.templates, this.priceManager);
        const itensGrampos = this.budgetManager.store.getBudgetItems().filter(item => {
            const t = this.templatesMap.get(item.templateId);
            return t && t.templateType === 'clamp';
        });

        const consolidadoGrampos = {};
        if (itensGrampos.length > 0) {
            itensGrampos.forEach(item => {
                const template = this.templatesMap.get(item.templateId);
                if (template) {
                    if (!consolidadoGrampos[template.id]) {
                        consolidadoGrampos[template.id] = {
                            template: template.nome, qtd: 0, pesoUnitario: template.pesoUnitario,
                            pesoTotal: 0, custoTotal: 0
                        };
                    }
                    const calculo = this.budgetManager._calculateItemTotals(item, template, this.priceManager);
                    consolidadoGrampos[template.id].qtd += item.quantidade;
                    consolidadoGrampos[template.id].pesoTotal += calculo.peso;
                    consolidadoGrampos[template.id].custoTotal += calculo.custoTotal;
                }
            });
        }

        const hasData = Object.keys(consolidadoBarras).length > 0 ||
            Object.keys(consolidadoChapas).length > 0 ||
            Object.keys(consolidadoGrampos).length > 0;

        if (!hasData) {
            return { hasData: false };
        }

        return {
            hasData: true,
            consolidadoBarras: this.generateConsolidatedRowsData(consolidadoBarras),
            consolidadoChapas: this.generateConsolidatedChapasRowsData(consolidadoChapas),
            consolidadoGrampos: Object.values(consolidadoGrampos),
            planoCorte: this.generateCuttingPlanData(consolidadoBarras)
        };
    }

    // --- FUNÇÃO ADICIONADA ---
    generateMemoriaCalculoData() {
        if (this.budgetManager.store.getBudgetItems().length === 0) {
            return [];
        }

        const todosItens = this.budgetManager.store.getBudgetItems();
        const dadosPorTemplate = {};

        todosItens.forEach(item => {
            const template = this.templatesMap.get(item.templateId);
            if (!template) return;

            if (!dadosPorTemplate[template.id]) {
                dadosPorTemplate[template.id] = {
                    template: template,
                    itens: [],
                    barras: {},
                    chapas: {},
                    totais: { area: 0, peso: 0, pesoComMargem: 0 }
                };
            }

            const resultadoCalculo = this.budgetManager._calculateItemTotals(item, template, this.priceManager);
            const templateData = dadosPorTemplate[template.id];

            templateData.itens.push({ item: item, resultado: resultadoCalculo });
            templateData.totais.area += resultadoCalculo.area;
            templateData.totais.peso += resultadoCalculo.peso;
            templateData.totais.pesoComMargem += resultadoCalculo.pesoComMargem;

            if (template.templateType === 'grade') {
                const calculoConsolidado = CalculationService.calcular(item, template, this.priceManager);
                const { barras, chapas } = separarMateriais(calculoConsolidado.materiais, template.isDegrau);

                Object.values(barras).forEach(dadosMaterial => {
                    if (dadosMaterial.peso > 0) {
                        const chave = FormattingService.formatDimensionKey(dadosMaterial.tipo, dadosMaterial.esp, dadosMaterial.larg, dadosMaterial.diam);
                        if (!templateData.barras[chave]) {
                            templateData.barras[chave] = { ...dadosMaterial, qtd: 0, peso: 0, pecas: [] };
                        }
                        templateData.barras[chave].qtd += dadosMaterial.qtd;
                        templateData.barras[chave].peso += dadosMaterial.peso;
                        for (let i = 0; i < dadosMaterial.qtd; i++) templateData.barras[chave].pecas.push(dadosMaterial.comp);
                    }
                });

                Object.entries(chapas).forEach(([nomeChapa, dadosChapa]) => {
                    if (dadosChapa.peso > 0) {
                        if (!templateData.chapas[nomeChapa]) {
                            templateData.chapas[nomeChapa] = { ...dadosChapa, qtd: 0, peso: 0, comprimentos: [] };
                        }
                        templateData.chapas[nomeChapa].qtd += dadosChapa.qtd;
                        templateData.chapas[nomeChapa].peso += dadosChapa.peso;
                        for (let i = 0; i < dadosChapa.qtd; i++) templateData.chapas[nomeChapa].comprimentos.push(dadosChapa.comp);
                    }
                });
            }
        });

        const consolidadoGeralBarras = this.budgetManager.buildConsolidatedByTemplate(this.templates, this.priceManager);
        const consolidadoGeralChapas = this.budgetManager.buildConsolidatedChapas(this.templates, this.priceManager);
        const custoBarras = CostCalculationService.calcularCustoMaterialConsolidado(consolidadoGeralBarras, this.priceManager, this.templates);
        const custoChapas = CostCalculationService.calcularCustoChapas(consolidadoGeralChapas, this.priceManager, this.templates);

        return Object.values(dadosPorTemplate).map(data => {
            return this.buildTemplateMemoryData(data, custoBarras, custoChapas);
        });
    }

    // --- FUNÇÃO AUXILIAR ADICIONADA ---
    buildTemplateMemoryData(data, custoGeralBarras, custoGeralChapas) {
        const { template, totais, itens } = data;

        if (template.templateType === 'clamp') {
            const custoTotalTemplate = itens.reduce((sum, { resultado }) => sum + resultado.custoTotal, 0);
            const itensData = itens.map(({ item, resultado }) => ({
                item: item,
                pesoComMargem: FormattingService.formatNumber(resultado.pesoComMargem),
                custoTotal: FormattingService.formatCurrency(resultado.custoTotal),
                custoUnitario: FormattingService.formatCurrency(item.quantidade > 0 ? resultado.custoTotal / item.quantidade : 0)
            }));
            const totaisFormatados = {
                pesoComMargem: FormattingService.formatNumber(totais.pesoComMargem),
            };

            return {
                template, totais: totaisFormatados, itens: itensData,
                custoTotal: {
                    total: FormattingService.formatCurrency(custoTotalTemplate),
                    porM2: "N/A"
                }
            };
        }

        let malhaDisplay = `${template.malha_menor}x${template.malha_maior}`;
        if (template.tipoMalha === 'interna') {
            const malhaMenorEfetiva = template.malha_menor + Math.round(template.bp_esp);
            malhaDisplay = `${template.malha_menor}x${template.malha_maior} (Efetiva: ${malhaMenorEfetiva}x${template.malha_maior})`;
        }

        const totaisFormatados = {
            area: FormattingService.formatNumber(totais.area),
            pesoComMargem: FormattingService.formatNumber(totais.pesoComMargem),
            malhaDisplay,
        };

        let subtotalBarras = 0;
        const barrasRows = Object.entries(data.barras).map(([dimensao, dadosMaterial]) => {
            const detalheCusto = custoGeralBarras.detalhes[`${template.nome}_${dimensao}`];
            if (!detalheCusto) return null;
            subtotalBarras += detalheCusto.custo;
            const dimensoesFormatadas = FormattingService.formatDimensionDisplay(dadosMaterial);
            return {
                esp: dimensoesFormatadas.esp, larg: dimensoesFormatadas.larg,
                numBarras: FormattingService.formatInteger(detalheCusto.numBarras),
                pesoMP: FormattingService.formatNumber(detalheCusto.pesoMateriaPrima),
                precoKg: FormattingService.formatCurrency(detalheCusto.precoKg),
                custo: FormattingService.formatCurrency(detalheCusto.custo)
            };
        }).filter(Boolean);

        let subtotalMaterialChapas = 0;
        const chapasRows = Object.entries(data.chapas).map(([tipoChapa, dadosChapa]) => {
            const detalheCusto = custoGeralChapas.detalhes[`${template.nome}_${tipoChapa}`];
            if (!detalheCusto) return null;
            subtotalMaterialChapas += detalheCusto.custoMaterial;
            return {
                tipo: tipoChapa === 'chapaLateral' ? 'Chapa Lateral' : 'Chapa Xadrez',
                dimensoes: `${FormattingService.formatNumber(dadosChapa.esp)}x${FormattingService.formatNumber(dadosChapa.larg)}`,
                comp: dadosChapa.comprimentos ? FormattingService.groupPieces(dadosChapa.comprimentos) : FormattingService.formatInteger(dadosChapa.comp || 0),
                qtd: FormattingService.formatInteger(dadosChapa.qtd),
                peso: FormattingService.formatNumber(detalheCusto.peso),
                observacao: tipoChapa === 'chapaXadrez' ? ' (c/ ajuste)' : '',
                precoKg: FormattingService.formatCurrency(detalheCusto.precoMaterialKg),
                custo: FormattingService.formatCurrency(detalheCusto.custoMaterial)
            };
        }).filter(Boolean);

        const precosProcessos = this.priceManager.getProcessPrices(template);
        const custoMaoObra = totais.pesoComMargem * precosProcessos.maoObra;
        const custoGalvanizacao = totais.pesoComMargem * precosProcessos.galvanizacao;
        let custoServicoChapas = 0;
        Object.keys(data.chapas).forEach(tipoChapa => {
            const chaveCusto = `${template.nome}_${tipoChapa}`;
            if (custoGeralChapas.detalhes[chaveCusto]) {
                custoServicoChapas += custoGeralChapas.detalhes[chaveCusto].custoServico;
            }
        });

        const custoTotalTemplate = subtotalBarras + subtotalMaterialChapas + custoMaoObra + custoGalvanizacao + custoServicoChapas;
        const itensData = itens.map(({ item, resultado }) => {
            const areaRelativa = totais.area > 0 ? resultado.area / totais.area : 0;
            const custoTotalItem = custoTotalTemplate * areaRelativa;
            return {
                item: item,
                pesoComMargem: FormattingService.formatNumber(resultado.pesoComMargem),
                custoTotal: FormattingService.formatCurrency(custoTotalItem),
                custoUnitario: FormattingService.formatCurrency(item.quantidade > 0 ? custoTotalItem / item.quantidade : 0)
            };
        });

        const processosItems = [
            { nome: 'Mão de Obra', calculo: `${FormattingService.formatNumber(totais.pesoComMargem)} kg × ${FormattingService.formatCurrency(precosProcessos.maoObra)}/kg`, custo: FormattingService.formatCurrency(custoMaoObra) },
            { nome: 'Galvanização', calculo: `${FormattingService.formatNumber(totais.pesoComMargem)} kg × ${FormattingService.formatCurrency(precosProcessos.galvanizacao)}/kg`, custo: FormattingService.formatCurrency(custoGalvanizacao) }
        ];
        if (custoServicoChapas > 0) {
            processosItems.push({ nome: 'Serviços de Chapas', calculo: 'Corte/Dobra conforme tipo', custo: FormattingService.formatCurrency(custoServicoChapas) });
        }

        return {
            template, totais: totaisFormatados, itens: itensData,
            barras: { rows: barrasRows, subtotal: FormattingService.formatCurrency(subtotalBarras) },
            chapas: { rows: chapasRows, subtotal: FormattingService.formatCurrency(subtotalMaterialChapas) },
            processos: {
                tipoPreco: template.precosCustomizados ? '(Preços Customizados)' : '(Preços Globais)',
                items: processosItems,
                total: FormattingService.formatCurrency(custoMaoObra + custoGalvanizacao + custoServicoChapas)
            },
            custoTotal: {
                total: FormattingService.formatCurrency(custoTotalTemplate),
                porM2: FormattingService.formatCurrency(totais.area > 0 ? custoTotalTemplate / totais.area : 0)
            },
            totalWeightCalcMethod: this.priceManager.store.getPrices().totalWeightCalcMethod
        };
    }

    generateConsolidatedRowsData(dadosConsolidados) {
        const rows = [];
        Object.entries(dadosConsolidados).forEach(([nomeTemplate, materiais]) => {
            Object.entries(materiais).forEach(([dimensao, dadosMaterial]) => {
                const dimensoesFormatadas = FormattingService.formatDimensionDisplay(dadosMaterial);
                rows.push({
                    template: nomeTemplate,
                    esp: dimensoesFormatadas.esp,
                    larg: dimensoesFormatadas.larg,
                    comp: FormattingService.groupPieces(dadosMaterial.pecas),
                    qtd: FormattingService.formatInteger(dadosMaterial.qtd),
                    peso: FormattingService.formatNumber(dadosMaterial.peso)
                });
            });
        });
        return rows;
    }

    generateConsolidatedChapasRowsData(dadosConsolidados) {
        const rows = [];
        Object.entries(dadosConsolidados).forEach(([nomeTemplate, chapas]) => {
            Object.entries(chapas).forEach(([tipoChapa, dadosChapa]) => {
                rows.push({
                    template: nomeTemplate,
                    tipo: tipoChapa === 'chapaLateral' ? 'Chapa Lateral' : 'Chapa Xadrez',
                    esp: FormattingService.formatNumber(dadosChapa.esp),
                    larg: FormattingService.formatNumber(dadosChapa.larg),
                    comp: dadosChapa.comprimentos ? FormattingService.groupPieces(dadosChapa.comprimentos) : FormattingService.formatInteger(dadosChapa.comp || 0),
                    qtd: FormattingService.formatInteger(dadosChapa.qtd),
                    peso: FormattingService.formatNumber(dadosChapa.peso)
                });
            });
        });
        return rows;
    }

    generateCuttingPlanData(dadosConsolidados) {
        const planData = [];
        Object.entries(dadosConsolidados).forEach(([nomeTemplate, materiais]) => {
            const template = this.templates.find(t => t.nome === nomeTemplate);
            const densidadeAco = template ? template.densidade : CONFIG.DENSIDADE_ACO;

            const cards = Object.entries(materiais).map(([dimensao, dadosMaterial]) => {
                if (dadosMaterial.pecas.length === 0) return null;
                const planoDeCorte = CuttingOptimizer.otimizar(dadosMaterial.pecas);
                const pesoMateriaPrima = dadosMaterial.tipo === 'redonda'
                    ? this.calcularPesoMateriaPrimaRedonda(dadosMaterial.diam, planoDeCorte.barras, densidadeAco)
                    : this.calcularPesoMateriaPrimaChata(dadosMaterial.esp, dadosMaterial.larg, planoDeCorte.barras, densidadeAco);

                return {
                    dimensao,
                    icon: dadosMaterial.tipo === 'redonda' ? 'fa-circle-notch' : 'fa-ruler-combined',
                    tipoBarra: dadosMaterial.tipo === 'redonda' ? 'Barra Redonda' : 'Barra Chata',
                    classeDesperdicio: FormattingService.getWasteClass(planoDeCorte.desperdicio),
                    desperdicio: FormattingService.formatNumber(planoDeCorte.desperdicio, 1),
                    numBarras: FormattingService.formatNumber(planoDeCorte.barras, 3),
                    pesoMP: FormattingService.formatNumber(pesoMateriaPrima),
                };
            }).filter(Boolean);

            if (cards.length > 0) {
                planData.push({
                    template: nomeTemplate,
                    tamanhoBarra: CONFIG.BARRA_PADRAO.toLocaleString('pt-BR'),
                    cards
                });
            }
        });
        return planData;
    }

    calcularPesoMateriaPrimaRedonda(diametro, numBarras, densidade = CONFIG.DENSIDADE_ACO) {
        const raio = (diametro / 1000) / 2;
        return (Math.PI * raio * raio * (CONFIG.BARRA_PADRAO / 1000) * densidade) * numBarras;
    }

    calcularPesoMateriaPrimaChata(espessura, largura, numBarras, densidade = CONFIG.DENSIDADE_ACO) {
        return (espessura / 1000) * (largura / 1000) * (CONFIG.BARRA_PADRAO / 1000) * densidade * numBarras;
    }
}