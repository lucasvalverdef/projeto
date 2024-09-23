document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaProdutos = document.getElementById('listaprodutos');
    const productForm = document.getElementById('productform');
    let total = 0;

    // Função para adicionar produto à lista de produtos e à seção de vendas
    function addProductToList(imageSrc, description, price) {
        // Adicionando na lista de produtos (cxproduto)
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = description;
        img.style.width = '100px';

        const desc = document.createElement('p');
        desc.textContent = description + ' - R$' + price.toFixed(2);

        // Adiciona a imagem e a descrição à div do produto
        productDiv.appendChild(img);
        productDiv.appendChild(desc);

        // Adiciona evento de clique na div do produto para adicionar à comanda
        productDiv.addEventListener('click', function () {
            addToCart(description, price);
        });

        listaProdutos.appendChild(productDiv);

        // Adicionando à seção de vendas (products)
        const productsSection = document.querySelector('.products');
        const productInSales = productDiv.cloneNode(true); // Clona o elemento para reutilizar
        
        // Define o evento de click no clone
        productInSales.addEventListener('click', function () {
            addToCart(description, price);
        });
        
        productsSection.appendChild(productInSales);
    }

    // Função para adicionar produto à comanda
    function addToCart(name, price) {
        const li = document.createElement('li');
        li.textContent = `${name} - R$${price.toFixed(2)}`;
        cartItems.appendChild(li);

        // Atualiza o total
        total += price;
        totalElement.textContent = total.toFixed(2);
    }

    // Manipulador de envio do formulário de cadastro de produtos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Pega os dados do formulário
        const imgFile = document.getElementById('productimg').files[0];
        const description = document.getElementById('productdesc').value;
        const price = parseFloat(document.getElementById('productprice').value);

        // Converte o arquivo de imagem para um URL que pode ser exibido
        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;

            // Adiciona o produto à lista de produtos e à seção de vendas
            addProductToList(imageSrc, description, price);
        };

        if (imgFile) {
            reader.readAsDataURL(imgFile);
        }

        // Limpa o formulário após o envio
        productForm.reset();
    });
});

var btnCadastrarProdutos = document.querySelector('#btncadastrarprodutos')
var cadastrarprodutos = document.querySelector('.cadastrarprodutos')
var listaprodutos = document.querySelector('.listaprodutos')

btnCadastrarProdutos.addEventListener('click', function(){
     cadastrarprodutos.style.display = 'block';
     listaprodutos.style.display = 'none';   
});
