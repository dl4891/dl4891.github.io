export class Utils {
    static debounce(funcao, atraso) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                clearTimeout(timeoutId); // Limpa o timeout antes de executar
                funcao(...args);
            }, atraso);
        };
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    static sanitizeInput(texto) {
        return texto.toString().trim().replace(/[<>]/g, '');
    }

    static isValidNumber(valor) {
        return !isNaN(valor) && isFinite(valor) && valor !== null && valor !== '';
    }

    static toSafeNumber(valor, valorPadrao = 0) {
        const numero = parseFloat(valor);
        return this.isValidNumber(numero) ? numero : valorPadrao;
    }

    static capitalize(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    static truncateText(texto, maxLength) {
        return texto.length > maxLength ? texto.slice(0, maxLength) + '...' : texto;
    }

    static memoize(fn) {
        const cache = new Map();
        return function(...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = fn.apply(this, args);
            cache.set(key, result);
            return result;
        };
    }
}