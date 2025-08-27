export const content = `
<div class="card-content content">
    <h3 class="title is-4">Ordem Recomendada das Operações</h3>
    <p>Para um uso mais eficiente, siga esta sequência lógica:</p>
    <ol>
        <li><strong>Configurar Modelos:</strong> Crie todos os modelos de produtos que você irá precisar na aba "Modelos". **Decida o "Tipo de Cálculo da Malha" e o "Método de Cálculo do Peso"** para cada um, pois isso impactará o custo.</li>
        <li><strong>Configurar Preços:</strong> Defina os custos de matéria-prima, serviços e as **configurações de arredondamento e método de cálculo de peso total** na aba "Preços". Lembre-se que o valor no campo "Galvanização" determinará o acabamento exibido no PDF.</li>
        <li><strong>Adicionar Itens ao Orçamento:</strong> Use os modelos para adicionar as grades com suas quantidades e dimensões na aba "Itens".</li>
        <li><strong>Analisar Custos:</strong> Verifique a Memória de Cálculo e os Relatórios para conferir se os custos estão corretos.</li>
        <li><strong>Configurar Dados da Proposta:</strong> Preencha as informações do cliente, vendedor, termos comerciais e o <strong>logotipo</strong> na aba "Proposta". Lembre-se de definir a **UF de Destino**!</li>
        <li><strong>Configurar Lucro (Pricing):</strong> Na aba "Lucro", configure os impostos, margens e despesas para cada modelo e calcule os preços finais.</li>
        <li><strong>Gerar Orçamento Final:</strong> Vá para a aba "Orçamento" para ver a proposta comercial completa e exportá-la para PDF.</li>
    </ol>
    <h3 class="title is-4">Dicas Importantes</h3>
    <ul>
        <li><strong>Backup de Dados:</strong> Como os dados são salvos localmente no seu navegador, exporte seus orçamentos (botão "Salvar Orçamento") regularmente como backup.</li>
        <li><strong>Unicidade de Degrau:</strong> Lembre-se que modelos marcados como "Degrau" só podem ser usados uma vez em cada orçamento.</li>
    </ul>
</div>
`;