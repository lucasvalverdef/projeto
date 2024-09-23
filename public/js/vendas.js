document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    let total = 0;

    // Função para adicionar produto à comanda
    window.addToCart = function(product) {
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));

        const li = document.createElement('li');
        li.textContent = `${name} - R$ ${price.toFixed(2)}`;
        cartItems.appendChild(li);

        // Atualiza o total (apenas o valor, sem texto adicional)
        total += price;
        totalElement.textContent = total.toFixed(2); // Exibe apenas o valor
    };
});