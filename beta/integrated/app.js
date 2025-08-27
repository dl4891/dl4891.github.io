import { Application } from '../Application.js';

class IntegratedApplication {
    constructor() {
        this.app = null;
        this.initializeApp();
    }

    async initializeApp() {
        try {
            // A instância da aplicação agora é criada a partir da nova classe Application
            this.app = new Application();
            this.setupErrorHandling();
        } catch (error) {
            console.error("Erro fatal durante a inicialização:", error);
            this.showInitializationError(error);
        }
    }

    setupErrorHandling() {
        window.addEventListener('unhandledrejection', (event) => {
            console.error("Rejeição de Promise não tratada:", event.reason);
            const errorMessage = (event.reason instanceof Error) ? event.reason.message : 'Erro desconhecido.';
            if (this.app && this.app.notifications) {
                this.app.notifications.show(`Ocorreu um erro inesperado: ${errorMessage}. Tente recarregar a página.`, "danger", 10000);
            } else {
                alert(`Ocorreu um erro inesperado: ${errorMessage}. Tente recarregar a página.`);
            }
            event.preventDefault();
        });
    }

    showInitializationError(error) {
        const errorContainer = document.querySelector('.tab-content-container') || document.body;
        errorContainer.innerHTML = `
            <div class="notification is-danger">
                <h4 class="title is-4">Erro de Inicialização</h4>
                <p>Não foi possível inicializar a aplicação. Por favor, recarregue a página.</p>
                <details style="margin-top: 1rem;">
                    <summary>Detalhes técnicos</summary>
                    <pre style="margin-top: 0.5rem; padding: 1rem; background: #f5f5f5; border-radius: 4px; overflow-x: auto;">
${error.message}
${error.stack}
                    </pre>
                </details>
                <button class="button is-primary" onclick="window.location.reload()">
                    <i class="fas fa-sync-alt"></i> Recarregar Página
                </button>
            </div>
        `;
    }
}

// Inicia a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new IntegratedApplication();
    });
} else {
    new IntegratedApplication();
}