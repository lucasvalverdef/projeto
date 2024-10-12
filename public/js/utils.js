// Função para criar um produto genérico
function createProductElement(imageSrc, name, price, descricao = null, addClickToCart = false, onClickFunction = null) {
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

    // Se tiver uma função de clique, adiciona
    if (addClickToCart && onClickFunction) {
        productDiv.addEventListener('click', onClickFunction);
    }

    return productDiv;
}

// Função para adicionar um item à comanda
function addToCart(name, price, cartItems, totalElement) {
    let total = parseFloat(totalElement.textContent) || 0;
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

// Função para pré-visualização de imagens
function previewImage(inputElement, previewElement) {
    const imgFile = inputElement.files[0];

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
