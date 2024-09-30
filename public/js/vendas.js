document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartitems');
    const totalElement = document.getElementById('total');
    const listaprodutosvendas = document.getElementById('listaprodutosvendas');
    const productForm = document.getElementById('productform'); // Formulário de cadastro de produtos
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
    btnExcluir.classList.add('btnexcluircomanda'); // Remover o '#' para adicionar a classe corretamente

    // Adiciona um evento de clique ao botão de excluir
    btnExcluir.addEventListener('click', function () {
        // Remove o item da comanda
        li.remove(); // Use 'li' para remover o item correto
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

    // Finalização de vendas
    const btnfinalizarvenda = document.querySelector('#finalizarVenda');
    const classfinalizarvenda = document.querySelector('.classfinalizarvenda');
    const containervenda = document.querySelector('.containervenda')

    btnfinalizarvenda.addEventListener('click', function () {
        classfinalizarvenda.style.display = 'block';
        containervenda.style.display = 'none';
    });
    const btnvoltarvendas = document.querySelector('#btnvoltarvendas');

    btnvoltarvendas.addEventListener('click', function () {
        classfinalizarvenda.style.display = 'none';
        containervenda.style.display = 'flex';
    });
});
