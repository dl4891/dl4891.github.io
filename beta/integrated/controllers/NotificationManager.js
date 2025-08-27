import { DOM } from "../../shared/services/dom-service.js";

export class NotificationManager {
    constructor() {
        this.container = DOM.getElementById("notification-container");
    }

    show(mensagem, tipo = "info", duracao = 4000) {
        if (!this.container) {
            console.error("Container de notificações não encontrado.");
            return;
        }

        const notificacaoElemento = DOM.createElement("div", `notification is-${tipo} fade-in`);

        notificacaoElemento.innerHTML = `
            <button class="delete"></button>
            ${mensagem}
        `;

        // Adiciona o evento de clique no botão de fechar
        notificacaoElemento.querySelector('.delete').addEventListener('click', () => {
            notificacaoElemento.remove();
        });

        this.container.appendChild(notificacaoElemento);

        setTimeout(() => {
            if (notificacaoElemento.parentNode === this.container) {
                notificacaoElemento.remove();
            }
        }, duracao);
    }
}