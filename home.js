// ==================== SCRIPT FINAL COM CONTADOR CORRIGIDO ====================

document.addEventListener('DOMContentLoaded', () => {

    // ==================== SELETORES DE ELEMENTOS ====================
    const navOpenBtn = document.querySelector('.mobile-open-btn');
    const navCloseBtn = document.querySelector('.mobile-close-btn');
    const primaryNavigation = document.getElementById('primary-navigation');
    const cartOpenBtn = document.getElementById('cart-box');
    const cartContainer = document.getElementById('cart-icon');
    const cartCloseBtn = document.querySelector('#cart-icon .shopping .uil-times');
    const cartItemsContainer = document.querySelector('#cart-icon .cart');
    const cartTotalElement = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const productContainer = document.getElementById('product-list-container');
    const cartCounterElement = document.getElementById('cart-counter'); // NOVO SELETOR PARA O CONTADOR

    // ==================== CARREGAMENTO DE DADOS ====================
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // ==================== FUNÇÕES DO CARRINHO ====================

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    /**
     * FUNÇÃO CORRIGIDA: Agora atualiza o <span>.
     */
    function atualizarContadorCarrinho() {
        if (carrinho.length > 0) {
            cartCounterElement.textContent = carrinho.length;
            cartCounterElement.style.display = 'grid'; // Mostra o contador
        } else {
            cartCounterElement.style.display = 'none'; // Esconde se o carrinho estiver vazio
        }
    }

    function calcularTotalCarrinho() {
        const total = carrinho.reduce((acc, produto) => acc + parseFloat(produto.preco), 0);
        cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    function renderizarItensCarrinho() {
        cartItemsContainer.innerHTML = '';
        if (carrinho.length === 0) {
            cartItemsContainer.innerHTML = `
                <i class="uil uil-shopping-cart-alt"></i>
                <p>Carrinho vazio</p>
            `;
            cartItemsContainer.style.flexDirection = 'column';
            checkoutBtn.style.display = 'none';
        } else {
            cartItemsContainer.style.flexDirection = 'column';
            checkoutBtn.style.display = 'block';
            carrinho.forEach((produto, index) => {
                const itemHTML = `
                    <div class="cart-item" style="display: flex; align-items: center; width: 90%; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
                        <img src="${produto.imagem}" alt="${produto.nome}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
                        <div style="flex-grow: 1; margin: 0 10px;">
                            <p style="margin: 0; font-size: 0.9rem; font-family: 'Montserrat', sans-serif;">${produto.nome}</p>
                            <p style="margin: 0; font-size: 0.8rem; color: #555;">R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                        </div>
                        <button class="remover-item-btn" data-index="${index}" style="background: none; border: none; color: red; cursor: pointer; font-size: 1.2rem;">
                            <i class="uil uil-trash-alt"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.innerHTML += itemHTML;
            });
        }
        atualizarContadorCarrinho(); // Atualiza o número no ícone
        calcularTotalCarrinho();
    }
    
    function finalizarCompra() {
        if (carrinho.length === 0) {
            alert("O seu carrinho está vazio!");
            return;
        }
        alert("Obrigado pela sua compra! O seu pedido foi finalizado com sucesso.");
        carrinho = [];
        salvarCarrinho();
        renderizarItensCarrinho();
    }

    // ==================== LÓGICA DE EXIBIÇÃO DE PRODUTOS ====================
    if (productContainer) {
        // ... (código de exibição de produtos permanece o mesmo) ...
        productContainer.innerHTML = '';
        if (produtos.length === 0) {
            productContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p style="font-size: 1.2rem;">Nenhum produto cadastrado.</p></div>`;
        } else {
            produtos.forEach((produto, index) => {
                const colors = ['black', 'yellow', 'red', 'green', 'blue', 'gray'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                const produtoHTML = `
                    <div class="category bg-${randomColor} grid">
                        <div>
                            <h3 class="text-white fs-50 fs-montserrat">${produto.nome}
                                <span class="block fs-300 fs-poppins">R$ ${parseFloat(produto.preco).toFixed(2)}</span>
                            </h3>
                            <button class="product-btc large-btn text-white bg-red fs-montserrat" data-index="${index}">Adicionar ao Carrinho</button>
                        </div>
                        <div class="product-img-wrapper">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                        </div>
                    </div>
                `;
                productContainer.innerHTML += produtoHTML;
            });
        }
    }

    // ==================== EVENT LISTENERS ====================
    if (navOpenBtn && navCloseBtn && primaryNavigation) {
        navOpenBtn.addEventListener('click', () => {
            primaryNavigation.setAttribute('data-visible', 'true');
            navCloseBtn.setAttribute('data-visible', 'true');
        });
        navCloseBtn.addEventListener('click', () => {
            primaryNavigation.setAttribute('data-visible', 'false');
            navCloseBtn.setAttribute('data-visible', 'false');
        });
    }

    if (cartOpenBtn && cartContainer && cartCloseBtn) {
        cartOpenBtn.addEventListener('click', () => cartContainer.setAttribute('data-visible', 'true'));
        cartCloseBtn.addEventListener('click', () => cartContainer.setAttribute('data-visible', 'false'));
    }

    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', finalizarCompra);
    }

    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.product-btc')) {
            const indexDoProduto = event.target.getAttribute('data-index');
            const produtoParaAdicionar = produtos[indexDoProduto];
            carrinho.push(produtoParaAdicionar);
            salvarCarrinho();
            renderizarItensCarrinho();
            alert(`"${produtoParaAdicionar.nome}" foi adicionado ao carrinho!`);
        }

        const botaoRemover = event.target.closest('.remover-item-btn');
        if (botaoRemover) {
            const indexDoItem = botaoRemover.getAttribute('data-index');
            carrinho.splice(indexDoItem, 1);
            salvarCarrinho();
            renderizarItensCarrinho();
        }
    });

    // ==================== INICIALIZAÇÃO ====================
    renderizarItensCarrinho();
});