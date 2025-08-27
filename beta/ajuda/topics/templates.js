export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-cogs mr-2"></i> <strong>Modelos</strong> é onde você define as especificações dos produtos que serão utilizadas nos orçamentos. Existem dois tipos de modelos: <strong>Grades de Piso</strong> e <strong>Grampos de Fixação</strong>.</p>
    
    <h3 class="title is-4">Criar ou Editar um Modelo</h3>
    <p>Para criar um novo modelo:</p>
    <ol>
        <li>Na aba <i class="fas fa-cogs mr-2"></i> <strong>Modelos</strong>, clique no botão <span class="tag is-primary">Adicionar Modelo</span>.</li>
        <li>Uma janela (modal) irá aparecer. Primeiro, selecione o <strong>Tipo de Modelo</strong> ("Grade de Piso" ou "Grampo de Fixação").</li>
        <li>O formulário correspondente será exibido dentro do modal. Preencha os campos.</li>
        <li>Clique em <span class="tag is-primary">Salvar Modelo</span> para concluir.</li>
    </ol>
    <p>Para editar um modelo existente, clique no botão <span class="tag is-info"><i class="fas fa-edit mr-1"></i></span> (Editar) na lista. O mesmo modal será aberto com os dados já preenchidos.</p>

    <h3 class="title is-4">Modelo de Grampo de Fixação</h3>
    <p>Este modelo é usado para itens cujo custo é pré-calculado e fixo. Você deve inserir os valores finais de custo, divididos por categoria, e o peso final do conjunto.</p>
    <ul>
        <li><strong>Custo de Matéria Prima:</strong> Custo final de cada componente (grapa, borboleta, parafuso, etc.).</li>
        <li><strong>Custo de Mão de Obra:</strong> Custo final do processo de fabricação.</li>
        <li><strong>Custo de Galvanização:</strong> Custo final do processo de galvanização.</li>
        <li><strong>Peso Final (kg):</strong> Peso unitário do grampo finalizado.</li>
    </ul>
     <p class="notification is-info is-light"><strong>Dica de Precisão:</strong> Os campos de custo permitem a inserção de valores com até 6 casas decimais (ex: 0.123456) para garantir a exatidão no cálculo final.</p>

    <h3 class="title is-4">Modelo de Grade de Piso</h3>
    <p>Este modelo descreve as características físicas da grade, e o sistema calculará os custos dinamicamente.</p>
    
    <h4 class="title is-5">Superfície da Grade: Lisa vs. Serrilhada</h4>
    <p>No formulário de grade, você pode definir a superfície das barras portantes. Essa escolha impacta diretamente a descrição do produto no orçamento final em PDF.</p>
    <ul>
        <li><i class="fas fa-stream mr-2"></i> <strong>Lisa (Padrão):</strong> A superfície padrão. Nenhuma informação adicional é adicionada à descrição do produto.</li>
        <li><i class="fas fa-grip-lines mr-2"></i> <strong>Serrilhada:</strong> Selecione esta opção para grades ou degraus com superfície antiderrapante. A palavra "SERRILHADA" (ou "SERRILHADO" para degraus) será destacada na descrição do item no PDF.</li>
    </ul>

    <h4 class="title is-5">Configuração de Malha: Centro a Centro vs. Malha Interna</h4>
    <p>Esta é uma das configurações mais importantes para a otimização de custos. Você pode escolher como a malha da grade será calculada:</p>
    <ul>
        <li><i class="fas fa-compress-arrows-alt mr-2"></i> <strong>Malha Interna (Padrão):</strong> Esta opção aplica uma regra de negócio para reduzir o custo do material e é o padrão para novos modelos.
            <br><strong>Fórmula:</strong> <code>Malha Menor Efetiva = Malha Menor (digitada) + Arredondamento(Espessura da Barra Portante)</code>.
        </li>
        <li><i class="fas fa-arrows-alt-h mr-2"></i> <strong>Centro a Centro:</strong> O cálculo utilizará exatamente os valores de malha que você digitar (ex: 30x100).</li>
    </ul>
    <p class="notification is-info is-light">Para garantir total transparência, o campo <strong>"Malha Efetiva para Cálculo"</strong> no formulário mostrará em tempo real qual valor está sendo utilizado pelo sistema com base na sua seleção.</p>

    <h4 class="title is-5">Cálculo de Peso: Real vs. Teórico</h4>
    <ul>
        <li><i class="fas fa-ruler-combined mr-2"></i> <strong>Peso Real (Produção):</strong> Calcula o peso com base nos comprimentos exatos de cada barra, para maior precisão de produção.</li>
        <li><i class="fas fa-ruler-horizontal mr-2"></i> <strong>Peso Teórico (Comercial):</strong> Calcula o peso usando as dimensões brutas da grade, resultando em um peso ligeiramente maior. Por padrão, esta é a opção selecionada para novos modelos.</li>
    </ul>
     <p class="notification is-danger is-light"><strong>Importante:</strong> A escolha do método de cálculo de peso afeta apenas o peso para fins de custo. O <strong>Plano de Corte</strong> sempre utilizará os comprimentos do <strong>Peso Real</strong>.</p>
    
    <h4 class="title is-5">Preços Customizados</h4>
     <p>Para situações específicas, você pode definir custos de Mão de Obra e Galvanização diretamente no modelo, que irão sobrescrever os valores globais. Os campos de custo permitem a inserção de valores com até 6 casas decimais para maior precisão.</p>

    <h4 class="title is-5">Configurando Grades como Degraus</h4>
    <p>Para configurar um modelo de grade como degrau, marque a opção <span class="tag is-warning"><i class="fas fa-check mr-1"></i> Configurar como Degrau</span>. Isso habilitará campos para Chapa Lateral e Chapa Xadrez.</p>
</div>
`;