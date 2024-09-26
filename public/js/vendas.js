document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas')
    let total = 0;

    // Função para adicionar produto à lista de produtos
    function addProductToList(imageSrc, name, price, ) {
        const vendasDiv = document.createElement('div');
        vendasDiv.classList.add('itemprodutovenda');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = name;

        const desc = document.createElement('p');
        desc.textContent = `${name} - R$ ${price.toFixed(2)}`;

        vendasDiv.appendChild(img);
        vendasDiv.appendChild(desc);

        // Evento de clique para adicionar à comanda
        vendasDiv.addEventListener('click', function () {
            addToCart(name, price);
        });

        listaprodutosvendas.appendChild(vendasDiv);
    }



    // Função para adicionar produto à comanda
    window.addToCart = function (name, price, imageSrc) {
        const li = document.createElement('li');
        li.textContent = `${name} - R$ ${price.toFixed(2)}`;
        cartItems.appendChild(li);

        total += price;
        totalElement.textContent = total.toFixed(2);
    };
});

btnfinalizarvenda = document.querySelector('#finalizarVenda')
classfinalizarvenda = document.querySelector('.classfinalizarvenda')
containerprodutos = document.querySelector('.containerprodutos')


btnfinalizarvenda.addEventListener('click' , function(){
    classfinalizarvenda.style.display = 'block';
    containerprodutos.style.display ='none';
});

btnvoltarvendas = document.querySelector('#btnvoltarvendas')

btnvoltarvendas.addEventListener('click' , function(){
    classfinalizarvenda.style.display = 'none';
    containerprodutos.style.display = 'flex';
});