
var menuItem = document.querySelectorAll('.item-menu')
function selectLink(){
    menuItem.forEach((item)=>
      item.classList.remove('ativo')
    )
this.classList.add('ativo')
}
/*verifica sempre que o usuario clicar*/
menuItem.forEach((item)=>
   item.addEventListener('click', selectLink)
)

//expandir menu

var btnExp = document.querySelector('#btn-exp')
var menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function(){
  menuSide.classList.toggle('expandir')
})


//serve para receber os botões do menu 


var btnVender = document.querySelector('#vender')
var menuVendas = document.querySelector('.cxvenda')

var btnProdutos = document.querySelector('#produtos')
var menuProdutos = document.querySelector('.cxproduto')

var btnFornecedores = document.querySelector('#fornecedores')
var menuFornecedores = document.querySelector('.cxfornecedor')

var btnMais = document.querySelector('#mais')
var menuMais = document.querySelector('.cxmais')


// serve para fazer com que os botões troquem as divs que aparecem na tela

btnVender.addEventListener('click', function(){
       menuVendas.style.display = 'block';
       menuFornecedores.style.display = 'none';
       menuProdutos.style.display = 'none';
       menuMais.style.display = 'none';
     }
);

btnProdutos.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'none';
    menuProdutos.style.display = 'block';
    menuMais.style.display = 'none';
});

btnFornecedores.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'block';
    menuProdutos.style.display = 'none';
    menuMais.style.display = 'none';
  }
);

btnMais.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'none';
    menuProdutos.style.display = 'none';
    menuMais.style.display = 'block';
  }
);

var btnCliente = document.querySelector('#btn-cliente')
var menuCliente = document.querySelector('.class-cadastrar-cliente')
var menuFazervenda = document.querySelector('.class-fazer-venda')
btnCliente.addEventListener('click', function(){
     menuCliente.style.display = 'block';
     menuFazervenda.style.display ='none';
});

var btnVoltar = document.querySelector('#btn-voltar')
btnVoltar.addEventListener('click', function(){
     menuCliente.style.display = 'none';
     menuFazervenda.style.display = 'block';
});



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
  const imageInput = document.getElementById('product-image');
  const description = document.getElementById('product-description').value;
  const price = document.getElementById('product-price').value;

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
//  marllon

  // verifica cnpj de fornecedor válido
  function validaCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
    if(cnpj == '' || cnpj.length != 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;
    return true;
  }
  
  document.getElementById('cnpj-valida').addEventListener('submit', function(e) {
    var cnpj = document.getElementById('cnpj').value;
    if (!validaCNPJ(cnpj)) {
      e.preventDefault(); // Impede o envio do formulário
      alert('CNPJ inválido. Por favor, verifique o número digitado.');
      document.getElementById('cnpj').focus(); // Foca no campo de CNPJ após detectar erro
    }
  });
  
  document.getElementById('cnpj').addEventListener('input', function(e) {
    var value = e.target.value;
    var rawValue = value.replace(/\D/g, ''); // Remove tudo que não é número
  
    // Verifica se o CNPJ tem 15 dígitos e se o primeiro dígito é '0'
    if (rawValue.length === 15 && rawValue.startsWith('0')) {
      // Verifica se, ao remover o '0', o restante é um CNPJ válido
      var potentialCNPJ = rawValue.substring(1);
      // Atualiza rawValue para o CNPJ sem o '0' inicial
      if (validaCNPJ(potentialCNPJ)) rawValue = potentialCNPJ;
    }
  
    var cnpjPattern = rawValue
            .replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após o segundo dígito
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após o quinto dígito
            .replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após o oitavo dígito
            .replace(/(\d{4})(\d)/, '$1-$2') // Adiciona traço após o décimo segundo dígito
            .replace(/(-\d{2})\d+?$/, '$1'); // Impede a entrada de mais de 14 dígitos
    e.target.value = cnpjPattern;
  });


  
var btncadastrofornecedor = document.querySelector('#btn-fornecedor')
var divfazerpedido = document.querySelector('.class-fazer-pedido')
var divcadastrarfornecedor = document.querySelector('.cadastrar-fornecedor')

 
btncadastrofornecedor.addEventListener('click', function(){
  divfazerpedido.style.display ='none';
  divcadastrarfornecedor.style.display = 'block';
  
 });

 //verificação/validação para enviar mensagem ao whatsapp

function handleGetFormValues(){
  const whatsapp= document.getElementById('whatsapp').value
  const message=document.getElementById('message').value
//verifica se o numero é válido e retorna uma mensagem caso não tenha
if (typeof whatsapp !== 'string' || whatsapp ===""){
  
    return alert('Digite um numero de whastapp válido')  
}
//verifica se a caixa de texto contem algo e retorna uma mensagem caso não tenha
if (typeof message !== 'string' || message ===""){
  
    return alert('Digite uma mensagem')

}
return{
  whatsapp,
  message
}

}

//faz o envio da mensagem

async function handleSubmitWhatsappMessage(phone, message) {
 
  const GZAPPY_URL = "https://aps.gzappy.com/v1/message/send-message"

const response = await fetch(GZAPPY_URL,  {

method: 'POST',
headers: {
'Content-Type': 'application/json',
'user token_id': USER_TOKEN_ID,
},
body: JSON.stringify({

instance_id: INSTANCE_ID, 
instance_token: INSTANCE_TOKEN,
message: [message],
phone: phone

})

})

const data = await response.json()

console.log(data)

//mso: Messages enviada

}

 async function handleSubmitForm(){
  const data = handleGetFormValues()
  
  console.log(data)

  if (data){
    await handleSubmitWhatsappMessage(data.whatsapp, data.message)
  }

}
//  marllon

// matheus
function toggleOptions() {
  var container = document.querySelector(".cxmais");
  if (container.style.display === "none" || container.style.display === "") {
      container.style.display = "block";
  } else {
      container.style.display = "none";
  }
}

// Eventos para os botões das opções
document.getElementById('btn-contato').addEventListener('click', function() {
  document.getElementById('conteudo-interativo').innerHTML = `
      <h3>Contato</h3>
      <p>Para entrar em contato conosco, envie um e-mail para suporte@lojadetelefones.com ou ligue para (11) 1234-5678.</p>
  `;
});

document.getElementById('btn-configuracoes').addEventListener('click', function() {
  document.getElementById('conteudo-interativo').innerHTML = `
      <h3>Configurações</h3>
      <p>Aqui você pode ajustar as configurações da sua conta e preferências do sistema.</p>
  `;
});

document.getElementById('btn-ajuda').addEventListener('click', function() {
  document.getElementById('conteudo-interativo').innerHTML = `
      <h3>Ajuda</h3>
      <p>Precisa de ajuda? Consulte nossa seção de FAQs ou entre em contato com o suporte.</p>
  `;
});

// Função para ocultar a seção "Mais Opções" quando não estiver em uso
function hideOptions() {
  document.querySelector(".cxmais").style.display = "none";
}
