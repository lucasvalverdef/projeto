
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



 