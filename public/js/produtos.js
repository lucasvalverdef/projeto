document.addEventListener('DOMContentLoaded', function () {

  const listaprodutos = document.getElementById('listaprodutos');
  const productForm = document.getElementById('productform'); // Formulário de cadastro de produtos
    
  // Função para adicionar produto à lista de produtos
  function addProductToList(imageSrc, name, price, descricao) {
      const productDiv = document.createElement('div');
      productDiv.classList.add('itemproduto');

      const img = document.createElement('img');
      img.src = imageSrc;
      img.alt = name;

      const desc = document.createElement('p');
      desc.textContent = `${name} - R$ ${price.toFixed(2)}`;
      
      const descricaoElement = document.createElement('p');
      descricaoElement.textContent = descricao;

      productDiv.appendChild(img);
      productDiv.appendChild(desc);
      productDiv.appendChild(descricaoElement);
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
      e.preventDefault(); // Evita o comportamento padrão do formulário

      const imgFile = document.getElementById('productimg').files[0];
      const name = document.getElementById('productname').value.trim();
      const descricao = document.getElementById('productdesc').value.trim(); 
      const price = parseFloat(document.getElementById('productprice').value);

      // Verifica se os campos estão preenchidos
      if (!imgFile) {
          alert('Por favor, selecione uma imagem.');
          return;
      }
      if (!name) {
          alert('Por favor, preencha o nome do produto.');
          return;
      }
      if (isNaN(price)) {
          alert('Por favor, insira um preço válido.');
          return;
      }

      const formData = new FormData();
      formData.append('image', imgFile);
      formData.append('name', name);
      formData.append('description', descricao);
      formData.append('price', price);

      // Envio da requisição usando fetch
      fetch('/user/produtoRota/add', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro ao adicionar produto');
          }
          return response.json(); // Mudei para json() para pegar a mensagem
      })
      .then(data => {
          console.log(data.message); // Mensagem de sucesso
          addProductToList(URL.createObjectURL(imgFile), name, price, descricao); 
          productForm.reset(); // Limpa o formulário
          document.getElementById('imagepreview').innerHTML = ''; 
          document.getElementById('imagepreview').style.display = 'none'; 
      })
      .catch(error => {
          console.error('Erro:', error);
          alert(`Erro ao adicionar produto: ${error.message}`);
      });
  });

  // Função para buscar produtos do backend
  async function buscarProdutos() {
      try {
          const response = await fetch('/user/produtoRota/all');  // Certifique-se de que esta rota retorne os produtos
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
  
  // Chama a função ao carregar a página
  buscarProdutos();
  
  // Função para exibir produtos
  function renderizarProdutos(produtos) {
      listaprodutos.innerHTML = ''; // Limpa a lista antes de renderizar

      produtos.forEach(produto => {
          addProductToList(produto.productimg, produto.productname, produto.productprice, produto.productdesc);
      });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const btncadastrarprodutos = document.querySelector('#btncadastrarprodutos');
  const containerprodutos = document.querySelector('.containerprodutos');
  const cadastrarprodutos = document.querySelector('.cadastrarprodutos');

  // Verifica se o botão foi encontrado
  if (btncadastrarprodutos) {
      btncadastrarprodutos.addEventListener('click', function () {
          containerprodutos.style.display = 'none'; // Oculta a lista de produtos
          cadastrarprodutos.style.display = 'block'; // Exibe o formulário de cadastro
      });
  } else {
      console.error('Elemento btncadastrarprodutos não encontrado.');
  }
  const btnvoltarprodutos = document.querySelector('#btnvoltarprodutos');
  btnvoltarprodutos.addEventListener('click', function(){
    containerprodutos.style.display = 'block'; //exibe o cadastro
    cadastrarprodutos.style.display = 'none'; //oculta o cadastro
  });
});