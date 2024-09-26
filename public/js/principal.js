
var menuItem = document.querySelectorAll('.itemmenu')
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

var btnExp = document.querySelector('#btnexp')
var menuSide = document.querySelector('.menulateral')

btnExp.addEventListener('click', function(){
  menuSide.classList.toggle('expandir')
})


//serve para receber os botões do menu 

const cabeçalho = document.querySelector('.cabeçalho')

var btnVender = document.querySelector('#vender')
var menuVendas = document.querySelector('.cxvenda')

var btnProdutos = document.querySelector('#produtos')
var menuProdutos = document.querySelector('.cxproduto')

var btnFornecedores = document.querySelector('#fornecedores')
var menuFornecedores = document.querySelector('.cxfornecedor')

var btnMais = document.querySelector('#mais')
var menuMais = document.querySelector('.cxmais')

var btncadastrarprodutos = document.querySelector('#btnadicionarprodutos')
var cadastrarprodutos = document.querySelector('.cadastrarprodutos')
var containerprodutos = document.querySelector('.containerprodutos')

// serve para fazer com que os botões troquem as divs que aparecem na tela

btnVender.addEventListener('click', function(){
       menuVendas.style.display = 'block';
       menuFornecedores.style.display = 'none';
       menuProdutos.style.display = 'none';
       menuMais.style.display = 'none';
       cabeçalho.textContent = "Vender";
       
     }
);

btnProdutos.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'none';
    menuProdutos.style.display = 'grid';
    menuMais.style.display = 'none';
    cabeçalho.textContent = "Produtos";
});

btnFornecedores.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'block';
    menuProdutos.style.display = 'none';
    menuMais.style.display = 'none';
    cabeçalho.textContent = "Fornecedores";
  }
);

btnMais.addEventListener('click', function(){
    menuVendas.style.display = 'none';
    menuFornecedores.style.display = 'none';
    menuProdutos.style.display = 'none';
    menuMais.style.display = 'block';
    cabeçalho.textContent = "Mais";
  }
);

var menuCliente = document.querySelector('.classfinalizarvenda')
var btnVoltar = document.querySelector('#btnvoltarvendas')

btnVoltar.addEventListener('click', function(){
     menuCliente.style.display = 'none';
     menuFazervenda.style.display = 'block';
}
);






 