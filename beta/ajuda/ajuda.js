document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('help-search-bar');
    const accordion = document.getElementById('help-accordion');
    const accordionItems = accordion.querySelectorAll('.accordion-item');
    const noResultsMessage = document.getElementById('no-results-message');

    const loadTopicContent = async (item) => {
        const contentDiv = item.querySelector('.accordion-content');
        if (contentDiv.hasAttribute('data-loaded')) {
            return; // Já carregado
        }

        const topicId = item.dataset.topicId;
        if (!topicId) return;

        try {
            contentDiv.innerHTML = '<p class="is-italic has-text-grey">Carregando...</p>';
            const module = await import(`./topics/${topicId}.js`);
            contentDiv.innerHTML = module.content;
            contentDiv.setAttribute('data-loaded', 'true');
            contentDiv.setAttribute('data-original-content', module.content);
        } catch (error) {
            console.error(`Erro ao carregar o tópico '${topicId}':`, error);
            contentDiv.innerHTML = '<p class="has-text-danger">Erro ao carregar conteúdo.</p>';
        }
    };

    const toggleAccordionItem = async (item) => {
        const isActive = item.classList.contains('is-active');

        // Fecha todos os itens
        accordionItems.forEach(i => {
            i.classList.remove('is-active');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Abre ou fecha o item clicado
        if (!isActive) {
            await loadTopicContent(item);
            item.classList.add('is-active');
            const content = item.querySelector('.accordion-content');
            content.style.maxHeight = content.scrollHeight + 48 + "px";
        }
    };

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => toggleAccordionItem(item));
    });

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase().trim();
        let visibleItems = 0;

        accordionItems.forEach(item => {
            const searchTerms = item.dataset.searchTerm.toLowerCase();
            const header = item.querySelector('.card-header-title');
            const contentDiv = item.querySelector('.accordion-content');

            // Restaura o conteúdo original do header para remover destaques antigos
            header.innerHTML = header.textContent;

            if (searchTerms.includes(searchTerm)) {
                item.style.display = 'block';
                visibleItems++;

                // Adiciona destaque ao termo pesquisado
                if (searchTerm) {
                    const regex = new RegExp(searchTerm, 'gi');
                    header.innerHTML = header.innerHTML.replace(regex, `<span class="highlight">${searchTerm}</span>`);

                    // Destaca no conteúdo se já estiver carregado
                    if (contentDiv.hasAttribute('data-loaded')) {
                        const originalContent = contentDiv.getAttribute('data-original-content');
                        contentDiv.innerHTML = originalContent.replace(regex, `<span class="highlight">${searchTerm}</span>`);
                    }
                } else {
                    // Se a busca for limpa, restaura o conteúdo original se carregado
                    if (contentDiv.hasAttribute('data-loaded')) {
                        contentDiv.innerHTML = contentDiv.getAttribute('data-original-content');
                    }
                }
            } else {
                item.style.display = 'none';
            }
        });

        noResultsMessage.style.display = visibleItems === 0 ? 'block' : 'none';
    });
});