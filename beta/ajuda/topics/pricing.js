export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-percentage mr-2"></i> <strong>Lucro</strong> é crucial para transformar o custo de produção em preço de venda, aplicando margens, despesas e impostos.</p>
    <h3 class="title is-4">Tabela de Alíquotas</h3>
    <p>Esta seção permite visualizar e editar as alíquotas de ICMS (Alíquota Interna, Alíquota SP) e MVA (Margem de Valor Agregado para Grade, Grampo, Telas) por estado (UF).</p>
    <p>Para editar, clique em <span class="tag is-light"><i class="fas fa-edit mr-1"></i> Editar Alíquotas</span>.</p>
    <p>Após editar, clique em <span class="tag is-success"><i class="fas fa-save mr-1"></i> Salvar Alterações</span>. Você pode restaurar os valores padrão a qualquer momento.</p>
    <p class="notification is-warning is-light"><strong>Atenção:</strong> Alterações nas alíquotas afetam todos os cálculos de pricing. Use dados oficiais e atualizados.</p>

    <h3 class="title is-4">Configuração de Pricing por Modelo</h3>
    <p>Cada modelo no seu orçamento pode ter sua própria configuração de pricing. Um painel de configuração individual será exibido para cada modelo que tiver itens no orçamento.</p>
    <h4>Status dos Modelos</h4>
    <p>Cada modelo exibe um status visual para indicar seu estado no processo de pricing:</p>
    <ul>
        <li><span class="tag is-light"><i class="fas fa-minus-circle mr-1"></i> Sem Itens</span>: O modelo não tem itens no orçamento e não pode ser precificado.</li>
        <li><span class="tag is-warning"><i class="fas fa-exclamation-triangle mr-1"></i> Não Configurado</span>: O modelo tem itens, mas precisa de configuração de pricing.</li>
        <li><span class="tag is-info"><i class="fas fa-cog mr-1"></i> Configurado</span>: O modelo está pronto para ter o preço calculado.</li>
        <li><span class="tag is-success"><i class="fas fa-check-circle mr-1"></i> Calculado</span>: O preço de venda para este modelo foi calculado com sucesso.</li>
    </ul>

    <h4>Painel de Configuração Individual:</h4>
    <ul>
        <li><strong>Tipo de Configuração:</strong> Essencial para determinar como o ICMS será aplicado (Venda de Grade ST, Venda para Não Contribuinte, etc.).</li>
        <li><strong>UF de Destino:</strong> Este campo é preenchido automaticamente com a UF definida na aba "Proposta".</li>
        <li><strong>Percentuais de Negócio:</strong> Lucro Líquido, Despesas Fixas, Comissões, etc.</li>
        <li><strong>ICMS Material (%):</strong> Alíquota de ICMS sobre a compra da matéria-prima.</li>
        <li><strong>Custos Adicionais:</strong>
            <ul>
                <li><strong>Frete:</strong> Pode ser adicionado como um percentual (%) sobre o valor ou como um valor fixo (R$).</li>
                <li><strong>ST na Compra:</strong> Custo adicional de Substituição Tributária na compra de materiais.</li>
                <li><strong>Taxa de Energia:</strong> Custo adicional de energia.</li>
            </ul>
        </li>
        <li><strong>Operações Especiais:</strong> Opções para cenários com tributação diferenciada.
            <ul>
                <li><strong>Venda para Estaleiro:</strong> Selecione "Sim" se a venda se destina a um estaleiro. Isso pode resultar em isenção de ICMS e IPI no cálculo.</li>
                <li><strong>Venda para Exportação:</strong> Selecione "Sim" para operações de exportação, que podem ter isenção de IPI, PIS e COFINS.</li>
            </ul>
        </li>
    </ul>

    <h3 class="title is-4">Ferramentas de Automação</h3>
    <p>No topo da aba, você encontra ferramentas para agilizar o trabalho:</p>
    <ul>
        <li><strong>Copiar Configuração:</strong> Permite selecionar um modelo já configurado e copiar suas definições de pricing para todos os outros modelos que ainda não foram configurados.</li>
        <li><strong>Calcular Todos:</strong> Executa o cálculo de preço para todos os modelos que já estão configurados, de uma só vez.</li>
    </ul>

    <h3 class="title is-4">Regras de IPI (Imposto sobre Produtos Industrializados)</h3>
    <p>A configuração do IPI é complexa e o sistema implementa validações rigorosas:</p>
    <ul>
        <li>Se <strong>IPI Material > 0%</strong>: IPI na Revenda <strong>deve ser 0%</strong> e IPI Venda Final <strong>deve ser > 0%</strong>. (Caracteriza <strong>INDUSTRIALIZAÇÃO</strong>).</li>
        <li>Se <strong>IPI na Revenda > 0%</strong>: IPI Material e IPI Venda Final <strong>devem ser 0%</strong>. (Caracteriza <strong>REVENDA</strong>).</li>
    </ul>

    <h3 class="title is-4">Entendendo o Cálculo de Pricing</h3>
    <p>O motor de cálculo realiza uma série de etapas para determinar o preço de venda. Ele parte do <strong>custo líquido</strong> (material + serviços - créditos de impostos) e aplica todos os percentuais de despesas, impostos sobre a venda e lucro para chegar ao preço final.</p>
    <p>O cálculo crucial é o do <strong>Preço de Venda Base (<code>B94_valorMercadoria</code>)</strong>, que é "descoberto" a partir da fórmula:</p>
    <pre><code>(Custo Líquido / (1 - Soma de Percentuais sobre a Venda)) + Frete Fixo</code></pre>
    <p>A partir desse valor base, são calculados todos os impostos (IPI, ICMS-ST, PIS, COFINS, DIFAL) para compor o valor final da proposta.</p>
</div>
`;