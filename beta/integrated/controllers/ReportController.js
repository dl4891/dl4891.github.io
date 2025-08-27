import { ReportService } from "../../core/services/ReportService.js";
import { NOTIFICATION_TYPES } from "../../shared/config.js";
import { FormattingService } from "../../core/services/FormattingService.js";

export class ReportController {
    constructor(appInstance, notificationManager) {
        this.app = appInstance;
        this.notifications = notificationManager;
        this.reportService = null;

        this.app.budgetStore.subscribe(() => this.invalidateCaches());
    }

    invalidateCaches() {
        this.individualReportCache = null;
        this.consolidatedReportCache = null;
        this.memoryReportCache = null;
    }

    updateReportService() {
        this.invalidateCaches();
        this.reportService = new ReportService(
            this.app.budgetController,
            this.app.budgetStore.getTemplates(),
            this.app.priceController,
            this.app.templatesMap
        );
    }

    generateIndividualReportData() {
        if (this.individualReportCache) return this.individualReportCache;
        if (!this.reportService) this.updateReportService();

        this.individualReportCache = this.reportService.generateIndividualReportData();
        return this.individualReportCache;
    }

    generateConsolidatedReportData() {
        if (this.consolidatedReportCache) return this.consolidatedReportCache;
        if (!this.reportService) this.updateReportService();

        this.consolidatedReportCache = this.reportService.generateConsolidatedReportData();
        return this.consolidatedReportCache;
    }

    generateMemoriaCalculoData() {
        if (this.memoryReportCache) return this.memoryReportCache;
        if (!this.reportService) this.updateReportService();

        this.memoryReportCache = this.reportService.generateMemoriaCalculoData();
        return this.memoryReportCache;
    }

    exportProposalAsPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const totalPagesExp = '{totalPages}';

        const commercialData = this.app.budgetStore.getCommercialData();
        const budgetItems = this.app.budgetStore.getBudgetItems();
        const templatesMap = this.app.templatesMap;

        if (budgetItems.length === 0) {
            this.notifications.show("Orçamento vazio. Adicione itens para poder exportar.", NOTIFICATION_TYPES.WARNING);
            return;
        }

        const hasAnyPriceCalculated = budgetItems.some(item => {
            const template = templatesMap.get(item.templateId);
            return template && template.pricingConfig && template.pricingConfig.result;
        });

        if (!hasAnyPriceCalculated) {
            this.notifications.show("Nenhum item teve seu preço final calculado. Vá para a aba 'Lucro' e calcule os preços.", NOTIFICATION_TYPES.WARNING);
            return;
        }

        const generateItemDescription = (item, template) => {
            let descParts = [];
            let standardDesc = '';

            if (template.templateType === 'clamp') {
                const totalGalvCost = Object.values(template.costs.galvanizacao).reduce((a, b) => a + b, 0);
                const acabamento = totalGalvCost > 0 ? "ACABAMENTO: GALVANIZADO A FOGO" : "ACABAMENTO: NATURAL";
                standardDesc = `GRAMPO DE FIXAÇÃO ${template.nome}\n${acabamento}`;
            } else {
                const materialType = commercialData.materialType || "AÇO CARBONO";
                const precosProcesso = this.app.priceController.getProcessPrices(template);
                const acabamento = precosProcesso.galvanizacao > 0 ? "ACABAMENTO: GALVANIZAÇÃO A FOGO" : "ACABAMENTO: NATURAL";
                const tipoMalhaLabel = template.tipoMalha === 'interna' ? "(INTERNA)" : "(CENTRO A CENTRO)";
                const superficie = template.superficie === 'serrilhada' ? (template.isDegrau ? ' SERRILHADO' : ' SERRILHADA') : '';

                standardDesc += template.isDegrau ? `DEGRAU ${materialType}${superficie}\n${acabamento}\n` : `GRADE DE PISO ${materialType}${superficie}\n${acabamento}\n`;
                standardDesc += `BARRA PORTANTE: ${template.bp_esp}x${template.bp_larg}mm\n`;
                standardDesc += template.bl_diam > 0 ? `BARRA LIGAÇÃO: Ø${template.bl_diam}mm\n` : `BARRA LIGAÇÃO: ${template.bl_esp}x${template.bl_larg}mm\n`;

                if (template.isDegrau) {
                    const chapaLateralLarg = template.chapaLateralLarg || (5 * Math.ceil((template.bp_larg + 37) / 5));
                    standardDesc += `CHAPA LATERAL: ${template.chapaLateralEsp}x${chapaLateralLarg}mm\n`;
                    if (template.incluirChapaXadrez) {
                        let malhaMenorEfetiva = template.tipoMalha === 'interna' ? template.malha_menor + Math.round(template.bp_esp) : template.malha_menor;
                        const chapaXadrezLarg = template.chapaXadrezLarg || (template.bp_larg + malhaMenorEfetiva);
                        standardDesc += `CHAPA ANTIDERRAPANTE: ${template.chapaXadrezEsp}x${chapaXadrezLarg}mm\n`;
                    }
                }

                standardDesc += `MALHA: ${template.malha_menor}x${template.malha_maior} ${tipoMalhaLabel}\n`;
                standardDesc += `DIMENSÃO: ${item.largura}(vão) x ${item.comprimento}mm`;
            }
            descParts.push(standardDesc);

            if (item.imprimirDescricao && item.descricao) descParts.push(item.descricao);
            if (item.referenciaTecnica) descParts.push(`Ref. Técnica: ${item.referenciaTecnica}`);
            return descParts.join('\n');
        };

        let somaTotalSubtotal = 0, somaTotalFinal = 0, somaTotalIPI = 0;
        let somaTotalICMS = 0, somaTotalDIFAL = 0, somaTotalST = 0;

        const areaTotalPorTemplate = {};
        budgetItems.forEach(item => {
            const template = templatesMap.get(item.templateId);
            if (template && template.templateType === 'grade') {
                if (!areaTotalPorTemplate[item.templateId]) areaTotalPorTemplate[item.templateId] = 0;
                areaTotalPorTemplate[item.templateId] += (item.largura * item.comprimento / 1e6) * item.quantidade;
            }
        });

        budgetItems.forEach(item => {
            const template = templatesMap.get(item.templateId);
            const pricingResult = template?.pricingConfig?.result;
            if (!pricingResult) return;

            let subtotalItem, valorFinalItem, ipiItem, icmsItem, difalItem, stItem;

            if (template.templateType === 'grade') {
                const areaItem = (item.largura * item.comprimento / 1e6) * item.quantidade;
                const areaTotalTemplate = areaTotalPorTemplate[item.templateId] || 1;
                const proporcaoItem = areaItem / areaTotalTemplate;
                subtotalItem = (pricingResult.B97_precoVendaComDifal || 0) * proporcaoItem;
                valorFinalItem = (pricingResult.B102_valorFinalComIPIST || 0) * proporcaoItem;
                ipiItem = (pricingResult.B99_valorIPI || 0) * proporcaoItem;
                icmsItem = (pricingResult.B83_valorICMSOpPropria || 0) * proporcaoItem;
                difalItem = (pricingResult.B96_valorDifal || 0) * proporcaoItem;
                stItem = (pricingResult.B101_valorDifST || 0) * proporcaoItem;
            } else { // Clamp
                const totalQuantityForTemplate = pricingResult.materiaisDetalhes[0]?.qty || 1;
                const precoUnitarioPreciso = (pricingResult.B97_precoVendaComDifal || 0) / totalQuantityForTemplate;
                const valorUnitario = Math.ceil(precoUnitarioPreciso * 100) / 100;
                subtotalItem = valorUnitario * item.quantidade;
                const precoBasePreciso = pricingResult.B97_precoVendaComDifal || 0;
                if (precoBasePreciso > 0) {
                    const ipiRatio = (pricingResult.B99_valorIPI || 0) / precoBasePreciso;
                    const stRatio = (pricingResult.B101_valorDifST || 0) / precoBasePreciso;
                    ipiItem = subtotalItem * ipiRatio;
                    stItem = subtotalItem * stRatio;
                    valorFinalItem = subtotalItem + ipiItem + stItem;
                    icmsItem = subtotalItem * ((pricingResult.B83_valorICMSOpPropria || 0) / precoBasePreciso);
                    difalItem = subtotalItem * ((pricingResult.B96_valorDifal || 0) / precoBasePreciso);
                } else {
                    valorFinalItem = subtotalItem;
                    ipiItem = stItem = icmsItem = difalItem = 0;
                }
            }
            somaTotalSubtotal += subtotalItem;
            somaTotalFinal += valorFinalItem;
            somaTotalIPI += ipiItem;
            somaTotalICMS += icmsItem;
            somaTotalDIFAL += difalItem;
            somaTotalST += stItem;
        });

        const tableBody = budgetItems.map(item => {
            const template = templatesMap.get(item.templateId);
            const pricingResult = template?.pricingConfig?.result;
            if (!template || !pricingResult) return null;

            let valorTotal, valorUnitario;
            if (template.templateType === 'grade') {
                const areaItem = (item.largura * item.comprimento / 1e6) * item.quantidade;
                const areaTotalTemplate = areaTotalPorTemplate[item.templateId] || 1;
                valorTotal = (pricingResult.B97_precoVendaComDifal || 0) * (areaItem / areaTotalTemplate);
            } else {
                const totalQuantity = pricingResult.materiaisDetalhes[0]?.qty || 1;
                const precoUnitarioPreciso = (pricingResult.B97_precoVendaComDifal || 0) / totalQuantity;
                valorUnitario = Math.ceil(precoUnitarioPreciso * 100) / 100;
                valorTotal = valorUnitario * item.quantidade;
            }
            valorUnitario = item.quantidade > 0 ? valorTotal / item.quantidade : 0;
            const ipiRate = (pricingResult.B98_ipiVenda || 0) * 100;

            return [
                item.order + 1, item.quantidade, 'pç',
                generateItemDescription(item, template),
                FormattingService.formatNumber(valorUnitario),
                ipiRate > 0 ? `${FormattingService.formatNumber(ipiRate, 2)}%` : "-",
                commercialData.deliveryTime || 'A combinar',
                FormattingService.formatNumber(valorTotal)
            ];
        }).filter(row => row !== null);

        const drawPageTemplate = () => {
            const pageCount = doc.internal.getNumberOfPages();
            const logoBase64 = commercialData.logoBase64;
            if (logoBase64) doc.addImage(logoBase64, 'PNG', 14, 12, 25, 0);

            doc.setFontSize(10).setFont("helvetica", "bold");
            doc.text(commercialData.headerLine1, 105, 15, { align: 'center' });
            if (pageCount === 1) {
                doc.setFontSize(8).setFont("helvetica", "normal");
                doc.text(commercialData.headerLine2, 105, 20, { align: 'center' });
                doc.text(commercialData.headerLine3, 105, 25, { align: 'center' });
                doc.setFontSize(10).setFont("helvetica", "bold");
                doc.text("Orçamento para", 14, 40);
                doc.text(`Orçamento nº: ${commercialData.quoteNumber}`, 200, 40, { align: 'right' });
                doc.setFontSize(9).setFont("helvetica", "normal");
                doc.text(commercialData.clientName || 'N/A', 14, 45);
                doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 200, 45, { align: 'right' });
                doc.text(commercialData.clientIdentifier || 'N/A', 14, 50);
                const validUntilDate = commercialData.validUntil ? new Date(commercialData.validUntil + 'T00:00:00') : new Date();
                doc.text(`Orçamento válido até: ${validUntilDate.toLocaleDateString('pt-BR')}`, 200, 50, { align: 'right' });
                doc.text(`UF: ${commercialData.ufDestino || 'N/A'}`, 14, 55);
            } else {
                doc.text(`Orçamento nº: ${commercialData.quoteNumber}`, 200, 15, { align: 'right' });
            }
            doc.setFontSize(8).text(`Página ${pageCount} de ${totalPagesExp}`, doc.internal.pageSize.width / 2, 287, { align: 'center' });
        };

        doc.autoTable({
            startY: 65,
            margin: { top: 35, bottom: 20 },
            head: [['Item', 'Qtd.', 'Un', 'Descrição', 'Preço (R$)', '+IPI', 'Prazo', 'Valor (R$)']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [192, 0, 0], textColor: 255, fontStyle: 'bold' },
            styles: { fontSize: 8, cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' },
                1: { cellWidth: 10, halign: 'center' },
                2: { cellWidth: 8,  halign: 'center' },
                3: { cellWidth: 'auto' },
                4: { halign: 'right' },
                5: { cellWidth: 12, halign: 'right' },
                6: { cellWidth: 20 },
                7: { cellWidth: 25, halign: 'right' }
            },
            rowPageBreak: 'avoid',
            didParseCell: (data) => {
                if (data.column.dataKey === 3) { data.cell.styles.valign = 'middle'; }
            },
            didDrawPage: drawPageTemplate
        });

        const finalY = doc.lastAutoTable.finalY;
        let startYAfterMainTable = finalY + 5;
        if (finalY > 235) {
            doc.addPage();
            startYAfterMainTable = 30;
        }

        const firstPricedItem = budgetItems.find(item => templatesMap.get(item.templateId)?.pricingConfig?.result);
        const firstPricingResult = firstPricedItem ? templatesMap.get(firstPricedItem.templateId).pricingConfig.result : {};
        const icmsRate = (firstPricingResult.B82_icmsOpPropria || 0) * 100;

        const finalTableBody = [
            [{ content: 'Prazo:', styles: { fontStyle: 'bold' } }, { content: commercialData.deliveryTime || 'A combinar' }, { content: 'Subtotal', styles: { fontStyle: 'bold', halign: 'right' } }, { content: FormattingService.formatCurrency(somaTotalSubtotal), styles: { halign: 'right' } }],
            [{ content: 'Frete:', styles: { fontStyle: 'bold' } }, { content: commercialData.shippingInfo }, { content: 'IPI (a incluir)', styles: { fontStyle: 'bold', halign: 'right' } }, { content: FormattingService.formatCurrency(somaTotalIPI), styles: { halign: 'right' } }],
            [{ content: 'Pagamento:', styles: { fontStyle: 'bold' } }, { content: commercialData.paymentTerms }, { content: 'DIFAL (incluso)', styles: { fontStyle: 'bold', halign: 'right' } }, { content: somaTotalDIFAL > 0 ? FormattingService.formatCurrency(somaTotalDIFAL) : '-', styles: { halign: 'right' } }],
            [{ content: '', colSpan: 2 }, { content: `ICMS (incluso) ${FormattingService.formatNumber(icmsRate, 2)}%`, styles: { fontStyle: 'bold', halign: 'right' } }, { content: FormattingService.formatCurrency(somaTotalICMS), styles: { halign: 'right' } }],
            [{ content: '', colSpan: 2 }, { content: 'Outros (ICMS-ST)', styles: { fontStyle: 'bold', halign: 'right' } }, { content: somaTotalST > 0 ? FormattingService.formatCurrency(somaTotalST) : '-', styles: { halign: 'right' } }],
            [{ content: '', colSpan: 2 }, { content: 'TOTAL', styles: { fontStyle: 'bold', halign: 'right' } }, { content: FormattingService.formatCurrency(somaTotalFinal), styles: { fontStyle: 'bold', halign: 'right' } }],
            [{ content: commercialData.sellerName, styles: { fontStyle: 'bold' }, colSpan: 4 }],
            [{ content: commercialData.sellerContact, colSpan: 4 }]
        ];

        doc.autoTable({
            startY: startYAfterMainTable,
            body: finalTableBody,
            theme: 'plain',
            rowPageBreak: 'avoid',
            styles: { fontSize: 9, cellPadding: 2 },
            columnStyles: {
                0: { cellWidth: 25 },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 40 },
                3: { cellWidth: 30 }
            },
            didParseCell: (data) => {
                if (data.column.index >= 2) {
                    data.cell.styles.lineWidth = 0.1;
                    data.cell.styles.lineColor = [0, 0, 0];
                }
                if (data.row.index === 5 && data.column.index >= 2) {
                    data.cell.styles.fillColor = [192, 0, 0];
                    data.cell.styles.textColor = [255, 255, 255];
                }
            },
            didDrawPage: drawPageTemplate
        });

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save(`Orcamento_${commercialData.quoteNumber || 'sem_numero'}.pdf`);
        this.notifications.show("PDF gerado com sucesso!", NOTIFICATION_TYPES.SUCCESS);
    }
}