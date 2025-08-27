export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-dollar-sign mr-2"></i> <strong>Preços</strong> permite definir os custos de matéria-prima, serviços e as regras de cálculo para o orçamento.</p>

    <h3 class="title is-4">Seleção do Tipo de Material</h3>
    <p>No topo desta aba, você encontrará um seletor para o <strong>Tipo de Material</strong>. Esta é uma configuração global para o orçamento atual.</p>
    <ul>
        <li><strong>Opções:</strong> "Aço Carbono" (padrão) e "Aço Inox".</li>
        <li><strong>Impacto:</strong> A seleção aqui determinará o nome do material principal que aparecerá na descrição de cada item ao exportar a proposta para PDF.</li>
    </ul>

    <h3 class="title is-4">Configuração Global de Preços</h3>
    <p>Preencha os campos de Matéria Prima, Serviços e Processos e clique em <span class="tag is-primary"><i class="fas fa-save mr-1"></i> Salvar Preços</span>.</p>
    <p class="notification is-info is-light"><strong>Dica de Precisão:</strong> Os campos de custo permitem a inserção de valores com até 6 casas decimais (ex: 7.123456). Embora os botões de incremento alterem o valor em 0.01, você pode digitar manualmente um valor mais preciso para garantir a exatidão no cálculo final.</p>

    <h3 class="title is-4">Configurações de Cálculo de Peso</h3>
    <p>Esta seção permite ajustar a precisão e a metodologia dos cálculos de peso para alinhar com os padrões da sua empresa.</p>
    <ul>
        <li><strong>Método de Cálculo de Peso Total:</strong> Define como o peso total de um item com múltiplas quantidades é calculado.
            <ul>
                <li><strong>Por Componente Total (Padrão de Fábrica):</strong> Calcula o peso total de todos os componentes necessários para a quantidade total de grades (ex: peso de 670 barras portantes), arredonda cada grupo de componente e depois soma tudo. Este método é mais preciso para a produção em lote, mas pode resultar em pesos unitários que variam ligeiramente com a quantidade.</li>
                <li><strong>Por Unidade Multiplicada (Simplificado):</strong> Calcula o peso final e arredondado de uma única grade e depois multiplica esse valor pela quantidade total. Garante uma proporcionalidade perfeita (o peso de 10 grades será sempre 10x o peso de 1), ideal para orçamentos mais diretos.</li>
            </ul>
        </li>
        <li><strong>Tipo de Arredondamento:</strong> Define como o peso de cada componente será arredondado.
            <ul>
                <li><strong>Nenhum:</strong> Usa o valor exato, sem arredondamento.</li>
                <li><strong>Padrão (Matemático):</strong> Arredonda para o número mais próximo.</li>
                <li><strong>Para Cima (Teto):</strong> Sempre arredonda para cima, equivalente à fórmula \`ARREDONDAR.PARA.CIMA\` do Excel.</li>
            </ul>
        </li>
        <li><strong>Casas Decimais do Peso:</strong> Define o número de casas decimais a serem consideradas no arredondamento.</li>
    </ul>
    <p class="notification is-info is-light">Estas configurações são salvas por orçamento e afetam todos os cálculos de peso.</p>

    <h3 class="title is-4">Preços Específicos por Material</h3>
    <p>É possível definir preços por kg para dimensões específicas de barras e chapas, que terão precedência sobre os preços padrão globais.</p>
</div>
`;