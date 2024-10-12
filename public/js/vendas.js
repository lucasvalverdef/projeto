document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas');
    const productForm = document.getElementById('productform');
    let total = 0; // Inicializa a variável total

    // Função para buscar e renderizar produtos do backend
    async function buscarProdutos() {
        try {
            const response = await fetch('/user/produtoRota');  // Verifique a rota no backend
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
            const vendaElement = createProductElement(produto.productimg, produto.productname, produto.productprice, null, true, function() {
                addToCart(produto.productname, produto.productprice);
            });
            listaprodutosvendas.appendChild(vendaElement);
        });
    }

    // Função auxiliar para criar elementos de produto
    function createProductElement(imageSrc, name, price, description, isVenda = false, clickCallback = null) {
        const productDiv = document.createElement('div');
        productDiv.classList.add(isVenda ? 'itemprodutovenda' : 'itemproduto');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = name;

        const desc = document.createElement('p');
        desc.textContent = `${name} - R$ ${price.toFixed(2)}`;

        productDiv.appendChild(img);
        productDiv.appendChild(desc);

        if (description) {
            const descricao = document.createElement('p');
            descricao.textContent = description;
            productDiv.appendChild(descricao);
        }

        if (isVenda && clickCallback) {
            productDiv.addEventListener('click', clickCallback);
        }

        return productDiv;
    }

    // Função para adicionar produto à comanda
    // Função para adicionar produto à comanda
function addToCart(name, price) {
    // Verifica se o produto já está no carrinho
    const existingItem = Array.from(cartItems.children).find(item => item.dataset.name === name);

    if (existingItem) {
        // Se o produto já está no carrinho, atualiza a quantidade e o valor total
        const quantityElement = existingItem.querySelector('.quantity');
        const totalPriceElement = existingItem.querySelector('.totalprice');

        let quantity = parseInt(quantityElement.textContent);
        quantity++;

        const newTotalPrice = quantity * price;

        // Atualiza a exibição da quantidade e do valor total do produto
        quantityElement.textContent = quantity;
        totalPriceElement.textContent = ` ${newTotalPrice.toFixed(2)}`;

        // Atualiza o total geral corretamente
        total += price; // Aumenta o total com o preço do produto adicionado
        totalElement.textContent = ` ${total.toFixed(2)}`; // Substitui o texto anterior
    } else {
        // Se o produto não está no carrinho, adiciona-o como novo
        const li = document.createElement('li');
        li.dataset.name = name; // Usado para verificar se o item já existe
        li.innerHTML = `  
            <span class="quantity">1</span>x ${name} - R$ ${price.toFixed(2)}
            <span class="totalprice">R$ ${price.toFixed(2)}</span> (Total)
        `;

        // Botão de excluir produto da comanda
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btnexcluircomanda');

        // Evento de exclusão do item
        btnExcluir.addEventListener('click', function (e) {
            e.stopPropagation();
            const quantity = parseInt(li.querySelector('.quantity').textContent);
            li.remove();
            total -= price * quantity; // Atualiza o total corretamente ao remover
            totalElement.textContent = ` ${total.toFixed(2)}`; // Substitui o texto anterior
        });

        li.appendChild(btnExcluir);
        cartItems.appendChild(li);

        // Atualiza o total geral corretamente
        total += price; // Aumenta o total com o preço do novo produto
        totalElement.textContent = ` ${total.toFixed(2)}`; // Substitui o texto anterior
    }
}
    
    // Chamada da função para buscar produtos ao carregar a página
    buscarProdutos();

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
    const containervenda = document.querySelector('.containervenda');

    btnfinalizarvenda.addEventListener('click', function () {
        classfinalizarvenda.style.display = 'block';
        containervenda.style.display = 'none';
    });

    // Pré-visualização da imagem do produto
    document.getElementById('productimg').addEventListener('change', function () {
        previewImage(this, document.getElementById('imagepreview'));
    });

    // Função para pré-visualização de imagem
    function previewImage(input, previewElement) {
        const imgFile = input.files[0];

        if (imgFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                previewElement.innerHTML = `<img src="${event.target.result}" alt="Pré-visualização" style="max-width: 100px;">`;
                previewElement.style.display = 'block';
            };
            reader.readAsDataURL(imgFile);
        } else {
            previewElement.innerHTML = '';
            previewElement.style.display = 'none';
        }
    }
    
    // Exibe o formulário de finalização de venda com informações dos itens vendidos
btnfinalizarvenda.addEventListener('click', function () {
    const classfinalizarvenda = document.querySelector('.classfinalizarvenda');
    const containervenda = document.querySelector('.containervenda');

    // Exibe os itens da venda
    const itensVenda = document.getElementById('itensVenda');
    itensVenda.innerHTML = ''; // Limpa a lista antes de adicionar os itens

    Array.from(cartItems.children).forEach(item => {
        const quantity = item.querySelector('.quantity').textContent;
        const name = item.dataset.name;
        const totalprice = item.querySelector('.totalprice').textContent;

        const listItem = document.createElement('li');
        listItem.textContent = `${quantity} x ${name} - ${totalprice}`;
        itensVenda.appendChild(listItem);
    });

    // Atualiza o valor total
    const total = totalElement.textContent.split('R$ ')[1];
    document.getElementById('valorTotal').textContent = total;

    classfinalizarvenda.style.display = 'block';
    containervenda.style.display = 'none';
});
});
