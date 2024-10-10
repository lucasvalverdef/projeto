document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas'); // Div da cxvenda
    const productForm = document.getElementById('productform');
    const clienteForm = document.getElementById('clienteForm');
    let total = 0;

    // Função para adicionar produto à lista de produtos na cxvenda
    function addProductToList(imageSrc, name, price) {
        const vendasDiv = document.createElement('div');
        vendasDiv.classList.add('itemprodutovenda');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = name;

        const desc = document.createElement('p');
        desc.textContent = `${name} - R$ ${price.toFixed(2)}`;

        vendasDiv.appendChild(img);
        vendasDiv.appendChild(desc);

        // Adiciona um evento de clique para adicionar à comanda
        vendasDiv.addEventListener('click', function () {
            console.log(`Produto clicado: ${name}, R$${price}`); // Verifique no console se o evento de clique está sendo disparado
            addToCart(name, price);
        });

        listaprodutosvendas.appendChild(vendasDiv);
    }

    // Função para adicionar produto à comanda
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
            addProductToList(imageSrc, name, price); // Adiciona produto à lista
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
const btnvoltarvendas = document.querySelector('#btnvoltarvendas');

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

    document.getElementById('foneCliente').addEventListener('input', function (e) {
        let telefone = e.target.value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
        telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses nos dois primeiros dígitos
        telefone = telefone.replace(/(\d{5})(\d{1,4})/, "$1-$2"); // Coloca um traço entre o quinto e o sexto dígito
        e.target.value = telefone; // Atualiza o valor no campo de input
    });
});
