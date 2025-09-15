document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('product-list');

    // Tenta carregar os produtos do localStorage. Se não houver, usa um array vazio.
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Função para renderizar (desenhar) a lista de produtos na tela
    function renderizarProdutos() {
        // Limpa a lista antes de redesenhar para não duplicar itens
        productListContainer.innerHTML = '';

        if (produtos.length === 0) {
            productListContainer.innerHTML = '<p style="text-align: center;">Nenhum produto cadastrado.</p>';
            return;
        }

        produtos.forEach((produto, index) => {
            const produtoDiv = document.createElement('div');
            produtoDiv.className = 'product-item';
            produtoDiv.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="product-item-details">
                    <strong>${produto.nome}</strong>
                    <p>Preço: R$ ${produto.preco}</p>
                </div>
                <button class="delete-btn bg-red text-white" data-index="${index}">Excluir</button>
            `;
            productListContainer.appendChild(produtoDiv);
        });
    }

    // Função para excluir um produto
    function excluirProduto(index) {
        // Remove o produto do array pelo seu índice
        produtos.splice(index, 1);
        // Salva o array atualizado de volta no localStorage
        localStorage.setItem('produtos', JSON.stringify(produtos));
        // Redesenha a lista na tela para refletir a exclusão
        renderizarProdutos();
    }

    // Adiciona um "ouvinte" de cliques na área da lista.
    // Isso é mais eficiente do que adicionar um ouvinte para cada botão.
    productListContainer.addEventListener('click', (event) => {
        // Verifica se o clique foi em um botão de exclusão
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            excluirProduto(index);
        }
    });

    // Chama a função para mostrar os produtos assim que a página carrega
    renderizarProdutos();
});