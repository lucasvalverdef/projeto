document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas'); // Div da cxvenda
    const productForm = document.getElementById('productform');
    let total = 0;

    // Função para adicionar um produto à comanda
    function addToCart(name, price) {
        const li = document.createElement('li');
        li.textContent = `${name} - R$ ${price.toFixed(2)}`;
        cartItems.appendChild(li);

        total += price;
        totalElement.textContent = total.toFixed(2);

        // Botão de excluir produto da comanda
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btnexcluircomanda');

        // Evento de exclusão do item
        btnExcluir.addEventListener('click', function (e) {
            e.stopPropagation();
            li.remove();
            total -= price;
            totalElement.textContent = total.toFixed(2);
        });

        li.appendChild(btnExcluir);
    }

    // Função genérica para criar um produto com lógica de clique opcional
    function createProductElement(imageSrc, name, price, descricao = null, addClickToCart = false) {
        const productDiv = document.createElement('div');
        productDiv.classList.add(addClickToCart ? 'itemprodutovenda' : 'itemproduto');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = name;

        const desc = document.createElement('p');
        desc.textContent = `${name} - R$ ${price.toFixed(2)}`;

        productDiv.appendChild(img);
        productDiv.appendChild(desc);

        if (descricao) {
            const descricaoElement = document.createElement('p');
            descricaoElement.textContent = descricao;
            productDiv.appendChild(descricaoElement);
        }

        // Se for para "cxvenda", adiciona lógica de clique para adicionar à comanda
        if (addClickToCart) {
            productDiv.addEventListener('click', function () {
                addToCart(name, price);
            });
        }

        return productDiv;
    }

    // Função para buscar e renderizar produtos do backend
    async function buscarProdutos() {
        try {
            const response = await fetch('/user/produtoRota');
            const produtos = await response.json();

            if (response.ok) {
                renderizarProdutos(produtos);
            } else {
                console.error('Erro ao buscar produtos:', produtos.message);
            }
        } catch (err) {
            console.error('Erro de requisição:', err);
        }
    }

    // Função para exibir produtos em ambas as listas
    function renderizarProdutos(produtos) {
        const listaprodutos = document.getElementById('listaprodutos');
        listaprodutos.innerHTML = '';
        listaprodutosvendas.innerHTML = '';

        produtos.forEach(produto => {
            // Adiciona produto na lista principal
            const productElement = createProductElement(produto.productimg, produto.productname, produto.productprice, produto.productdesc);
            listaprodutos.appendChild(productElement);

            // Adiciona produto na lista de vendas com lógica de clique
            const vendaElement = createProductElement(produto.productimg, produto.productname, produto.productprice, null, true);
            listaprodutosvendas.appendChild(vendaElement);
        });
    }

    // Chamando a função ao carregar a página
    document.addEventListener('DOMContentLoaded', buscarProdutos);

    // Manipulador de envio do formulário de cadastro de produtos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const imgFile = document.getElementById('productimg').files[0];
        const name = document.getElementById('productname').value;
        const descricao = document.getElementById('productdesc').value;
        const price = parseFloat(document.getElementById('productprice').value);

        if (!imgFile || !name || isNaN(price)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            const productElement = createProductElement(imageSrc, name, price, descricao);
            document.getElementById('listaprodutos').appendChild(productElement);
            productForm.reset();
            document.getElementById('imagepreview').innerHTML = '';
            document.getElementById('imagepreview').style.display = 'none';
        };

        reader.readAsDataURL(imgFile);
    });

    // Finalização de vendas
    const btnfinalizarvenda = document.querySelector('#finalizarVenda');
    const classfinalizarvenda = document.querySelector('.classfinalizarvenda');
    const containervenda = document.querySelector('.containervenda')

    btnfinalizarvenda.addEventListener('click', function () {
        classfinalizarvenda.style.display = 'block';
        containervenda.style.display = 'none';
    });

    // Pré-visualização da imagem do produto
    document.getElementById('productimg').addEventListener('change', function() {
        const imgFile = this.files[0];
        const preview = document.getElementById('imagepreview');

        if (imgFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                preview.innerHTML = `<img src="${event.target.result}" alt="Pré-visualização" style="max-width: 100px;">`;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(imgFile);
        } else {
            preview.innerHTML = '';
            preview.style.display = 'none';
        }
    });
});
