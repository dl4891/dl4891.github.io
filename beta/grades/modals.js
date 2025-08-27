import { NOTIFICATION_TYPES } from "../shared/config.js";

export class ModalController {
    constructor(app, priceManager, validator, notificationManager) {
        this.app = app;
        this.priceManager = priceManager;
        this.validator = validator;
        this.notifications = notificationManager;
    }

    _openModal(modalId, title, formType, dadosEdicao = null) {
        const modalElemento = document.getElementById(modalId);
        const tituloModal = modalElemento.querySelector('.modal-card-title');
        const modalBody = modalElemento.querySelector('.modal-card-body');
        const saveButton = modalElemento.querySelector('.button.is-success');

        tituloModal.textContent = title;
        modalBody.innerHTML = '';

        const form = document.createElement('specific-price-form');
        form.type = formType;
        if (dadosEdicao) {
            form.priceData = dadosEdicao;
            form.isEditing = true;
            modalElemento.dataset.editing = 'true';
            modalElemento.dataset.originalDimensao = dadosEdicao.dimensao;
        } else {
            form.isEditing = false;
            modalElemento.dataset.editing = 'false';
        }

        modalBody.appendChild(form);

        form.addEventListener('save-price', (e) => this._handleSave(formType, e));
        form.addEventListener('close-modal', () => this.closeAll());

        saveButton.onclick = () => form.shadowRoot.querySelector('form').requestSubmit();

        // Adiciona listeners para fechar o modal
        modalElemento.querySelectorAll('.delete, .modal-background, .button:not(.is-success)').forEach(el => {
            el.onclick = () => this.closeAll();
        });

        modalElemento.classList.add('is-active');
    }

    openChataModal(dadosEdicao = null) {
        const title = dadosEdicao ? 'Editar Preço Específico - Chata' : 'Adicionar Preço Específico - Chata';
        this._openModal('modal-preco-chata', title, 'chata', dadosEdicao);
    }

    openRedondaModal(dadosEdicao = null) {
        const title = dadosEdicao ? 'Editar Preço Específico - Redonda' : 'Adicionar Preço Específico - Redonda';
        this._openModal('modal-preco-redonda', title, 'redonda', dadosEdicao);
    }

    openChapaLateralModal(dadosEdicao = null) {
        const title = dadosEdicao ? 'Editar Preço Específico - Chapa Lateral' : 'Adicionar Preço Específico - Chapa Lateral';
        this._openModal('modal-preco-chapa-lateral', title, 'chapa_lateral', dadosEdicao);
    }

    openChapaXadrezModal(dadosEdicao = null) {
        const title = dadosEdicao ? 'Editar Preço Específico - Chapa Xadrez' : 'Adicionar Preço Específico - Chapa Xadrez';
        this._openModal('modal-preco-chapa-xadrez', title, 'chapa_xadrez', dadosEdicao);
    }

    _handleSave(type, event) {
        const { data } = event.detail;
        switch (type) {
            case 'chata': this.saveChataPrice(data); break;
            case 'redonda': this.saveRedondaPrice(data); break;
            case 'chapa_lateral': this.saveChapaLateralPrice(data); break;
            case 'chapa_xadrez': this.saveChapaXadrezPrice(data); break;
        }
    }

    saveChataPrice(data) {
        const modal = document.getElementById('modal-preco-chata');
        const espessura = parseFloat(data.espessura);
        const largura = parseFloat(data.largura);
        const preco = parseFloat(data.preco);
        const dimensao = `${espessura}x${largura}`;
        const ehEdicao = modal.dataset.editing === 'true';
        const dimensaoOriginal = modal.dataset.originalDimensao;

        if ((!ehEdicao || dimensao !== dimensaoOriginal) && this.priceManager.getSpecificPrices()[`chata_${dimensao}`]) {
            this.notifications.show("Já existe um preço para esta dimensão de chata", NOTIFICATION_TYPES.WARNING);
            return;
        }

        this.priceManager.addSpecificPrice('chata', dimensao, preco, dimensaoOriginal);
        this.notifications.show(`Preço de chata ${ehEdicao ? 'atualizado' : 'adicionado'}!`, NOTIFICATION_TYPES.SUCCESS);
        this.closeAll();
    }

    saveRedondaPrice(data) {
        const modal = document.getElementById('modal-preco-redonda');
        const diametro = parseFloat(data.diametro);
        const preco = parseFloat(data.preco);
        const dimensao = diametro.toString();
        const ehEdicao = modal.dataset.editing === 'true';
        const dimensaoOriginal = modal.dataset.originalDimensao;

        if ((!ehEdicao || dimensao !== dimensaoOriginal) && this.priceManager.getSpecificPrices()[`redonda_${dimensao}`]) {
            this.notifications.show("Já existe um preço para este diâmetro", NOTIFICATION_TYPES.WARNING);
            return;
        }

        this.priceManager.addSpecificPrice('redonda', dimensao, preco, dimensaoOriginal);
        this.notifications.show(`Preço de redonda ${ehEdicao ? 'atualizado' : 'adicionado'}!`, NOTIFICATION_TYPES.SUCCESS);
        this.closeAll();
    }

    saveChapaLateralPrice(data) {
        const modal = document.getElementById('modal-preco-chapa-lateral');
        const espessura = parseFloat(data.espessura);
        const largura = parseFloat(data.largura);
        const preco = parseFloat(data.preco);
        const dimensao = `${espessura}x${largura}`;
        const ehEdicao = modal.dataset.editing === 'true';
        const dimensaoOriginal = modal.dataset.originalDimensao;

        if ((!ehEdicao || dimensao !== dimensaoOriginal) && this.priceManager.getSpecificPrices()[`chapa_lateral_${dimensao}`]) {
            this.notifications.show("Já existe um preço para esta dimensão de chapa lateral", NOTIFICATION_TYPES.WARNING);
            return;
        }

        this.priceManager.addSpecificPrice('chapa_lateral', dimensao, preco, dimensaoOriginal);
        this.notifications.show(`Preço de chapa lateral ${ehEdicao ? 'atualizado' : 'adicionado'}!`, NOTIFICATION_TYPES.SUCCESS);
        this.closeAll();
    }

    saveChapaXadrezPrice(data) {
        const modal = document.getElementById('modal-preco-chapa-xadrez');
        const espessura = parseFloat(data.espessura);
        const largura = parseFloat(data.largura);
        const preco = parseFloat(data.preco);
        const dimensao = `${espessura}x${largura}`;
        const ehEdicao = modal.dataset.editing === 'true';
        const dimensaoOriginal = modal.dataset.originalDimensao;

        if ((!ehEdicao || dimensao !== dimensaoOriginal) && this.priceManager.getSpecificPrices()[`chapa_xadrez_${dimensao}`]) {
            this.notifications.show("Já existe um preço para esta dimensão de chapa xadrez", NOTIFICATION_TYPES.WARNING);
            return;
        }

        this.priceManager.addSpecificPrice('chapa_xadrez', dimensao, preco, dimensaoOriginal);
        this.notifications.show(`Preço de chapa xadrez ${ehEdicao ? 'atualizado' : 'adicionado'}!`, NOTIFICATION_TYPES.SUCCESS);
        this.closeAll();
    }

    closeAll() {
        const modalIds = ['modal-preco-chata', 'modal-preco-redonda', 'modal-preco-chapa-lateral', 'modal-preco-chapa-xadrez'];
        modalIds.forEach(id => {
            const modal = document.getElementById(id);
            if(modal) {
                modal.classList.remove('is-active');
                const saveButton = modal.querySelector('.button.is-success');
                if(saveButton) saveButton.onclick = null;
            }
        });
    }

    editSpecificPrice(tipo, dimensao, preco) {
        const [espessura, largura] = dimensao.split('x');
        const dados = { espessura, largura, preco, dimensao };

        switch (tipo) {
            case 'chata':
                this.openChataModal(dados);
                break;
            case 'redonda':
                this.openRedondaModal({ diametro: dimensao, preco, dimensao });
                break;
            case 'chapa_lateral':
                this.openChapaLateralModal(dados);
                break;
            case 'chapa_xadrez':
                this.openChapaXadrezModal(dados);
                break;
        }
    }

    removeSpecificPrice(tipo, dimensao) {
        const tipoTraduzido = {
            'chata': 'chata', 'redonda': 'redonda',
            'chapa_lateral': 'chapa lateral', 'chapa_xadrez': 'chapa xadrez'
        }[tipo];

        this.app.showConfirmation(
            'Confirmar Remoção',
            `<p>Remover preço específico para <strong>${tipoTraduzido} ${dimensao}</strong>?</p>`,
            () => {
                this.priceManager.removeSpecificPrice(tipo, dimensao);
                this.notifications.show("Preço específico removido", NOTIFICATION_TYPES.SUCCESS);
            }
        );
    }

    openTemplateModal(templateId = null) {
        const modal = document.getElementById('modal-template-form');
        const modalTitle = document.getElementById('modal-template-title');
        const modalBody = document.getElementById('modal-template-body');
        const saveBtn = document.getElementById('modal-template-save-btn');
        const cancelBtn = document.getElementById('modal-template-cancel-btn');
        modalBody.innerHTML = '';

        const template = templateId ? this.app.templateController.edit(templateId) : null;
        const isEditing = !!template;
        modalTitle.textContent = isEditing ? `Editar Modelo: ${template.nome}` : 'Adicionar Novo Modelo';

        const renderForm = (type) => {
            modalBody.innerHTML = '';
            let formComponent;
            if (type === 'grade') {
                formComponent = document.createElement('template-item-form');
                if (isEditing && template.templateType === 'grade') formComponent.editingTemplate = template;
            } else {
                formComponent = document.createElement('clamp-template-form');
                if (isEditing && template.templateType === 'clamp') formComponent.editingTemplate = template;
            }

            formComponent.addEventListener('save-template', (e) => {
                const typeToSave = e.detail.templateType || 'grade';
                const dataToSave = e.detail.formData || e.detail;
                if (this.app.templateController.save(dataToSave, typeToSave)) {
                    this.closeTemplateModal();
                }
            });
            formComponent.addEventListener('clear-form', () => this.closeTemplateModal());
            saveBtn.onclick = () => formComponent._handleSubmit(new Event('submit'));
            modalBody.appendChild(formComponent);
        };

        if (isEditing) {
            renderForm(template.templateType);
        } else {
            modalBody.innerHTML = `<div class="field"><label class="label">Tipo de Modelo de Produto</label><div class="control" id="modal-template-type-selector"><label class="radio"><input type="radio" name="modal-template-type" value="grade" checked> Grade de Piso</label><label class="radio"><input type="radio" name="modal-template-type" value="clamp"> Grampo de Fixação</label></div></div><div id="modal-form-container"></div>`;
            const formContainer = document.getElementById('modal-form-container');
            const typeSelector = document.getElementById('modal-template-type-selector');
            const updateFormView = () => {
                const selectedType = typeSelector.querySelector('input:checked').value;
                formContainer.innerHTML = '';
                let formComponent = selectedType === 'grade' ? document.createElement('template-item-form') : document.createElement('clamp-template-form');
                formComponent.addEventListener('save-template', (e) => {
                    const typeToSave = e.detail.templateType || 'grade';
                    const dataToSave = e.detail.formData || e.detail;
                    if (this.app.templateController.save(dataToSave, typeToSave)) {
                        this.closeTemplateModal();
                    }
                });
                formComponent.addEventListener('clear-form', () => this.closeTemplateModal());
                saveBtn.onclick = () => formComponent._handleSubmit(new Event('submit'));
                formContainer.appendChild(formComponent);
            };
            typeSelector.addEventListener('change', updateFormView);
            updateFormView();
        }

        cancelBtn.onclick = () => this.closeTemplateModal();
        modal.querySelector('.modal-background').onclick = () => this.closeTemplateModal();
        modal.querySelector('.delete').onclick = () => this.closeTemplateModal();
        modal.classList.add('is-active');
    }

    closeTemplateModal() {
        const modal = document.getElementById('modal-template-form');
        modal.classList.remove('is-active');
        document.getElementById('modal-template-body').innerHTML = '';
        this.app.templateController.clearEditing();
    }
}