export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-chart-line mr-2"></i> <strong>Relatórios</strong> fornece diferentes visões dos dados do seu orçamento, separando as informações de grades e grampos.</p>
    
    <h3 class="title is-4">Relatório Detalhado por Item</h3>
    <p>Este relatório lista cada item do orçamento com seus respectivos detalhes e custos.</p>
    <ul>
        <li><strong>Para Grades:</strong> A visão detalhada é mantida, mostrando a lista de materiais (barras, chapas), dimensões e a composição de custos (Material, Mão de Obra, Galvanização).</li>
        <li><strong>Para Grampos:</strong> A visão é simplificada. Em vez da lista de materiais, ela exibe os <strong>Custos Unitários Pré-Definidos</strong> (Material, M.O., Galvanização) que foram inseridos na criação do modelo.</li>
    </ul>
    
    <h3 class="title is-4">Consolidado e Plano de Corte</h3>
    <p>Este relatório agrega os materiais necessários e otimiza o corte.</p>
    
    <h4>Consolidado de Materiais para Grades</h4>
    <ul>
        <li>Exibe o total de peças e peso de barras e chapas, agrupados por modelo de grade.</li>
    </ul>

    <h4>Consolidado de Grampos de Fixação (Nova Seção)</h4>
    <ul>
        <li>Uma nova tabela exibe o total de peças, peso e custo para cada modelo de grampo utilizado no orçamento.</li>
    </ul>

    <h4>Plano de Corte (Apenas para Grades)</h4>
    <p>Detalha como otimizar o corte das barras padrão (6000mm) para minimizar o desperdício. Esta seção só é exibida se houver itens do tipo "Grade" no orçamento.</p>
</div>
`;