export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-calculator mr-2"></i> <strong>Memória</strong> apresenta uma análise aprofundada de como os custos são calculados para cada modelo utilizado no orçamento.</p>
    
    <h3 class="title is-4">Memória de Cálculo para Grades</h3>
    <p>Para modelos de <strong>Grade</strong>, a memória de cálculo exibe:</p>
    <ul>
        <li><strong>Visão Geral:</strong> Total de itens, área, peso e malha efetiva.</li>
        <li><strong>Itens do Modelo:</strong> Lista cada item de grade que usa o modelo.</li>
        <li><strong>Barras e Chapas:</strong> Detalhamento do cálculo de custo para cada material necessário.</li>
        <li><strong>Processos:</strong> Detalhamento do custo de Mão de Obra e Galvanização, calculado com base no peso total.</li>
        <li><strong>Total Geral e Custo por m².</strong></li>
    </ul>

    <h3 class="title is-4">Memória de Cálculo para Grampos</h3>
    <p>Para modelos de <strong>Grampo</strong>, a memória de cálculo é diferente, pois reflete os custos fixos inseridos pelo usuário:</p>
    <ul>
        <li><strong>Visão Geral:</strong> Total de itens e peso total.</li>
        <li><strong>Itens do Modelo:</strong> Lista cada item de grampo que usa o modelo.</li>
        <li><strong>Detalhamento de Custos Unitários (Fixos):</strong> Em vez de calcular os materiais, esta seção exibe tabelas com os valores que foram inseridos na criação do modelo, separados em:
            <ul>
                <li>Custo de Matéria Prima (com subtotal)</li>
                <li>Custo de Mão de Obra (com subtotal)</li>
                <li>Custo de Galvanização (com subtotal)</li>
            </ul>
        </li>
        <li><strong>Total Geral:</strong> Mostra o custo total para todos os itens que usam este modelo de grampo.</li>
    </ul>
</div>
`;