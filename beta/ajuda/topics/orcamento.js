export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-file-invoice mr-2"></i> <strong>Orçamento</strong> apresenta um resumo do orçamento comercial, utilizando os preços calculados na seção de Lucro.</p>
    <p>Para que os valores sejam exibidos, você deve ter itens adicionados ao orçamento e ter executado o cálculo de pricing para os templates utilizados.</p>
    <h4>Conteúdo do Relatório:</h4>
    <ul>
        <li><strong>Resumo Superior:</strong> Total com DIFAL e Total com IPI+ST.</li>
        <li><strong>Tabela de Itens:</strong> Detalha cada item com Quantidade, Dimensões, Área, Valor Unitário e Valor Total. A ordem dos itens aqui reflete a ordenação manual que você definiu na aba "Itens".</li>
        <li><strong>Detalhes de Impostos:</strong> Clique no botão <span class="tag is-info"><i class="fas fa-chevron-down"></i></span> ao final da linha de um item para expandir e visualizar a composição detalhada de impostos como DIFAL, IPI, ICMS-ST e ICMS Próprio.</li>
    </ul>
    <h3 class="title is-4">Exportar Proposta para PDF</h3>
    <p>Após finalizar e revisar seu orçamento, você pode gerar um documento PDF profissional.</p>
    <ol>
        <li>Verifique se todos os dados na aba <i class="fas fa-stamp mr-2"></i> <strong>Proposta</strong> estão corretos (dados do cliente, termos, etc.).</li>
        <li>Navegue até a aba <i class="fas fa-file-invoice mr-2"></i> <strong>Orçamento</strong>.</li>
        <li>Clique no botão <span class="tag is-primary is-large"><i class="fas fa-file-pdf mr-2"></i>Exportar para PDF</span>.</li>
        <li>O sistema irá gerar e iniciar o download de um arquivo PDF com o nome <code>Orcamento_NumeroDoOrcamento.pdf</code>.</li>
    </ol>
    <h4>Recursos do PDF:</h4>
    <ul>
        <li><strong>Numeração e Ordem:</strong> Os itens no PDF serão numerados e listados exatamente na mesma sequência que você definiu na aba "Itens".</li>
        <li><strong>Cabeçalho e Rodapé:</strong> O cabeçalho com o logotipo e as informações da empresa, bem como o rodapé com a numeração das páginas (Ex: "Página 1 de 3"), são repetidos em todas as páginas do documento.</li>
        <li><strong>Logotipo da Empresa:</strong> O logotipo carregado na aba "Proposta" é inserido no canto superior esquerdo do documento.</li>
        <li><strong>Superfície da Grade:</strong> Se a opção "Serrilhada" for selecionada no modelo, a descrição do item refletirá isso (ex: "GRADE DE PISO AÇO CARBONO SERRILHADA" ou "DEGRAU AÇO CARBONO SERRILHADO"). Para a superfície "Lisa", nada é adicionado.</li>
        <li><strong>Acabamento Dinâmico:</strong> A descrição do item no PDF será ajustada automaticamente. Se houver um custo de galvanização associado ao template (seja global ou customizado), o acabamento será descrito como <strong>"GALVANIZAÇÃO A FOGO"</strong>. Caso contrário, será descrito como <strong>"NATURAL"</strong>.</li>
        <li><strong>Descrição da Malha:</strong> A descrição da malha no PDF informará se o cálculo foi "CENTRO A CENTRO" ou "(INTERNA)", refletindo a seleção feita no template.</li>
    </ul>
    <p class="notification is-warning is-light"><strong>Validações do Logotipo:</strong> Para garantir a qualidade e segurança, o sistema aplica as seguintes regras para a imagem do logotipo:
    <ul>
        <li><strong>Formato do Arquivo:</strong> Apenas imagens <strong>PNG</strong> são aceitas. A validação verifica o conteúdo real do arquivo, não apenas a extensão.</li>
        <li><strong>Tamanho Máximo do Arquivo:</strong> 2 MB.</li>
        <li><strong>Dimensões Máximas da Imagem:</strong> 2000x2000 pixels.</li>
    </ul>
    </p>
</div>
`;