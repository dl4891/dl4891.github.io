export class NavigationController {
    constructor() {
        this.abaAtiva = "templates";
        this.manipuladoresAbas = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        const abas = document.querySelectorAll(".main-tabs li[data-tab]");
        abas.forEach(abaElemento => {
            abaElemento.addEventListener("click", () => {
                const nomeAba = abaElemento.dataset.tab;
                this.switchTab(nomeAba);
            });
        });
    }

    registerTabHandler(nomeAba, manipulador) {
        this.manipuladoresAbas[nomeAba] = manipulador;
    }

    switchTab(nomeAba) {
        if (this.abaAtiva !== nomeAba && nomeAba) {
            this.updateTabUI(nomeAba);

            if (this.manipuladoresAbas[nomeAba]) {
                this.manipuladoresAbas[nomeAba]();
            }

            this.abaAtiva = nomeAba;
        }
    }

    updateTabUI(nomeAbaAtiva) {
        document.querySelectorAll(".main-tabs li").forEach(aba => {
            aba.classList.remove("is-active");
        });
        document.querySelectorAll(".tab-content").forEach(conteudo => {
            conteudo.classList.remove("active");
        });

        const abaElemento = document.querySelector(`[data-tab="${nomeAbaAtiva}"]`);
        const conteudoElemento = document.getElementById(`${nomeAbaAtiva}-content`);

        if (abaElemento && conteudoElemento) {
            abaElemento.classList.add("is-active");
            conteudoElemento.classList.add("active");
        }
    }

    getCurrentTab() {
        return this.abaAtiva;
    }
}