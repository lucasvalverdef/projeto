
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
  
  document.getElementById('txtcnpj').addEventListener('input', function(e) {
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

 function voltarpag(){
  window.history.back();
 
}
var btnVoltar = document.querySelector('#btn-voltar')
btnVoltar.addEventListener('click', function(){
     menuCliente.style.display = 'none';
     menuFazervenda.style.display = 'block';
});

var btnVoltarFornec = document.querySelector('#btn-voltar-fornecedor')
btnVoltarFornec.addEventListener('click', function(){
      divcadastrarforncedor.style.display = 'none';
      divfazerpedido.style.display = 'block';
});



function redirecionar(){
  var numero = document.getElementById('numero-fornecedor').value;
    var qtdprodutos = document.getElementById('quantidade').value;
     
  if(numero && quantidade){
     var texto = 'Olá, Quero fazer um Pedido. > Produto:  >  Quantidade: ${quantidade} ' ;
     var urlwhatsapp = 'https://wa.me/$[numero}?text=${encodeURIComponent(mensagem)}';
     window.open(urlwhatsapp, '_blank');

  } else {
alert("Por favor, preencha o número e a quantiade de produtos.");

  }
}
     
      

var btnenviar = document.querySelector('#btn-enviar')
function enviar(){
var qtdprod = document.getElementById('quantidade')
btnenviar.addEventListener('click', function(){


});
    
}
