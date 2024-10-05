document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas');
    const productForm = document.getElementById('productform'); // Formulário de cadastro de produtos
    const clienteForm = document.getElementById('clienteForm'); // Formulário de cadastro de clientes
    const btnfinalizarvenda = document.querySelector('#finalizarVenda');
    const classfinalizarvenda = document.querySelector('.classfinalizarvenda');
    const containervenda = document.querySelector('.containervenda');

    let total = 0;

    // Função para adicionar produto à lista de produtos
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

        // Evento de clique para adicionar à comanda
        vendasDiv.addEventListener('click', function () {
            addToCart(name, price);
        });

        listaprodutosvendas.appendChild(vendasDiv);
    }

    // Função para adicionar produto à comanda
    window.addToCart = function (name, price) {
        // Cria um item da lista
        const li = document.createElement('li');
        li.textContent = `${name} - R$ ${price.toFixed(2)}`;
        cartItems.appendChild(li);

        // Atualiza o total
        total += price; 
        totalElement.textContent = total.toFixed(2);

        // Cria um botão de excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btnexcluircomanda');

        // Adiciona um evento de clique ao botão de excluir
        btnExcluir.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede que o evento clique no 'li' seja chamado
            li.remove(); // Remove o item da comanda
            total -= price; // Subtrai o preço do total
            totalElement.textContent = total.toFixed(2); // Atualiza o total
        });

        // Adiciona o botão ao item da lista
        li.appendChild(btnExcluir);
    };

    // Manipulador de envio do formulário de cadastro de produtos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        const imgFile = document.getElementById('productimg').files[0];
        const name = document.getElementById('productname').value;
        const descricao = document.getElementById('productdesc').value; // Captura a descrição
        const price = parseFloat(document.getElementById('productprice').value);

        if (!imgFile || !name || isNaN(price)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            addProductToList(imageSrc, name, price); // Passa a descrição corretamente
            productForm.reset(); // Limpa o formulário
            document.getElementById('imagepreview').innerHTML = ''; // Limpa a pré-visualização
            document.getElementById('imagepreview').style.display = 'none'; // Esconde a pré-visualização
        };

        reader.readAsDataURL(imgFile);
    });

    // Manipulador de envio do formulário de cadastro de cliente
    clienteForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o envio padrão do formulário

        const nomeCliente = document.getElementById('nomeCliente').value;
        const emailCliente = document.getElementById('emailCliente').value;
        const foneCliente = document.getElementById('foneCliente').value;

        // Adicione sua lógica para adicionar o cliente ou enviar os dados
        console.log('Cliente adicionado:', { nomeCliente, emailCliente, foneCliente });

        // Resetar o formulário
        clienteForm.reset();
    });

    // Finalização de vendas
    btnfinalizarvenda.addEventListener('click', function () {
        document.getElementById('valorTotal').textContent = total.toFixed(2); // Atualiza o valor total da venda
        classfinalizarvenda.style.display = 'block';
        containervenda.style.display = 'none';
    });

    // const btnvoltarvendas = document.querySelector('#btnvoltarvendas');
    // btnvoltarvendas.addEventListener('click', function () {
    //     classfinalizarvenda.style.display = 'none';
    //     containervenda.style.display = 'flex';
    // });

    // Adicione um listener para mostrar a pré-visualização da imagem do produto
    document.getElementById('productimg').addEventListener('change', function() {
        const imgFile = this.files[0];
        const preview = document.getElementById('imagepreview');
        
        if (imgFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                preview.innerHTML = `<img src="${event.target.result}" alt="Pré-visualização" style="max-width: 100px;">`;
                preview.style.display = 'block'; // Exibe a pré-visualização
            };
            reader.readAsDataURL(imgFile);
        } else {
            preview.innerHTML = '';
            preview.style.display = 'none'; // Esconde a pré-visualização
        }
    });
});
