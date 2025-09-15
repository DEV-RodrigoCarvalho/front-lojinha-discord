document.getElementById('add-product-form').addEventListener('submit', function(event) {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Pega os valores dos campos do formulário
    const nome = document.getElementById('product-name').value;
    const preco = document.getElementById('product-price').value;
    const imagem = document.getElementById('product-image').value;

    // Carrega os produtos já existentes do localStorage ou cria uma lista vazia
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    // Adiciona o novo produto à lista
    produtos.push({
        nome: nome,
        preco: preco,
        imagem: imagem
    });

    // Salva a lista atualizada de volta no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Avisa o usuário que o produto foi adicionado e limpa o formulário
    alert('Produto adicionado com sucesso!');
    this.reset();
});