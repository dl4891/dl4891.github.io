import { FormattingService } from "../services/FormattingService.js";
import { CONFIG } from "../../shared/config.js";

export class TemplateFactory {

    static createGradeFromFormData(formData, editingId = null) {
        const usaPrecosCustomizados = formData.precosCustomizados;
        const ehDegrau = formData.isDegrau;
        const incluiChapaXadrez = formData.incluirChapaXadrez;

        const templateData = {
            id: editingId || FormattingService.generateId(),
            templateType: 'grade',
            nome: FormattingService.sanitizeInput(formData.nome),
            superficie: formData.superficie || 'lisa',
            bp_esp: FormattingService.toSafeNumber(formData.bp_esp),
            bp_larg: FormattingService.toSafeNumber(formData.bp_larg),
            bl_diam: FormattingService.toSafeNumber(formData.bl_diam),
            bl_esp: FormattingService.toSafeNumber(formData.bl_esp),
            bl_larg: FormattingService.toSafeNumber(formData.bl_larg),
            bf_esp: FormattingService.toSafeNumber(formData.bf_esp),
            bf_larg: FormattingService.toSafeNumber(formData.bf_larg),
            malha_menor: FormattingService.toSafeNumber(formData.malha_menor),
            malha_maior: FormattingService.toSafeNumber(formData.malha_maior),
            tipoMalha: formData.tipoMalha,
            pesoCalcMode: formData.pesoCalcMode || 'real',
            densidade: FormattingService.toSafeNumber(formData.densidade, CONFIG.DENSIDADE_ACO),
            margem: FormattingService.toSafeNumber(formData.margem, CONFIG.MARGEM_PADRAO),
            precosCustomizados: usaPrecosCustomizados,
            customMaoObra: usaPrecosCustomizados ? FormattingService.toSafeNumber(formData.customMaoObra) : 0,
            customGalvanizacao: usaPrecosCustomizados ? FormattingService.toSafeNumber(formData.customGalvanizacao) : 0,
            isDegrau: ehDegrau,
            createdAt: (editingId && formData.createdAt) ? formData.createdAt : Date.now()
        };

        if (ehDegrau) {
            templateData.chapaLateralEsp = FormattingService.toSafeNumber(formData.chapaLateralEsp, 4.76);
            templateData.chapaLateralLarg = FormattingService.toSafeNumber(formData.chapaLateralLarg);
            templateData.incluirChapaXadrez = incluiChapaXadrez;

            if (incluiChapaXadrez) {
                templateData.chapaXadrezEsp = FormattingService.toSafeNumber(formData.chapaXadrezEsp, 3.18);
                templateData.chapaXadrezLarg = FormattingService.toSafeNumber(formData.chapaXadrezLarg);
                templateData.chapaXadrezAjuste = FormattingService.toSafeNumber(formData.chapaXadrezAjuste, 1.05);
            }
        }

        return templateData;
    }

    static createClampFromFormData(formData, editingId = null) {
        return {
            id: editingId || FormattingService.generateId(),
            templateType: 'clamp',
            nome: FormattingService.sanitizeInput(formData.nome),
            costs: {
                material: {
                    grapa: FormattingService.toSafeNumber(formData.custo_mat_grapa),
                    borboleta: FormattingService.toSafeNumber(formData.custo_mat_borboleta),
                    arruela: FormattingService.toSafeNumber(formData.custo_mat_arruela),
                    porca: FormattingService.toSafeNumber(formData.custo_mat_porca),
                    parafuso: FormattingService.toSafeNumber(formData.custo_mat_parafuso)
                },
                maoDeObra: {
                    grapa: FormattingService.toSafeNumber(formData.custo_mo_grapa),
                    borboleta: FormattingService.toSafeNumber(formData.custo_mo_borboleta)
                },
                galvanizacao: {
                    grapa: FormattingService.toSafeNumber(formData.custo_galv_grapa),
                    borboleta: FormattingService.toSafeNumber(formData.custo_galv_borboleta)
                }
            },
            pesoUnitario: FormattingService.toSafeNumber(formData.pesoUnitario),
            createdAt: (editingId && formData.createdAt) ? formData.createdAt : Date.now()
        };
    }


    static createDefault() {
        return {
            id: FormattingService.generateId(),
            templateType: 'grade',
            nome: "",
            superficie: "lisa",
            bp_esp: 3,
            bp_larg: 20,
            bl_diam: 0,
            bl_esp: 0,
            bl_larg: 0,
            bf_esp: 3,
            bf_larg: 20,
            malha_menor: 33,
            malha_maior: 66,
            tipoMalha: 'interna',
            pesoCalcMode: 'real',
            densidade: CONFIG.DENSIDADE_ACO,
            margem: CONFIG.MARGEM_PADRAO,
            precosCustomizados: false,
            customMaoObra: 0,
            customGalvanizacao: 0,
            isDegrau: false,
            createdAt: Date.now()
        };
    }

    static validateGradeTemplate(templateData) {
        const erros = [];

        if (!templateData.nome || templateData.nome.trim().length === 0) {
            erros.push("Nome do template é obrigatório");
        }
        if (templateData.bp_esp <= 0) {
            erros.push("Espessura da barra portante deve ser maior que 0");
        }
        if (templateData.bp_larg <= 0) {
            erros.push("Largura da barra portante deve ser maior que 0");
        }
        if (templateData.bf_esp <= 0) {
            erros.push("Espessura do fechamento deve ser maior que 0");
        }
        if (templateData.bf_larg <= 0) {
            erros.push("Largura do fechamento deve ser maior que 0");
        }
        if ((!templateData.bl_diam || templateData.bl_diam <= 0) && (!templateData.bl_esp || templateData.bl_esp <= 0)) {
            erros.push("Defina pelo menos um tipo de barra de ligação");
        }
        if (templateData.malha_menor < 20 || templateData.malha_menor > 150) {
            erros.push("Malha menor deve estar entre 20 e 150mm");
        }
        if (templateData.malha_maior < 20 || templateData.malha_maior > 150) {
            erros.push("Malha maior deve estar entre 20 e 150mm");
        }
        if (templateData.malha_menor > templateData.malha_maior) {
            erros.push("Malha menor não pode ser maior que a malha maior");
        }

        if (templateData.precosCustomizados && (!templateData.customMaoObra || templateData.customMaoObra <= 0)) {
            erros.push("Preço customizado de mão de obra obrigatório");
        }

        if (templateData.isDegrau) {
            if (!templateData.chapaLateralEsp || templateData.chapaLateralEsp <= 0) {
                erros.push("Espessura da chapa lateral obrigatória para degraus");
            }
            if (!templateData.chapaLateralLarg || templateData.chapaLateralLarg <= 0) {
                erros.push("Largura da chapa lateral obrigatória para degraus");
            }

            if (templateData.incluirChapaXadrez) {
                if (!templateData.chapaXadrezEsp || templateData.chapaXadrezEsp <= 0) {
                    erros.push("Espessura da chapa xadrez obrigatória quando incluída");
                }
                if (!templateData.chapaXadrezLarg || templateData.chapaXadrezLarg <= 0) {
                    erros.push("Largura da chapa xadrez obrigatória quando incluída");
                }
                if (!templateData.chapaXadrezAjuste || templateData.chapaXadrezAjuste < 1) {
                    erros.push("Ajuste de peso da chapa xadrez deve ser >= 1");
                }
            }
        }


        return erros;
    }

    static validateClampTemplate(templateData) {
        const erros = [];
        if (!templateData.nome || templateData.nome.trim().length === 0) {
            erros.push("Nome do template é obrigatório");
        }
        if (templateData.pesoUnitario <= 0) {
            erros.push("Peso unitário final deve ser maior que zero.");
        }
        for (const category of Object.values(templateData.costs)) {
            for (const key of Object.keys(category)) {
                if (typeof category[key] !== 'number' || category[key] < 0) {
                    erros.push(`O custo de "${key}" deve ser um número válido.`);
                }
            }
        }
        return erros;
    }


    static createFromCSV(csvRow) {
        const usaPrecosCustomizados = csvRow.precosCustomizados?.toLowerCase() === 'true';
        const ehDegrau = csvRow.isDegrau?.toLowerCase() === 'true';
        const incluiChapaXadrez = csvRow.incluirChapaXadrez?.toLowerCase() === 'true';

        const templateData = {
            id: FormattingService.generateId(),
            templateType: 'grade',
            nome: FormattingService.sanitizeInput(csvRow.nome),
            // INÍCIO DA MODIFICAÇÃO
            superficie: csvRow.superficie?.toLowerCase() === 'serrilhada' ? 'serrilhada' : 'lisa',
            // FIM DA MODIFICAÇÃO
            bp_esp: FormattingService.toSafeNumber(csvRow.bp_esp),
            bp_larg: FormattingService.toSafeNumber(csvRow.bp_larg),
            bl_diam: FormattingService.toSafeNumber(csvRow.bl_diam),
            bl_esp: FormattingService.toSafeNumber(csvRow.bl_esp),
            bl_larg: FormattingService.toSafeNumber(csvRow.bl_larg),
            bf_esp: FormattingService.toSafeNumber(csvRow.bf_esp),
            bf_larg: FormattingService.toSafeNumber(csvRow.bf_larg),
            malha_menor: FormattingService.toSafeNumber(csvRow.malha_menor),
            malha_maior: FormattingService.toSafeNumber(csvRow.malha_maior),
            tipoMalha: csvRow.tipoMalha === 'interna' ? 'interna' : 'centro',
            pesoCalcMode: csvRow.pesoCalcMode === 'teorico' ? 'teorico' : 'real',
            densidade: FormattingService.toSafeNumber(csvRow.densidade, CONFIG.DENSIDADE_ACO),
            margem: FormattingService.toSafeNumber(csvRow.margem, CONFIG.MARGEM_PADRAO),
            precosCustomizados: usaPrecosCustomizados,
            customMaoObra: usaPrecosCustomizados ? FormattingService.toSafeNumber(csvRow.customMaoObra) : 0,
            customGalvanizacao: usaPrecosCustomizados ? FormattingService.toSafeNumber(csvRow.customGalvanizacao) : 0,
            isDegrau: ehDegrau,
            createdAt: Date.now()
        };

        if (ehDegrau) {
            templateData.chapaLateralEsp = FormattingService.toSafeNumber(csvRow.chapaLateralEsp, 4.76);
            templateData.chapaLateralLarg = FormattingService.toSafeNumber(csvRow.chapaLateralLarg);
            templateData.incluirChapaXadrez = incluiChapaXadrez;

            if (incluiChapaXadrez) {
                templateData.chapaXadrezEsp = FormattingService.toSafeNumber(csvRow.chapaXadrezEsp, 3.18);
                templateData.chapaXadrezLarg = FormattingService.toSafeNumber(csvRow.chapaXadrezLarg);
                templateData.chapaXadrezAjuste = FormattingService.toSafeNumber(csvRow.chapaXadrezAjuste, 1.05);
            }
        }

        return templateData;
    }
}