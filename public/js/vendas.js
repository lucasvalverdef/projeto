document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    let total = 0;

    // Função para adicionar produto à comanda
    window.addToCart = function (name, price, imageSrc) {
        const li = document.createElement('li');
        li.textContent = `${name} - R$ ${price.toFixed(2)}`;
        cartItems.appendChild(li);

        total += price;
        totalElement.textContent = total.toFixed(2);
    };
});
