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
  