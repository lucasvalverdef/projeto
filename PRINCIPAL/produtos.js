 //  comandos para lidar com a adição de imagens de produtos
 document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
  
    imageUpload.addEventListener('change', function(event) {
        // Limpar a área de visualização da imagem
        imagePreview.innerHTML = '';
  
        // Verificar se um arquivo foi selecionado
        const file = event.target.files[0];
        if (file) {
            // Criar um objeto URL para o arquivo selecionado
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Imagem do produto';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    });
  });
  
  document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obter dados do formulário
    const imageInput = document.getElementById('productimg');
    const description = document.getElementById('productdesc').value;
    const price = document.getElementById('productprice').value;
  
    // Criar URL para a imagem
    const imageUrl = URL.createObjectURL(imageInput.files[0]);
  
    // Criar elemento do produto
    const productItem = document.createElement('div');
    productItem.className = 'item-produto';
  
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productItem.appendChild(productImage);
  
    const productDescription = document.createElement('p');
    productDescription.textContent = description;
    productItem.appendChild(productDescription);
  
    const productPrice = document.createElement('p');
    productPrice.textContent = `R$ ${price}`;
    productItem.appendChild(productPrice);
  
    // Adicionar produto à lista
    document.getElementById('lista-produtos').appendChild(productItem);
  
    // Limpar o formulário
   document.getElementById('product-form').reset();
  });
  
  var btnprodutos = document.querySelector('#btn-produtos')
  var divprodutos = document.querySelector('.cadastrar-produtos')
  var divListaProdutos = document.querySelector('#lista-produtos')
   btnprodutos.addEventListener('click', function(){
   divprodutos.style.display ='block';
   divListaProdutos.style.display = 'none';
  });
  
  var btnAdicionarProduto = document.querySelector('#btn-adicionar-produtos')
   
    btnAdicionarProduto.addEventListener('click', function(){
       divprodutos.style.display ='none';
       divListaProdutos.style.display ='block';
    })
  