import { CONFIG } from "../../shared/config.js";
import { Utils } from "../../shared/services/utils-service.js";

class CalculationServiceBase {

    static calcular(itemOrcamento, template, priceController) {
        const { quantidade, largura, comprimento } = itemOrcamento;
        const {
            bp_esp, bp_larg, bl_diam, bl_esp, bl_larg, bf_esp, bf_larg,
            malha_menor, malha_maior, densidade, margem, isDegrau, tipoMalha,
            pesoCalcMode
        } = template;

        if (!quantidade || !largura || !comprimento) {
            return { area: 0, peso: 0, pesoComMargem: 0, materiais: {} };
        }

        let malhaMenorEfetiva = malha_menor;
        if (tipoMalha === 'interna') {
            malhaMenorEfetiva = malha_menor + Math.round(bp_esp);
        }

        const compRealLigacao = (bl_diam <= 0 && bl_esp <= 0) ? 0 : Math.floor(comprimento - (2 * bf_esp));
        const compRealPortante = Math.floor(largura - 1 - (2 * bf_esp));
        const compRealFechTerminal = Math.floor(largura - 1 - (2 * bf_esp));
        const compRealFechLateral = comprimento;
        const compRealChapaLateral = comprimento;
        const compRealChapaXadrez = Math.floor(largura - 1 - (2 * bf_esp));

        const malhaTotalPortante = Math.abs((Math.floor(largura - 1 - (2 * bf_esp)) + bf_esp) / malha_maior);
        const malhaTotalLigacao = Math.abs((compRealLigacao - 1 + bf_esp) / malhaMenorEfetiva);

        const numBarrasPortantes = Math.ceil(malhaTotalPortante + 0.95);
        const numBarrasLigacao = Math.ceil(malhaTotalLigacao + 0.95);

        const usarPesoTeorico = pesoCalcMode === 'teorico';
        const compPesoPortante = usarPesoTeorico ? largura : compRealPortante;
        const compPesoLigacaoDiam = usarPesoTeorico ? comprimento : compRealLigacao;
        const compPesoLigacaoChata = usarPesoTeorico ? comprimento : compRealLigacao;
        const compPesoFechTerminal = usarPesoTeorico ? largura : compRealFechTerminal;
        const compPesoFechLateral = usarPesoTeorico ? comprimento : compRealFechLateral;
        const compPesoChapaLateral = usarPesoTeorico ? comprimento : compRealChapaLateral;
        const compPesoChapaXadrez = usarPesoTeorico ? largura : compRealChapaXadrez;

        const qtdPortante = Math.abs((numBarrasLigacao - 2) * quantidade);
        const qtdLigacao = Math.abs((numBarrasPortantes - 2) * quantidade);
        const qtdFechamento = quantidade * 2;

        const materiais = {
            portante: {
                tipo: 'chata', esp: bp_esp, larg: bp_larg, comp: compRealPortante, qtd: qtdPortante,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoChata(bp_esp, bp_larg, compPesoPortante, densidade) * qtdPortante)
            },
            ligacaoDiam: (bl_diam > 0) ? {
                tipo: 'redonda', diam: bl_diam, comp: compRealLigacao, qtd: qtdLigacao,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoRedonda(bl_diam, compPesoLigacaoDiam, densidade) * qtdLigacao)
            } : { peso: 0, qtd: 0 },
            ligacaoChata: (bl_esp > 0) ? {
                tipo: 'chata', esp: bl_esp, larg: bl_larg, comp: compRealLigacao, qtd: qtdLigacao,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoChata(bl_esp, bl_larg, compPesoLigacaoChata, densidade) * qtdLigacao)
            } : { peso: 0, qtd: 0 },
            fechTerminal: {
                tipo: 'chata', esp: bf_esp, larg: bf_larg, comp: compRealFechTerminal, qtd: qtdFechamento,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoChata(bf_esp, bf_larg, compPesoFechTerminal, densidade) * qtdFechamento)
            },
            fechLateral: {
                tipo: 'chata', esp: bf_esp, larg: bf_larg, comp: compRealFechLateral, qtd: qtdFechamento,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoChata(bf_esp, bf_larg, compPesoFechLateral, densidade) * qtdFechamento)
            }
        };

        if (isDegrau) {
            const chapaLateralLarg = template.chapaLateralLarg || (5 * Math.ceil((bp_larg + 37) / 5));
            const qtdChapaLateral = 2 * quantidade;
            materiais.chapaLateral = {
                tipo: 'chapa', esp: template.chapaLateralEsp || 4.76, larg: chapaLateralLarg, comp: compRealChapaLateral, qtd: qtdChapaLateral,
                peso: priceController._applyRounding(CalculationServiceBase.calcularPesoChata(template.chapaLateralEsp || 4.76, chapaLateralLarg, compPesoChapaLateral, densidade) * qtdChapaLateral)
            };
            delete materiais.fechLateral;

            if (template.incluirChapaXadrez) {
                const chapaXadrezLarg = template.chapaXadrezLarg || (bp_larg + malhaMenorEfetiva);
                const ajustePeso = template.chapaXadrezAjuste || 1.05;
                const pesoBaseChapaXadrez = CalculationServiceBase.calcularPesoChata(template.chapaXadrezEsp || 3.18, chapaXadrezLarg, compPesoChapaXadrez, densidade);
                materiais.chapaXadrez = {
                    tipo: 'chapa', esp: template.chapaXadrezEsp || 3.18, larg: chapaXadrezLarg, comp: compRealChapaXadrez, qtd: quantidade,
                    peso: priceController._applyRounding(pesoBaseChapaXadrez * quantidade * ajustePeso)
                };
            }
        }

        const pesoTotal = Object.values(materiais).reduce((soma, material) => soma + (material.peso || 0), 0);

        return {
            area: (largura / 1000) * (comprimento / 1000) * quantidade,
            peso: pesoTotal,
            pesoComMargem: pesoTotal * (1 + margem / 100),
            materiais: materiais
        };
    }

    static calcularPesoChata(esp, larg, comp, densidade) {
        if (!esp || !larg || !comp) return 0;
        return (esp / 1000) * (larg / 1000) * (comp / 1000) * densidade;
    }

    static calcularPesoRedonda(diam, comp, densidade) {
        if (!diam || !comp) return 0;
        const raio = (diam / 1000) / 2;
        return Math.PI * raio * raio * (comp / 1000) * densidade;
    }
}

const memoizedCalcular = Utils.memoize(CalculationServiceBase.calcular);

export class CalculationService extends CalculationServiceBase {
    static calcular(itemOrcamento, template, priceController) {
        return memoizedCalcular(itemOrcamento, template, priceController);
    }
}

export class CuttingOptimizer {

    static otimizar(pecas, comprimentoBarraPadrao = CONFIG.BARRA_PADRAO) {
        if (!pecas || pecas.length === 0) {
            return { barras: 0, desperdicio: 0 };
        }

        const pecasOrdenadas = [...pecas].sort((a, b) => b - a);
        const barrasUtilizadas = [];

        for (const peca of pecasOrdenadas) {
            if (peca > comprimentoBarraPadrao) {
                barrasUtilizadas.push({ pecas: [peca], ocupado: peca, sobra: 0, especial: true });
                continue;
            }

            let melhorBarra = null;
            let menorSobra = comprimentoBarraPadrao;

            for (const barra of barrasUtilizadas) {
                if (barra.especial) continue;

                const sobraAtual = comprimentoBarraPadrao - barra.ocupado - peca;
                if (sobraAtual >= 0 && sobraAtual < menorSobra) {
                    melhorBarra = barra;
                    menorSobra = sobraAtual;
                }
            }

            if (melhorBarra) {
                melhorBarra.pecas.push(peca);
                melhorBarra.ocupado += peca;
                melhorBarra.sobra = comprimentoBarraPadrao - melhorBarra.ocupado;
            } else {
                barrasUtilizadas.push({
                    pecas: [peca],
                    ocupado: peca,
                    sobra: comprimentoBarraPadrao - peca,
                    especial: false
                });
            }
        }

        const desperdicioTotal = barrasUtilizadas.reduce((soma, barra) => soma + (barra.especial ? 0 : barra.sobra), 0);
        const comprimentoTotalUtilizado = barrasUtilizadas.length * comprimentoBarraPadrao;
        const percentualDesperdicio = comprimentoTotalUtilizado > 0 ? (desperdicioTotal / comprimentoTotalUtilizado) * 100 : 0;

        return {
            barras: barrasUtilizadas.length,
            desperdicio: percentualDesperdicio,
            detalhes: barrasUtilizadas
        };
    }
}


export function separarMateriais(todosMateriais, ehDegrau) {
    if (!ehDegrau) {
        return { barras: todosMateriais, chapas: {} };
    }

    const barras = {};
    const chapas = {};

    Object.entries(todosMateriais).forEach(([nomeMaterial, dadosMaterial]) => {
        if (dadosMaterial.peso > 0) {
            if (nomeMaterial === 'chapaLateral' || nomeMaterial === 'chapaXadrez') {
                chapas[nomeMaterial] = dadosMaterial;
            } else {
                barras[nomeMaterial] = dadosMaterial;
            }
        }
    });

    return { barras, chapas };
}