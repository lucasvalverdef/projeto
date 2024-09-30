document.addEventListener('DOMContentLoaded', () => {
  // Função para carregar um arquivo CSS
  function loadCSS(filename) {
    if (!document.querySelector(`link[href="/css/${filename}"]`)) { // Verifica se o CSS já está carregado
      const link = document.createElement('link'); // Cria um elemento <link>
      link.rel = 'stylesheet'; // Define o relacionamento como stylesheet
      link.href = `/css/${filename}`; // Define o caminho do arquivo CSS
      document.head.appendChild(link); // Adiciona o <link> ao <head> do documento
    }
  }
  
  function loadJS(filename) {
    if (!document.querySelector(`script[src="/js/${filename}"]`)) { // Verifica se o JS já está carregado
      const script = document.createElement('script'); // Cria um elemento <script>
      script.src = `/js/${filename}`; // Define o caminho do arquivo JavaScript
      document.body.appendChild(script); // Adiciona o <script> ao <body> do documento
    }
  }

  // Função para descarregar um arquivo CSS
  function unloadCSS(filename) {
    const link = document.querySelector(`link[href="${filename}"]`);
    if (link) {
      document.head.removeChild(link); // Remove o <link> do <head>
    }
  }

  // Função para descarregar um arquivo JavaScript
  function unloadJS(filename) {
    const script = document.querySelector(`script[src="${filename}"]`);
    if (script) {
      document.body.removeChild(script); // Remove o <script> do <body>
    }
  }

  // Event listener para quando a área de produtos for clicada
  document.querySelector('.cxproduto').addEventListener('click', () => {
    unloadCSS('vendas.css'); // Remove CSS de vendas se estiver carregado
    unloadJS('vendas.js'); // Remove JS de vendas se estiver carregado
    loadCSS('produtos.css'); // Carrega o CSS específico para produtos
    loadJS('produtos.js'); // Carrega o JS específico para produtos
  });

  // Event listener para quando a área de vendas for clicada
  document.querySelector('.cxvenda').addEventListener('click', () => {
    unloadCSS('produtos.css'); // Remove CSS de produtos se estiver carregado
    unloadJS('produtos.js'); // Remove JS de produtos se estiver carregado
    loadCSS('vendas.css'); // Carrega o CSS específico para vendas
    loadJS('vendas.js'); // Carrega o JS específico para vendas
  });

  // Event listener para quando a área de fornecedores for clicada
  document.querySelector('.cxfornecedor').addEventListener('click', () => {
    unloadCSS('produtos.css'); // Remove CSS de produtos se estiver carregado
    unloadCSS('vendas.css'); // Remove CSS de vendas se estiver carregado
    unloadJS('produtos.js'); // Remove JS de produtos se estiver carregado
    unloadJS('vendas.js'); // Remove JS de vendas se estiver carregado
    loadCSS('fornecedores.css'); // Carrega o CSS específico para fornecedores
    loadJS('fornecedores.js'); // Carrega o JS específico para fornecedores
  });

  // Event listener para quando a área de mais for clicada
  document.querySelector('.cxmais').addEventListener('click', () => {
    unloadCSS('produtos.css'); // Remove CSS de produtos se estiver carregado
    unloadCSS('vendas.css'); // Remove CSS de vendas se estiver carregado
    unloadJS('produtos.js'); // Remove JS de produtos se estiver carregado
    unloadJS('vendas.js'); // Remove JS de vendas se estiver carregado
    loadCSS('mais.css'); // Carrega o CSS específico para mais
    loadJS('mais.js'); // Carrega o JS específico para mais
  });

  // Função para adicionar a classe "ativo" ao menu
  function selectLink() {
    const menuItem = document.querySelectorAll('.itemmenu');
    menuItem.forEach((item) => item.classList.remove('ativo')); // Remove a classe "ativo" de todos os itens
    this.classList.add('ativo'); // Adiciona a classe "ativo" ao item clicado
  }

  // Verifica sempre que o usuário clicar
  const menuItem = document.querySelectorAll('.itemmenu');
  menuItem.forEach((item) => item.addEventListener('click', selectLink)); // Adiciona o evento de clique a cada item

  // Expande o menu lateral
  const btnExp = document.querySelector('#btnexp');
  const menuSide = document.querySelector('.menulateral');

  // Adiciona um evento de clique ao botão de expansão
  btnExp.addEventListener('click', function() {
    menuSide.classList.toggle('expandir'); // Alterna a classe "expandir" no menu lateral
  });

  // Adiciona funcionalidade para alternar entre as seções do menu
  const cabeçalho = document.querySelector('.cabeçalho');
  const btnVender = document.querySelector('#vender');
  const menuVendas = document.querySelector('.cxvenda');
  const btnProdutos = document.querySelector('#produtos');
  const menuProdutos = document.querySelector('.cxproduto');
  const btnFornecedores = document.querySelector('#fornecedores');
  const menuFornecedores = document.querySelector('.cxfornecedor');
  const btnMais = document.querySelector('#mais');
  const menuMais = document.querySelector('.cxmais');

  btnVender.addEventListener('click', function() {
    menuVendas.style.display = 'block'; // Exibe a seção de vendas
    menuFornecedores.style.display = 'none'; // Oculta a seção de fornecedores
    menuProdutos.style.display = 'none'; // Oculta a seção de produtos
    menuMais.style.display = 'none'; // Oculta a seção de mais
    cabeçalho.textContent = "Vender"; // Altera o cabeçalho
  });

  btnProdutos.addEventListener('click', function() {
    menuVendas.style.display = 'none'; // Oculta a seção de vendas
    menuFornecedores.style.display = 'none'; // Oculta a seção de fornecedores
    menuProdutos.style.display = 'grid'; // Exibe a seção de produtos
    menuMais.style.display = 'none'; // Oculta a seção de mais
    cabeçalho.textContent = "Produtos"; // Altera o cabeçalho
  });

  btnFornecedores.addEventListener('click', function() {
    menuVendas.style.display = 'none'; // Oculta a seção de vendas
    menuFornecedores.style.display = 'block'; // Exibe a seção de fornecedores
    menuProdutos.style.display = 'none'; // Oculta a seção de produtos
    menuMais.style.display = 'none'; // Oculta a seção de mais
    cabeçalho.textContent = "Fornecedores"; // Altera o cabeçalho
  });

  btnMais.addEventListener('click', function() {
    menuVendas.style.display = 'none'; // Oculta a seção de vendas
    menuFornecedores.style.display = 'none'; // Oculta a seção de fornecedores
    menuProdutos.style.display = 'none'; // Oculta a seção de produtos
    menuMais.style.display = 'block'; // Exibe a seção de mais
    cabeçalho.textContent = "Mais"; // Altera o cabeçalho
  });
});
