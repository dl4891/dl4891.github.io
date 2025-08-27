export class FormattingService {

    static formatNumber(numero, casasDecimais = 2) {
        return Number(numero).toLocaleString('pt-BR', {
            minimumFractionDigits: casasDecimais,
            maximumFractionDigits: casasDecimais
        });
    }

    static formatInteger(numero) {
        return this.formatNumber(numero, 0);
    }

    static formatCurrency(valorMonetario) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorMonetario);
    }

    static formatPercentage(numero, casasDecimais = 2) {
        return (numero * 100).toFixed(casasDecimais) + '%';
    }

    static formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('pt-BR');
    }

    static formatRelativeTime(timestamp) {
        const diferenca = Date.now() - timestamp;
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        if (dias === 0) return 'Hoje';
        if (dias === 1) return 'Ontem';
        if (dias < 7) return `${dias} dias atrás`;
        if (dias < 30) return `${Math.floor(dias / 7)} semanas atrás`;
        return this.formatDate(timestamp);
    }

    static formatDimensionKey(tipo, espessura, largura, diametro) {
        if (tipo === 'redonda') {
            return `Ø${diametro}`;
        }
        return `${espessura}x${largura}`;
    }

    static formatDimensionDisplay(material) {
        if (material.tipo === 'redonda') {
            return {
                esp: `Ø${this.formatNumber(material.diam)}`,
                larg: '-'
            };
        }
        return {
            esp: this.formatNumber(material.esp),
            larg: this.formatNumber(material.larg)
        };
    }

    static groupPieces(pecas) {
        const contagemPecas = {};
        pecas.forEach(comprimento => {
            contagemPecas[comprimento] = (contagemPecas[comprimento] || 0) + 1;
        });

        return Object.entries(contagemPecas)
        .sort(([compA], [compB]) => parseInt(compB) - parseInt(compA))
        .map(([comprimento, quantidade]) => `${quantidade}x${comprimento}mm`)
        .join(', ');
    }

    static formatCompactLengths(comprimentos, limite = 3) {
        const comprimentosUnicos = [...new Set(comprimentos)].sort((a, b) => b - a);
        if (comprimentosUnicos.length > limite) {
            return `${comprimentosUnicos.slice(0, limite).join(', ')}...`;
        }
        return comprimentosUnicos.join(', ');
    }

    static getWasteClass(percentualDesperdicio) {
        if (percentualDesperdicio < 10) return 'waste-low';
        if (percentualDesperdicio < 20) return 'waste-medium';
        return 'waste-high';
    }

    static truncateText(texto, maxLength) {
        return texto.length > maxLength ? texto.slice(0, maxLength) + '...' : texto;
    }

    static capitalize(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    static sanitizeInput(input) {
        return input.toString().trim().replace(/[<>]/g, '');
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    static isValidNumber(valor) {
        return !isNaN(valor) && isFinite(valor) && valor !== null && valor !== '';
    }

    static toSafeNumber(valor, valorPadrao = 0) {
        const numero = parseFloat(valor);
        return this.isValidNumber(numero) ? numero : valorPadrao;
    }

    static getItemDisplayData(item, template, options = {}) {
        if (!item || !template) {
            return { title: 'Dados indisponíveis', detailsLine: '' };
        }

        const title = item.descricao ? item.descricao : `Modelo: ${template.nome}`;
        const isClamp = template.templateType === 'clamp';

        let detailsParts = [];
        if (item.descricao) {
            detailsParts.push(`Modelo: ${template.nome}`);
        }
        if (!options.excludeQty) {
            detailsParts.push(`Qtd: ${item.quantidade}`);
        }
        if (!isClamp && !options.excludeDims) {
            detailsParts.push(`Dimensões: ${item.largura}x${item.comprimento}mm`);
        }
        if (item.referenciaTecnica) {
            detailsParts.push(`Ref. Técnica: ${item.referenciaTecnica}`);
        }

        return {
            title: title,
            detailsLine: detailsParts.join(' | ')
        };
    }
}