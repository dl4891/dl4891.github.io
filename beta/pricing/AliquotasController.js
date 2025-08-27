import { UF_DATA, UF_DATA_ORIGINAL } from "../shared/config.js";
import { PricingStorage } from "../shared/storage.js";

export class AliquotasController {
    constructor(notificationManager, appInstance) {
        this.notifications = notificationManager;
        this.app = appInstance; // Injeta a instância da aplicação
        this.storage = new PricingStorage();
        this.loadAliquotasFromStorage();
    }

    loadAliquotasFromStorage() {
        const aliquotasSalvas = this.storage.loadAliquotas();
        if (Object.keys(aliquotasSalvas).length > 0) {
            Object.keys(aliquotasSalvas).forEach(uf => {
                if (UF_DATA[uf]) {
                    UF_DATA[uf] = { ...UF_DATA[uf], ...aliquotasSalvas[uf] };
                }
            });
        }
    }

    saveAliquotasToStorage() {
        this.storage.saveAliquotas(UF_DATA);
    }

    toggleAliquotas() {
        const containerAliquotas = document.getElementById("aliquotasContainer");
        const botaoToggle = document.getElementById("toggleAliquotas");

        if (containerAliquotas.style.display === "none") {
            containerAliquotas.style.display = "block";
            botaoToggle.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar Alíquotas';
            this.populateAliquotasTable();
        } else {
            containerAliquotas.style.display = "none";
            botaoToggle.innerHTML = '<i class="fas fa-edit"></i> Editar Alíquotas';
        }
    }

    populateAliquotasTable() {
        const corpoTabela = document.getElementById("aliquotasTableBody");
        corpoTabela.innerHTML = "";

        Object.entries(UF_DATA).forEach(([uf, dados]) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td><strong>${uf}</strong></td>
                <td><input class="input is-small" type="number" step="0.0001" value="${dados.mva_grade}" data-uf="${uf}" data-field="mva_grade"></td>
                <td><input class="input is-small" type="number" step="0.01" value="${dados.aliq_int}" data-uf="${uf}" data-field="aliq_int"></td>
                <td><input class="input is-small" type="number" step="0.0001" value="${dados.mva_grampo}" data-uf="${uf}" data-field="mva_grampo"></td>
                <td><input class="input is-small" type="number" step="0.0001" value="${dados.mva_telas}" data-uf="${uf}" data-field="mva_telas"></td>
                <td><input class="input is-small" type="number" step="0.01" value="${dados.aliq_sp}" data-uf="${uf}" data-field="aliq_sp"></td>
                <td><button class="button is-small is-info js-reset-uf-btn" data-uf="${uf}"><i class="fas fa-undo"></i></button></td>
            `;
            corpoTabela.appendChild(linha);
        });

        // Adiciona event listeners aos novos botões
        corpoTabela.querySelectorAll('.js-reset-uf-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ufToReset = e.currentTarget.dataset.uf;
                this.resetUF(ufToReset);
            });
        });
    }

    salvarAliquotas() {
        const camposInput = document.querySelectorAll("#aliquotasTableBody input");
        let algumaAlteracao = false;

        camposInput.forEach(input => {
            const uf = input.dataset.uf;
            const campo = input.dataset.field;
            const valor = parseFloat(input.value) || 0;

            if (UF_DATA[uf][campo] !== valor) {
                UF_DATA[uf][campo] = valor;
                algumaAlteracao = true;
                input.classList.add("has-background-success-light");
                setTimeout(() => input.classList.remove("has-background-success-light"), 2000);
            }
        });

        if (algumaAlteracao) {
            this.saveAliquotasToStorage();
            document.dispatchEvent(new CustomEvent("aliquotasChanged"));
            this.notifications.show("Alíquotas salvas com sucesso!", "success");

            const botaoSalvar = document.getElementById("salvarAliquotas");
            if (botaoSalvar) {
                const conteudoOriginal = botaoSalvar.innerHTML;
                botaoSalvar.innerHTML = '<i class="fas fa-check"></i> Salvo!';
                botaoSalvar.classList.remove("is-success");
                botaoSalvar.classList.add("is-info");

                setTimeout(() => {
                    botaoSalvar.innerHTML = conteudoOriginal;
                    botaoSalvar.classList.remove("is-info");
                    botaoSalvar.classList.add("is-success");
                }, 2000);
            }
        } else {
            this.notifications.show("Nenhuma alteração detectada.", "info");
        }
    }

    resetAliquotas() {
        this.app.showConfirmation(
            'Restaurar Alíquotas',
            '<p>Deseja restaurar <strong>todas</strong> as alíquotas para os valores padrão? Esta ação não pode ser desfeita.</p>',
            () => {
                Object.keys(UF_DATA).forEach(uf => {
                    UF_DATA[uf] = JSON.parse(JSON.stringify(UF_DATA_ORIGINAL[uf]));
                });
                this.saveAliquotasToStorage();
                this.populateAliquotasTable();
                document.dispatchEvent(new CustomEvent("aliquotasChanged"));
                this.notifications.show("Alíquotas restauradas para valores padrão!", "info");
            },
            { confirmText: 'Restaurar Tudo', type: 'is-warning' }
        );
    }

    resetUF(uf) {
        this.app.showConfirmation(
            `Restaurar ${uf}`,
            `<p>Deseja restaurar as alíquotas de <strong>${uf}</strong> para os valores padrão?</p>`,
            () => {
                UF_DATA[uf] = JSON.parse(JSON.stringify(UF_DATA_ORIGINAL[uf]));
                this.saveAliquotasToStorage();
                this.populateAliquotasTable();
                document.dispatchEvent(new CustomEvent("aliquotasChanged"));
                this.notifications.show(`Alíquotas de ${uf} restauradas!`, "info");
            },
            { confirmText: 'Restaurar', type: 'is-info' }
        );
    }
}