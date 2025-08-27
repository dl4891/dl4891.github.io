import { Utils } from './services/utils-service.js';

export class Validator {
    constructor() {
        this.rules = {};
        this.customValidators = {};
    }

    setRules(newRules) {
        this.rules = { ...this.rules, ...newRules };
    }

    addCustomValidator(name, validatorFunction) {
        this.customValidators[name] = validatorFunction;
    }

    validateField(fieldElement, value = null) {
        const valorAtual = value !== null ? value : fieldElement.value;
        const fieldId = fieldElement.id;
        const fieldRules = this.rules[fieldId];

        if (!fieldRules) return true; // Sem regras, campo é válido

        const errorMessages = this.checkRules(valorAtual, fieldRules, fieldElement);
        this.updateFieldUI(fieldElement, errorMessages);
        return errorMessages.length === 0;
    }

    validateForm(formElement) {
        const requiredFields = formElement.querySelectorAll('input[required], select[required]');
        let isFormValid = true;
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    checkRules(value, rules, fieldElement = null) {
        const errors = [];
        if (rules.required && this.isEmpty(value)) {
            errors.push("Campo obrigatório");
            return errors; // Não continua se for obrigatório e vazio
        }

        if (this.isEmpty(value)) return errors; // Se não for obrigatório, não valida mais nada se vazio

        if (rules.min !== undefined && Number(value) < rules.min) {
            errors.push(`Valor mínimo: ${rules.min}`);
        }
        if (rules.max !== undefined && Number(value) > rules.max) {
            errors.push(`Valor máximo: ${rules.max}`);
        }
        if (rules.minLength && value.length < rules.minLength) {
            errors.push(`Mínimo ${rules.minLength} caracteres`);
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(`Máximo ${rules.maxLength} caracteres`);
        }
        if (rules.custom && fieldElement) {
            const customErrors = rules.custom.map(validatorName => {
                const validatorFunc = this.customValidators[validatorName];
                return validatorFunc ? validatorFunc(value, fieldElement) : null;
            }).filter(error => error !== null);
            errors.push(...customErrors);
        }
        return errors;
    }

    updateFieldUI(fieldElement, errorMessages) {
        const helpElement = this.getHelpElement(fieldElement);
        if (errorMessages.length > 0) {
            fieldElement.classList.add('field-error');
            if (helpElement) {
                helpElement.textContent = errorMessages[0];
                helpElement.style.display = 'block';
            }
        } else {
            fieldElement.classList.remove('field-error');
            if (helpElement) {
                helpElement.style.display = 'none';
            }
        }
    }

    getHelpElement(fieldElement) {
        const fieldContainer = fieldElement.closest('.field');
        return fieldContainer ? fieldContainer.querySelector('.help') : null;
    }

    isEmpty(value) {
        return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
    }

    clearFieldValidation(fieldElement) {
        fieldElement.classList.remove('field-error');
        const helpElement = this.getHelpElement(fieldElement);
        if (helpElement) {
            helpElement.style.display = 'none';
        }
    }

    clearFormValidation(formElement) {
        formElement.querySelectorAll('input, select').forEach(field => {
            this.clearFieldValidation(field);
        });
    }

    setupRealTimeValidation(formElement, delay = 300) {
        const fields = formElement.querySelectorAll('input, select');
        fields.forEach(field => {
            const debouncedValidation = Utils.debounce(() => this.validateField(field), delay);

            if (field.type !== 'select-one') {
                field.addEventListener('input', debouncedValidation);
            }
            field.addEventListener('blur', () => this.validateField(field));
            if (field.type === 'select-one') {
                field.addEventListener('change', () => this.validateField(field));
            }
        });
    }

    showCustomError(fieldElement, message) {
        this.updateFieldUI(fieldElement, [message]);
    }

    hasErrors(formElement) {
        return formElement.querySelectorAll('.field-error').length > 0;
    }
}


export class BusinessValidator extends Validator {
    constructor() {
        super();
        this.setupBusinessRules();
        this.setupCustomValidators();
    }

    async validateLogoFile(file) {
        if (!file) {
            return { isValid: false, message: "Nenhum arquivo selecionado." };
        }

        const MAX_SIZE_MB = 2;
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            return { isValid: false, message: `O arquivo é muito grande. O tamanho máximo é de ${MAX_SIZE_MB}MB.` };
        }

        const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
        const buffer = await file.slice(0, 8).arrayBuffer();
        const view = new Uint8Array(buffer);

        if (view.length < 8 || !view.every((byte, index) => byte === PNG_SIGNATURE[index])) {
            return { isValid: false, message: "Arquivo inválido. Apenas imagens no formato PNG são permitidas." };
        }

        const MAX_DIMENSION = 2000;
        try {
            const image = await new Promise((resolve, reject) => {
                const img = new Image();
                const objectURL = URL.createObjectURL(file);
                img.onload = () => {
                    URL.revokeObjectURL(objectURL);
                    resolve(img);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(objectURL);
                    reject();
                };
                img.src = objectURL;
            });

            if (image.width > MAX_DIMENSION || image.height > MAX_DIMENSION) {
                return { isValid: false, message: `A imagem é muito grande. As dimensões máximas são ${MAX_DIMENSION}x${MAX_DIMENSION} pixels.` };
            }

        } catch (error) {
            return { isValid: false, message: "O arquivo parece ser um PNG corrompido ou não pôde ser lido." };
        }

        return { isValid: true, message: "Arquivo válido." };
    }

    setupBusinessRules() {
        this.setRules({
            'template-nome': { required: true, minLength: 1, maxLength: 50 },
            'bp-esp': { required: true, min: 2, max: 10, custom: ['portanteValidation'] },
            'bp-larg': { required: true, min: 20, max: 100, custom: ['portanteValidation'] },
            'bl-diam': { min: 0, max: 9.99, custom: ['ligacaoValidation'] },
            'bl-esp': { min: 0, max: 10, custom: ['ligacaoValidation'] },
            'bl-larg': { min: 0, max: 100, custom: ['ligacaoValidation'] },
            'bf-esp': { required: true, min: 2, max: 10, custom: ['fechamentoValidation'] },
            'bf-larg': { required: true, min: 20, max: 100, custom: ['fechamentoValidation'] },
            'malha-menor': { required: true, min: 20, max: 150, custom: ['malhaValidation'] },
            'malha-maior': { required: true, min: 20, max: 150, custom: ['malhaValidation'] },
            'densidade': { required: true, min: 7000, max: 9000 },
            'margem': { required: true, min: 0, max: 50 },
            'select-template': { required: true },
            'item-quantidade': { required: true, min: 1, max: 9999 },
            'item-largura': { required: true, min: 50, max: 6000 },
            'item-comprimento': { required: true, min: 50, max: 6000 },
            'item-descricao': { maxLength: 100 },
            'preco-mao-obra': { required: true, min: 0, max: 1000 },
            'preco-galvanizacao': { min: 0, max: 1000 },
            'preco-chata-padrao': { required: true, min: 0, max: 100 },
            'preco-redonda-padrao': { required: true, min: 0, max: 100 },
            'icmsMaterial': { required: true, min: 0, max: 100 },
            'ipiMaterial': { required: true, min: 0, max: 100 },
            'lucroLiquido': { required: true, min: 0, max: 100 },
            'despesasFixas': { required: true, min: 0, max: 100 },
            'proposta-client-name': { required: true, minLength: 3 },
            'proposta-client-uf': { required: true },
            'proposta-quote-number': { required: true },
        });
    }

    setupCustomValidators() {
        this.addCustomValidator('malhaValidation', (_, fieldElement) => {
            const form = fieldElement.closest('form');
            if (!form) return null;
            const malhaMenor = Utils.toSafeNumber(form.querySelector('#malha-menor')?.value);
            const malhaMaior = Utils.toSafeNumber(form.querySelector('#malha-maior')?.value);
            if (malhaMenor > malhaMaior) {
                return "Malha menor não pode ser maior que a malha maior";
            }
            return null;
        });

        this.addCustomValidator('portanteValidation', (_, fieldElement) => {
            const form = fieldElement.closest('form');
            if (!form) return null;
            const espPortante = Utils.toSafeNumber(form.querySelector('#bp-esp')?.value);
            const malhaMenor = Utils.toSafeNumber(form.querySelector('#malha-menor')?.value);
            if (malhaMenor > 0 && espPortante > (0.5 * malhaMenor)) {
                return `Espessura portante não pode exceder 50% da malha menor (${0.5 * malhaMenor}mm)`;
            }
            return null;
        });

        this.addCustomValidator('fechamentoValidation', (_, fieldElement) => {
            const form = fieldElement.closest('form');
            if (!form) return null;
            const espPortante = Utils.toSafeNumber(form.querySelector('#bp-esp')?.value);
            const largPortante = Utils.toSafeNumber(form.querySelector('#bp-larg')?.value);
            const espFechamento = Utils.toSafeNumber(form.querySelector('#bf-esp')?.value);
            const largFechamento = Utils.toSafeNumber(form.querySelector('#bf-larg')?.value);
            const malhaMenor = Utils.toSafeNumber(form.querySelector('#malha-menor')?.value);

            if (fieldElement.id === 'bf-esp' && espPortante > 0 && espFechamento < espPortante) {
                return `Espessura fechamento deve ser ≥ espessura portante (${espPortante}mm)`;
            }
            if (fieldElement.id === 'bf-larg' && largPortante > 0 && largFechamento < largPortante) {
                return `Largura fechamento deve ser ≥ largura portante (${largPortante}mm)`;
            }
            if (fieldElement.id === 'bf-esp' && malhaMenor > 0 && espFechamento > (0.5 * malhaMenor)) {
                return `Espessura fechamento não pode exceder 50% da malha menor (${0.5 * malhaMenor}mm)`;
            }
            return null;
        });

        this.addCustomValidator('ligacaoValidation', (_, fieldElement) => {
            const form = fieldElement.closest('form');
            if (!form) return null;

            const erroLigacao = this.validateLigacaoFields(form);
            if (erroLigacao) return erroLigacao;

            const malhaMaior = Utils.toSafeNumber(form.querySelector('#malha-maior')?.value);
            if (malhaMaior > 0) {
                const limite = 0.5 * malhaMaior;
                const diamLigacao = Utils.toSafeNumber(form.querySelector('#bl-diam')?.value);
                const espLigacao = Utils.toSafeNumber(form.querySelector('#bl-esp')?.value);
                if (diamLigacao > limite) return `Diâmetro ligação não pode exceder 50% da malha maior (${limite}mm)`;
                if (espLigacao > limite) return `Espessura ligação não pode exceder 50% da malha maior (${limite}mm)`;
            }
            return null;
        });
    }

    validateLigacaoFields(form) {
        const diam = Utils.toSafeNumber(form.querySelector('#bl-diam')?.value);
        const esp = Utils.toSafeNumber(form.querySelector('#bl-esp')?.value);
        const larg = Utils.toSafeNumber(form.querySelector('#bl-larg')?.value);

        if (diam !== 0 && (diam < 2 || diam >= 10)) return "Diâmetro deve ser 0 ou entre 2 e 9.99mm";
        if (esp !== 0 && (esp < 2 || esp > 10)) return "Espessura chata deve ser 0 ou entre 2 e 10mm";
        if (larg !== 0 && (larg < 2 || larg > 100)) return "Largura chata deve ser 0 ou entre 2 e 100mm";

        const usaChataEsp = esp >= 2;
        const usaChataLarg = larg >= 2;

        if (diam >= 2 && (esp > 0 || larg > 0)) return "Se usar barra redonda, espessura e largura chata devem ser 0";
        if (usaChataEsp || usaChataLarg) {
            if (diam > 0) return "Se usar barra chata, diâmetro deve ser 0";
            if (!usaChataEsp || !usaChataLarg) return "Para barra chata, ambas dimensões devem ser ≥ 2mm";
        }

        if (diam === 0 && esp === 0 && larg === 0) {
            return "Defina pelo menos um tipo de barra de ligação";
        }
        return null;
    }

    validateGradeTemplate(templateData) {
        const erros = [];

        if (templateData.bp_esp < 2 || templateData.bp_esp > 10) erros.push("Espessura portante deve estar entre 2 e 10mm");
        if (templateData.bp_larg < 20 || templateData.bp_larg > 100) erros.push("Largura portante deve estar entre 20 e 100mm");
        if (templateData.bf_esp < templateData.bp_esp) erros.push(`Espessura fechamento deve ser ≥ portante (${templateData.bp_esp}mm)`);
        if (templateData.bf_larg < templateData.bp_larg) erros.push(`Largura fechamento deve ser ≥ portante (${templateData.bp_larg}mm)`);
        if (templateData.malha_menor < 20 || templateData.malha_menor > 150) erros.push("Malha menor deve estar entre 20 e 150mm");
        if (templateData.malha_maior < 20 || templateData.malha_maior > 150) erros.push("Malha maior deve estar entre 20 e 150mm");
        if (templateData.malha_menor > templateData.malha_maior) erros.push("Malha menor não pode ser maior que a malha maior");

        const limiteMalhaMenor = 0.5 * templateData.malha_menor;
        if (templateData.bp_esp > limiteMalhaMenor) erros.push(`Espessura portante não pode exceder 50% da malha menor (${limiteMalhaMenor}mm)`);
        if (templateData.bf_esp > limiteMalhaMenor) erros.push(`Espessura fechamento não pode exceder 50% da malha menor (${limiteMalhaMenor}mm)`);

        const limiteMalhaMaior = 0.5 * templateData.malha_maior;
        if (templateData.bl_diam > limiteMalhaMaior) erros.push(`Diâmetro ligação não pode exceder 50% da malha maior (${limiteMalhaMaior}mm)`);
        if (templateData.bl_esp > limiteMalhaMaior) erros.push(`Espessura ligação não pode exceder 50% da malha maior (${limiteMalhaMaior}mm)`);

        const erroLigacao = this.validateLigacaoData(templateData);
        if (erroLigacao) erros.push(erroLigacao);

        if (templateData.precosCustomizados && (!templateData.customMaoObra || templateData.customMaoObra <= 0)) {
            erros.push("Preço customizado de mão de obra obrigatório");
        }

        if (templateData.isDegrau) {
            this.validateDegrauFields(templateData, erros);
        }

        return erros;
    }

    validateClampTemplate(clampData) {
        const erros = [];
        if (!clampData.nome || clampData.nome.trim().length === 0) {
            erros.push("Nome do template é obrigatório");
        }
        if (clampData.pesoUnitario <= 0 || !Utils.isValidNumber(clampData.pesoUnitario)) {
            erros.push("Peso unitário final deve ser um número maior que zero.");
        }

        for (const category of Object.values(clampData.costs)) {
            for (const key of Object.keys(category)) {
                const value = category[key];
                if (value === null || value === '' || isNaN(value) || value < 0) {
                    erros.push(`O custo de "${key}" deve ser um número válido (≥ 0).`);
                }
            }
        }
        return [...new Set(erros)];
    }


    validateLigacaoData(templateData) {
        const diam = Utils.toSafeNumber(templateData.bl_diam);
        const esp = Utils.toSafeNumber(templateData.bl_esp);
        const larg = Utils.toSafeNumber(templateData.bl_larg);

        if (diam !== 0 && (diam < 2 || diam >= 10)) return "Diâmetro deve ser 0 ou entre 2 e 9.99mm";
        if (esp !== 0 && (esp < 2 || esp > 10)) return "Espessura chata deve ser 0 ou entre 2 e 10mm";
        if (larg !== 0 && (larg < 2 || larg > 100)) return "Largura chata deve ser 0 ou entre 2 e 100mm";

        const usaChataEsp = esp >= 2;
        const usaChataLarg = larg >= 2;

        if (diam >= 2 && (esp > 0 || larg > 0)) return "Se usar barra redonda, espessura e largura chata devem ser 0";
        if (usaChataEsp || usaChataLarg) {
            if (diam > 0) return "Se usar barra chata, diâmetro deve ser 0";
            if (!usaChataEsp || !usaChataLarg) return "Para barra chata, ambas dimensões devem ser ≥ 2mm";
        }

        if (diam === 0 && esp === 0 && larg === 0) return "Defina pelo menos um tipo de barra de ligação";
        return null;
    }

    validateDegrauFields(templateData, erros) {
        if (!templateData.chapaLateralEsp || templateData.chapaLateralEsp <= 0) erros.push("Espessura da chapa lateral obrigatória para degraus");
        if (!templateData.chapaLateralLarg || templateData.chapaLateralLarg <= 0) erros.push("Largura da chapa lateral obrigatória para degraus");

        if (templateData.incluirChapaXadrez) {
            if (!templateData.chapaXadrezEsp || templateData.chapaXadrezEsp <= 0) erros.push("Espessura da chapa xadrez obrigatória quando incluída");
            if (!templateData.chapaXadrezLarg || templateData.chapaXadrezLarg <= 0) erros.push("Largura da chapa xadrez obrigatória quando incluída");
            if (!templateData.chapaXadrezAjuste || templateData.chapaXadrezAjuste < 1) erros.push("Ajuste de peso da chapa xadrez deve ser >= 1");
        }
    }

    validateBudgetItem(itemData, todosTemplates) {
        const erros = [];
        const template = todosTemplates.find(t => t.id === itemData.templateId);

        if (!template) {
            erros.push("Template selecionado não existe");
        } else {
            if (template.templateType === 'grade') {
                if (itemData.largura < 100 || itemData.comprimento < 100) erros.push("Dimensões muito pequenas (mínimo 100mm)");
                if (itemData.largura > 6000 || itemData.comprimento > 6000) erros.push("Dimensões muito grandes (máximo 6000mm)");
                if (itemData.largura < (2 * template.malha_maior)) erros.push("Largura deve ser pelo menos 2x a malha maior");
                if (itemData.comprimento < (2 * template.malha_menor)) erros.push("Comprimento deve ser pelo menos 2x a malha menor");
                if (template.isDegrau && itemData.comprimento < 200) erros.push("Comprimento mínimo de 200mm para degraus");
            }
        }

        return erros;
    }
}