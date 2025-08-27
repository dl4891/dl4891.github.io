export const content = `
<div class="card-content content">
    <p>O sistema permite trabalhar com múltiplos orçamentos simultaneamente, cada um com seus próprios modelos, itens e configurações de preços.</p>
    <h3 class="title is-4">Criar, Alternar, Renomear e Duplicar</h3>
    <ul>
        <li><strong>Criar um Novo Orçamento:</strong> Clique no botão <span class="tag is-success"><i class="fas fa-plus"></i></span> no cabeçalho.</li>
        <li><strong>Alternar entre Orçamentos:</strong> Clique na aba do orçamento desejado.</li>
        <li><strong>Renomear um Orçamento:</strong> Com o orçamento ativo, clique no botão <span class="tag is-info"><i class="fas fa-edit mr-1"></i> Renomear</span>.</li>
        <li><strong>Duplicar um Orçamento:</strong> Com o orçamento ativo, clique no botão <span class="tag is-warning"><i class="fas fa-copy mr-1"></i> Duplicar Orçamento</span>.</li>
        <li><strong>Fechar um Orçamento:</strong> Clique no <span class="tag is-danger">×</span> na aba do orçamento.</li>
    </ul>
    <h3 class="title is-4">Exportar e Importar Orçamentos (Salvar/Abrir)</h3>
    <p>Você pode salvar um backup completo do seu orçamento (modelos, itens, preços) como um arquivo <code>.json</code> usando os botões <strong>Salvar Orçamento</strong> e <strong>Abrir Orçamento</strong>. A importação sempre cria um novo orçamento, garantindo que nenhum dado seja sobrescrito acidentalmente.</p>
    <p class="notification is-info is-light"><strong>Nota:</strong> A importação de arquivos de orçamento de versões mais antigas do sistema é suportada. O sistema irá adaptar os dados para o novo formato que diferencia Grades e Grampos.</p>

    <h3 class="title is-4">Importar Modelos e Itens via CSV</h3>
    <p>Para agilizar a criação de orçamentos, você pode importar múltiplos modelos ou itens usando arquivos CSV.</p>
    <h4>Importar Modelos</h4>
    <p>Na aba <i class="fas fa-cogs mr-2"></i> <strong>Modelos</strong>, o botão <span class="tag is-link"><i class="fas fa-upload mr-1"></i> Importar modelos</span> atualmente suporta apenas a importação de <strong>modelos de grade</strong>. Um futuro update poderá habilitar a importação de grampos em um formato CSV específico.</p>
    <p><strong>Formato do CSV de Grades:</strong></p>
    <pre><code>nome,superficie,bp_esp,bp_larg,bl_diam,bl_esp,bl_larg,bf_esp,bf_larg,malha_menor,malha_maior,tipoMalha,pesoCalcMode,customMaoObra,customGalvanizacao,...</code></pre>
    <p>A coluna <code>superficie</code> aceita os valores "lisa" ou "serrilhada". Se omitida, o padrão será "lisa". As colunas de custo, como <code>customMaoObra</code>, aceitam valores com múltiplas casas decimais (ex: 7.123456).</p>
    
    <h4>Importar Itens de Orçamento</h4>
    <p>Na aba <i class="fas fa-list mr-2"></i> <strong>Itens</strong>, o botão <span class="tag is-link"><i class="fas fa-upload mr-1"></i> Importar itens</span> pode importar tanto grades quanto grampos, desde que o nome do modelo corresponda a um já existente no sistema.</p>
    <p><strong>Formato do CSV de Itens:</strong></p>
    <pre><code>templateNome,quantidade,largura,comprimento,descricao,imprimirDescricao,referenciaTecnica</code></pre>
    <p><strong>Exemplo de linha (Grade):</strong> <code>Grade P-30,10,1200,900,Grades da plataforma,true,Desenho 123-A</code></p>
    <p><strong>Exemplo de linha (Grampo):</strong> <code>Grampo Tipo 1,150,,,Conjunto de fixadores,false,Ref-Grampo-01</code> (Note que largura e comprimento são deixados em branco)</p>
    <p>O campo <code>imprimirDescricao</code> aceita "true" ou "false". Se omitido, o padrão será "false".</p>
</div>
`;