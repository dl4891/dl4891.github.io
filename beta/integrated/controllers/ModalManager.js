export class ModalManager {
    constructor() {
        this.infoModal = document.getElementById('modal-info');
        this.confirmationModal = document.getElementById('modal-confirmation');
        this._setupEventListeners();
    }

    /**
     * Configura listeners globais para os modais, como fechar com a tecla 'Esc'.
     * @private
     */
    _setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                if (this.infoModal.classList.contains('is-active')) {
                    this._closeInfoModal();
                }
                if (this.confirmationModal.classList.contains('is-active')) {
                    this._closeConfirmationModal();
                }
            }
        });
    }

    /**
     * Exibe um modal informativo.
     * @param {object} options - Opções para o modal.
     * @param {string} options.title - O título do modal.
     * @param {string} options.message - O conteúdo HTML da mensagem.
     * @param {Function} [options.onOk] - Callback opcional executado ao fechar.
     */
    showInfo({ title, message, onOk }) {
        const modalTitle = this.infoModal.querySelector('.modal-card-title');
        const modalContent = this.infoModal.querySelector('.modal-card-body');
        const okBtn = this.infoModal.querySelector('.modal-card-foot .button');

        modalTitle.innerHTML = `<i class="fas fa-info-circle mr-2"></i> ${title}`;
        modalContent.innerHTML = message;

        // Clona o botão para remover listeners antigos e evitar duplicação de eventos
        const newOkBtn = okBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOkBtn, okBtn);

        newOkBtn.onclick = () => {
            this._closeInfoModal();
            if (typeof onOk === 'function') {
                onOk();
            }
        };

        this.infoModal.querySelectorAll('.delete, .modal-background').forEach(el => {
            el.onclick = () => this._closeInfoModal();
        });

        this.infoModal.classList.add('is-active');
        newOkBtn.focus();
    }

    /**
     * Exibe um modal de confirmação.
     * @param {object} options - Opções para o modal.
     * @param {string} options.title - O título do modal.
     * @param {string} options.message - O conteúdo HTML da mensagem.
     * @param {string} [options.confirmText='Confirmar'] - Texto do botão de confirmação.
     * @param {string} [options.cancelText='Cancelar'] - Texto do botão de cancelamento.
     * @param {string} [options.type='is-primary'] - Classe de cor do botão (is-primary, is-danger, etc.).
     * @param {Function} options.onConfirm - Callback executado ao confirmar.
     */
    showConfirm({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', type = 'is-primary', onConfirm }) {
        const modalTitle = this.confirmationModal.querySelector('.modal-card-title');
        const modalContent = this.confirmationModal.querySelector('.modal-card-body');
        const confirmBtn = this.confirmationModal.querySelector('#confirmation-confirm-btn');
        const cancelBtn = this.confirmationModal.querySelector('#confirmation-cancel-btn');

        // Adiciona ícone com base no tipo
        let icon = 'fa-question-circle';
        if (type === 'is-danger') icon = 'fa-exclamation-triangle';
        if (type === 'is-warning') icon = 'fa-exclamation-circle';

        modalTitle.innerHTML = `<i class="fas ${icon} mr-2"></i> ${title}`;
        modalContent.innerHTML = message;

        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        newConfirmBtn.textContent = confirmText;
        newCancelBtn.textContent = cancelText;

        // Limpa classes de cor antigas e adiciona a nova
        newConfirmBtn.className = 'button'; // Reseta classes
        newConfirmBtn.classList.add(type);

        newConfirmBtn.onclick = () => {
            this._closeConfirmationModal();
            if (typeof onConfirm === 'function') {
                onConfirm();
            }
        };

        newCancelBtn.onclick = () => this._closeConfirmationModal();

        this.confirmationModal.querySelectorAll('.delete, .modal-background').forEach(el => {
            el.onclick = () => this._closeConfirmationModal();
        });

        this.confirmationModal.classList.add('is-active');
        newConfirmBtn.focus();
    }

    _closeInfoModal() {
        this.infoModal.classList.remove('is-active');
    }

    _closeConfirmationModal() {
        this.confirmationModal.classList.remove('is-active');
    }
}