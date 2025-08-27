import { FormattingService } from "../services/FormattingService.js";

export class BudgetItemFactory {

    static createFromFormData(formData, todosTemplates) {
        const templateSelecionado = todosTemplates.find(template => template.id === formData.templateId);

        const quantidade = FormattingService.toSafeNumber(formData.quantidade);
        const largura = FormattingService.toSafeNumber(formData.largura);
        const comprimento = FormattingService.toSafeNumber(formData.comprimento);
        const descricaoInput = FormattingService.sanitizeInput(formData.descricao);

        // O campo 'descricao' agora armazena apenas o input do usuário.
        // A descrição padrão será gerada em outro local quando necessário.
        return {
            id: FormattingService.generateId(),
            templateId: formData.templateId,
            templateNome: templateSelecionado?.nome || "",
            quantidade: quantidade,
            largura: largura,
            comprimento: comprimento,
            descricao: descricaoInput, // Alterado para não usar mais o defaultDesc
            imprimirDescricao: formData.imprimirDescricao !== undefined ? formData.imprimirDescricao : false, // PADRÃO ALTERADO PARA FALSE
            referenciaTecnica: FormattingService.sanitizeInput(formData.referenciaTecnica || ''),
            createdAt: Date.now(),
            order: 0
        };
    }

    static validateBudgetItem(item, todosTemplates) {
        const erros = [];
        const template = todosTemplates.find(t => t.id === item.templateId);

        if (!template) {
            erros.push("Modelo selecionado não existe");
            return erros;
        }

        if (item.quantidade <= 0) {
            erros.push("Quantidade deve ser maior que 0");
        }

        if (template.templateType === 'grade') {
            if (item.largura < 100 || item.comprimento < 100) {
                erros.push("Dimensões muito pequenas (mínimo 100mm)");
            }
            if (item.largura > 6000 || item.comprimento > 6000) {
                erros.push("Dimensões muito grandes (máximo 6000mm)");
            }
            if (item.largura < (2 * template.malha_maior)) {
                erros.push("Largura deve ser pelo menos 2x a malha maior");
            }
            if (item.comprimento < (2 * template.malha_menor)) {
                erros.push("Comprimento deve ser pelo menos 2x a malha menor");
            }
            if (template.isDegrau && item.comprimento < 200) {
                erros.push("Comprimento mínimo de 200mm para degraus");
            }
        }

        return erros;
    }

    static validateDegrauUniqueness(item, itensDoOrcamento, todosTemplates, idEmEdicao = null) {
        const template = todosTemplates.find(t => t.id === item.templateId);

        if (template?.isDegrau) {
            const isAlreadyInBudget = itensDoOrcamento.some(
                budgetItem => budgetItem.templateId === item.templateId && budgetItem.id !== idEmEdicao
            );
            if (isAlreadyInBudget) {
                return [`Modelo "${template.nome}" (DEGRAU) já possui um item no orçamento. Modelos de degrau aceitam apenas 1 item.`];
            }
        }

        return [];
    }

    static createFromCSV(csvRow, todosTemplates) {
        const templateSelecionado = todosTemplates.find(template => template.nome === csvRow.templateNome);
        if (!templateSelecionado) {
            throw new Error(`Modelo "${csvRow.templateNome}" não encontrado.`);
        }

        const quantidade = FormattingService.toSafeNumber(csvRow.quantidade);
        const largura = FormattingService.toSafeNumber(csvRow.largura);
        const comprimento = FormattingService.toSafeNumber(csvRow.comprimento);
        const descricaoInput = FormattingService.sanitizeInput(csvRow.descricao);

        const imprimirDescricao = csvRow.imprimirDescricao?.toLowerCase() === 'true' ? true : false;

        return {
            id: FormattingService.generateId(),
            templateId: templateSelecionado.id,
            templateNome: templateSelecionado.nome,
            quantidade: quantidade,
            largura: largura,
            comprimento: comprimento,
            descricao: descricaoInput,
            imprimirDescricao: imprimirDescricao,
            referenciaTecnica: FormattingService.sanitizeInput(csvRow.referenciaTecnica || ''),
            createdAt: Date.now(),
            order: 0
        };
    }
}