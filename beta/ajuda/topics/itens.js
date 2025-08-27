export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-list mr-2"></i> <strong>Itens</strong> permite adicionar produtos específicos ao seu orçamento usando os modelos configurados, sejam eles grades ou grampos.</p>
    <h3 class="title is-4">Adicionar ou Editar um Item</h3>
    <p>Para adicionar um novo item ao orçamento:</p>
    <ol>
        <li>Navegue até a aba <i class="fas fa-list mr-2"></i> <strong>Itens</strong>.</li>
        <li>No formulário "Adicionar Item ao Orçamento":
            <ul>
                <li><strong>Modelo:</strong> Selecione um dos modelos criados. O sistema indicará se o modelo é de <strong>[GRAMPO]</strong> ou <strong>(DEGRAU)</strong>.</li>
                <li><strong>Quantidade:</strong> Número de peças a serem orçadas.</li>
                <li><strong>Largura e Comprimento (mm):</strong> Para modelos de <strong>Grade</strong>, estes campos são obrigatórios. Para modelos de <strong>Grampo</strong>, eles são desabilitados.</li>
                <li><strong>Descrição (Complementar):</strong> Um campo opcional para adicionar informações extras ao item. Por padrão, a caixa <strong>"Imprimir no PDF"</strong> ao lado vem desmarcada. Se você marcá-la, o texto que você digitar aqui será adicionado abaixo da descrição técnica padrão no PDF.</li>
                <li><strong>Referência Técnica / Desenho:</strong> Um campo para informações como códigos de desenho ou outras referências. O conteúdo deste campo <strong>sempre</strong> aparecerá no PDF, abaixo de todas as outras descrições.</li>
            </ul>
        </li>
        <li>Clique em <span class="tag is-success"><i class="fas fa-plus mr-1"></i> Adicionar Item</span>.</li>
    </ol>
    <p>A edição e remoção de itens funcionam da mesma forma para ambos os tipos de produto.</p>
    
    <h3 class="title is-4">Numeração e Reordenamento de Itens</h3>
    <p>Os itens na lista do orçamento são numerados sequencialmente. Você pode alterar a ordem dos itens para organizar sua proposta comercial.</p>
    
    <h4 class="title is-5">Mover para Posição Específica (Edição Rápida)</h4>
    <p>Para mover um item diretamente para uma posição específica, especialmente em listas longas:</p>
    <ol>
        <li>Clique diretamente sobre o <strong>número</strong> do item (ex: "49.").</li>
        <li>O número se transformará em uma caixa de texto.</li>
        <li>Digite o novo número da posição desejada (ex: "3") e pressione <strong>Enter</strong> ou <strong>Tab</strong>.</li>
        <li>O item será movido para a nova posição e a lista será reordenada. Para cancelar, pressione <strong>Esc</strong> ou clique fora da caixa.</li>
    </ol>
    <p class="notification is-info is-light">A ordem que você definir será a mesma utilizada nos relatórios e na exportação do PDF final.</p>

    <h3 class="title is-4">Cálculos dos Itens do Orçamento</h3>
    <p>Ao adicionar um item, o sistema realiza os seguintes cálculos:</p>
    <ul>
        <li><strong>Para Grades:</strong>
            <ul>
                <li><strong>Área:</strong> Largura (m) × Comprimento (m) × Quantidade.</li>
                <li><strong>Peso (kg):</strong> Soma do peso de todos os componentes, antes da margem.</li>
                <li><strong>Peso c/ Margem (kg):</strong> Peso total com a margem de segurança do modelo.</li>
                <li><strong>Custo Total:</strong> Custo de material, mão de obra e serviços.</li>
            </ul>
        </li>
        <li><strong>Para Grampos:</strong>
             <ul>
                <li><strong>Área:</strong> N/A.</li>
                <li><strong>Peso (kg):</strong> Peso unitário (definido no modelo) × Quantidade.</li>
                <li><strong>Custo Total:</strong> Custo unitário (definido no modelo) × Quantidade.</li>
            </ul>
        </li>
    </ul>

    <h3 class="title is-4">Resumo do Orçamento</h3>
    <p>O painel de resumo agora diferencia os totais:</p>
    <ul>
        <li><strong>Total de Itens (Grades)</strong> e <strong>Total de Itens (Grampos)</strong>.</li>
        <li><strong>Área Total (Grades):</strong> Exibe a área apenas para as grades.</li>
        <li><strong>Peso Total:</strong> Soma o peso de todos os itens, grades e grampos.</li>
        <li><strong>Custos:</strong> Soma os custos de todos os itens.</li>
        <li><strong>Consolidado de Materiais:</strong> Exibe o peso total por tipo de material para as grades, e adiciona uma linha separada para o peso total dos <strong>Grampos de Fixação</strong>.</li>
    </ul>
</div>
`;