export class DOM {
    static getElementById(idElemento) {
        return document.getElementById(idElemento);
    }

    static createElement(nomeTag, classes = "", conteudoHtml = "") {
        const elemento = document.createElement(nomeTag);
        if (classes) {
            elemento.className = classes;
        }
        if (conteudoHtml) {
            elemento.innerHTML = conteudoHtml;
        }
        return elemento;
    }
}