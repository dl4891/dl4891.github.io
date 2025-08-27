export const content = `
<div class="card-content content">
    <p>A aba <i class="fas fa-stamp mr-2"></i> <strong>Proposta</strong> é onde você insere todas as informações comerciais que irão compor o cabeçalho e o rodapé da sua proposta em PDF.</p>
    <h3 class="title is-4">Campos da Proposta</h3>
    <ul>
        <li><strong>Dados da Empresa:</strong> Informações da sua empresa que aparecerão no cabeçalho (Nome, Endereço, CNPJ, etc.).</li>
        <li><strong>Logotipo da Empresa:</strong> Permite fazer o upload de uma imagem (logotipo) que será exibida no canto superior esquerdo do PDF.</li>
        <li><strong>Dados do Cliente:</strong> Nome/Razão Social, CNPJ/CPF e a **UF de Destino**.</li>
        <li><strong>Dados do Orçamento:</strong> Número do orçamento, data de validade.</li>
        <li><strong>Dados do Vendedor:</strong> Nome e informações de contato.</li>
        <li><strong>Termos Comerciais:</strong> Prazo de entrega, condições de pagamento e informações sobre o frete.</li>
    </ul>
    <p class="notification is-danger is-light"><strong>Atenção: A UF de Destino!</strong> O campo "UF do Cliente" nesta aba é <strong>crucial</strong>. A UF selecionada aqui é usada para buscar as alíquotas de ICMS e MVA corretas para TODOS os cálculos na aba "Lucro". Se você alterar a UF de destino, todos os preços já calculados serão invalidados e precisarão ser recalculados.</p>
</div>
`;