document.addEventListener('DOMContentLoaded', function () {
    const listaprodutos = document.getElementById('listaprodutos');
    const cartItems = document.getElementById('cartitems');
    const productForm = document.getElementById('productform');
    let total = 0;

    // Função para adicionar produto à lista de produtos
    function addProductToList(imageSrc, name, price, descrição) {
        const productDiv = document.createElement('div');
        productDiv.classList.add('itemproduto');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = name;

        const desc = document.createElement('p');
        desc.textContent = `${name} - R$ ${price.toFixed(2)}`;
        
        const descricaoElement = document.createElement('p'); // Corrigido para evitar redeclaração
        descricaoElement.textContent = descrição; // Use a variável correta

        productDiv.appendChild(img);
        productDiv.appendChild(desc);
        productDiv.appendChild(descricaoElement); // Adiciona o parágrafo com a descrição
        listaprodutos.appendChild(productDiv);
    }

    // Pré-visualização da imagem ao selecionar um arquivo
    document.getElementById('productimg').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imagePreview = document.getElementById('imagepreview');
                imagePreview.innerHTML = ''; // Limpa a pré-visualização anterior

                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100px'; // Ajuste o tamanho conforme necessário

                imagePreview.appendChild(img);
                imagePreview.style.display = 'block'; // Mostra a imagem
            };
            reader.readAsDataURL(file);
        }
    });

    // Manipulador de envio do formulário de cadastro de produtos
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const imgFile = document.getElementById('productimg').files[0];
        const name = document.getElementById('productname').value;
        const descrição = document.getElementById('productdesc').value; // Captura a descrição
        const price = parseFloat(document.getElementById('productprice').value);

        if (!imgFile || !name || isNaN(price)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            addProductToList(imageSrc, name, price, descrição); // Passa a descrição corretamente
            productForm.reset();
            document.getElementById('imagepreview').innerHTML = ''; // Limpa a pré-visualização
            document.getElementById('imagepreview').style.display = 'none'; // Esconde a pré-visualização
        };

        reader.readAsDataURL(imgFile);
    });

    // Manipuladores de botão para mostrar/ocultar formulários
    var btncadastrarprodutos = document.querySelector('#btncadastrarprodutos');
    var containerprodutos = document.querySelector('.containerprodutos');
    var cadastrarprodutos = document.querySelector('.cadastrarprodutos');
    var btnvoltarprodutos = document.querySelector('#btnvoltarprodutos');

    btncadastrarprodutos.addEventListener('click', function() {
        containerprodutos.style.display = 'none';
        cadastrarprodutos.style.display = 'block';
    });

    btnvoltarprodutos.addEventListener('click', function() {
        containerprodutos.style.display = 'flex';
        cadastrarprodutos.style.display = 'none';
    });

});
