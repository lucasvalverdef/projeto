
 const fornecedorescadastrados = document.querySelector('.fornecedorescadastrados')
 const cadastrofornecedor = document.querySelector('.cadastrofornecedor');
 const informacoesfornecedor = document.querySelector('.informacoesfornecedor');
 const detalhesfornecedor = document.querySelector('.detalhesfornecedor');
 const botoesacaofornecedor = document.querySelector('.botoesacaofornecedor');
 const documentacaofornecedor = document.querySelector('.documentacaofornecedor');
 const btncadastrarfornecedor = document.querySelector('#btncadastrarfornecedor')
 const btnvoltarfornecedor = document.querySelector('#btnvoltarfornecedor')


 btncadastrarfornecedor.addEventListener('click', function(){
 cadastrofornecedor.style.display = 'block';
 fornecedorescadastrados.style.display = 'none';
});

 btnvoltarfornecedor.addEventListener('click', function(){
  cadastrofornecedor.style.display = "none";
  fornecedorescadastrados.style.display = "block";
 });

 document.addEventListener("DOMContentLoaded", async () => {
  try {
      const response = await fetch('/user/fornecedorRota/all');
      if (!response.ok) {
          throw new Error('Erro ao obter fornecedores');
      }
      const fornecedores = await response.json();
      const fornecedoresCadastradosDiv = document.getElementById("fornecedoresCadastrados");

      // Limpar a div antes de adicionar os fornecedores
      fornecedoresCadastradosDiv.innerHTML = `
          <h2>Fornecedores Cadastrados</h2>
          <table id="fornecedoresTable">
              <thead>
                  <tr>
                      <th>Nome</th>
                      <th>CNPJ/CPF</th>
                      <th>Endereço</th>
                      <th>Telefone</th>
                      <th>Email</th>
                      <th>Site</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
          </table>
      `; // Inicializa a tabela
      
      const tbody = fornecedoresCadastradosDiv.querySelector("tbody");
      
      // Adicionar cada fornecedor à tabela
      fornecedores.forEach(fornecedor => {
          const row = document.createElement('tr');
          
          // Montar o conteúdo da linha com informações
          row.innerHTML = `
              <td>${fornecedor.nomeFornecedor}</td>
              <td>${fornecedor.cnpjFornecedor}</td>
              <td>${fornecedor.enderecoFornecedor}</td>
              <td>${fornecedor.foneFornecedor}</td>
              <td>${fornecedor.emailFornecedor}</td>
              <td><a href="${fornecedor.siteFornecedor}" target="_blank">${fornecedor.siteFornecedor}</a></td>
          `;

          // Adiciona o evento de clique para mostrar detalhes
          row.onclick = () => showSupplierDetails(fornecedor._id); 
          tbody.appendChild(row);
      });
  } catch (error) {
      console.error(error);
      alert('Erro ao carregar fornecedores.'); // Avisar o usuário sobre o erro
  }
});

function showSupplierDetails(id) {
  // Lógica para mostrar os detalhes do fornecedor
  console.log("Mostrando detalhes do fornecedor com ID:", id);
  // Você pode implementar a lógica de exibição de detalhes conforme necessário
}

 




