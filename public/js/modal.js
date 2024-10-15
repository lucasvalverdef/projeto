document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalClientes");
    const abrirModalBtn = document.getElementById("abrirModalCliente");
    const fecharModalBtn = document.getElementById("fecharModal");
    const listaClientes = document.getElementById("listaClientes");
    const clienteSelecionadoInput = document.getElementById("clienteSelecionado");
    const clienteNomeSelecionado = document.getElementById("clienteNomeComprovante");
    const clienteCpfSelecionado = document.getElementById("clienteCpfComprovante");
    const pesquisaClienteInput = document.getElementById("pesquisarCliente");

    // Modal de Cadastrar Cliente
    const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");
    const adicionarClienteBtn = document.getElementById("adicionarClienteBtn");
    const fecharModalCadastrarBtn = document.getElementById("fecharModalCadastrar");

    // Função para abrir o modal de seleção de cliente
    abrirModalBtn.addEventListener("click", async function () {
        modal.style.display = "block";
        await carregarClientes(); // Carrega os clientes
    });

    async function carregarClientes() {
        try {
            const response = await fetch('/user/clienteRota/all');
            const clientes = await response.json();
            listaClientes.innerHTML = ''; // Limpar a lista

            // Adicionar cada cliente à lista
            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${cliente.nomeCliente}, CPF: ${cliente.cpfCliente}, Email: ${cliente.emailCliente}, Telefone: ${cliente.foneCliente}, Endereço: ${cliente.enderecoCliente}`;
                li.dataset.id = cliente._id;
                li.dataset.nome = cliente.nomeCliente;
                li.dataset.cpf = cliente.cpfCliente;
                li.dataset.email = cliente.emailCliente;
                li.dataset.telefone = cliente.foneCliente;
                li.dataset.endereco = cliente.enderecoCliente;
                listaClientes.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    }

    // Função para fechar o modal de seleção de cliente
    fecharModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Função para abrir o modal de cadastro de cliente
    document.getElementById("botaoCadastrarCliente").addEventListener("click", () => {
        modalCadastrarCliente.style.display = "block"; // Abrir o modal
    });

    // Função para fechar o modal de cadastro de cliente
    fecharModalCadastrarBtn.addEventListener("click", () => {
        modalCadastrarCliente.style.display = "none";
    });

    // Fechar o modal clicando fora da área de conteúdo
    window.onclick = (event) => {
        if (event.target === modal || event.target === modalCadastrarCliente) {
            modal.style.display = "none";
            modalCadastrarCliente.style.display = "none";
        }
    };

    // Função para selecionar um cliente da lista
    listaClientes.addEventListener("click", function (event) {
        const li = event.target.closest('li');
        if (!li) return; // Verifica se o clique foi em um li

        // Armazenar informações do cliente selecionado
        clienteInformacoes = {
            nome: li.dataset.nome,
            cpf: li.dataset.cpf,
            email: li.dataset.email,
            telefone: li.dataset.telefone,
            endereco: li.dataset.endereco
        };

        // Definir o valor do cliente selecionado
        clienteSelecionadoInput.value = li.dataset.id;

        // Atualizando os elementos no DOM com as informações do cliente
        clienteNomeSelecionado.textContent = clienteInformacoes.nome;
        clienteCpfSelecionado.textContent = clienteInformacoes.cpf;
        document.getElementById("clienteEmailComprovante").textContent = clienteInformacoes.email;
        document.getElementById("clienteTelefoneComprovante").textContent = clienteInformacoes.telefone;
        document.getElementById("clienteEnderecoComprovante").textContent = clienteInformacoes.endereco;

        // Fechar o modal
        modal.style.display = "none";
    });

    // Função para adicionar cliente
    adicionarClienteBtn.addEventListener("click", async function () {
        const novoCliente = {
            nomeCliente: document.getElementById("nomeCliente").value,
            emailCliente: document.getElementById("emailCliente").value,
            foneCliente: document.getElementById("foneCliente").value,
            cepCliente: document.getElementById("cepCliente").value,
            enderecoCliente: document.getElementById("enderecoCliente").value,
            cpfCliente: document.getElementById("cpfCliente").value
        };

        try {
            const response = await fetch('/user/clienteRota/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                modalCadastrarCliente.style.display = "none";
                document.getElementById("clienteForm").reset(); // Limpar o formulário após a adição
                await carregarClientes(); // Atualiza a lista de clientes
            } else {
                alert(data.message || "Erro ao adicionar cliente.");
            }
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
            alert("Erro ao adicionar cliente.");
        }
    });
    // Função para formatar a data no formato DD/MM/YYYY
function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para definir a data atual no elemento dataVenda
function definirDataVenda() {
    const dataAtual = new Date(); // Obtém a data atual
    const dataFormatada = formatarData(dataAtual); // Formata a data
    document.getElementById('dataVenda').innerText = dataFormatada; // Define o texto do elemento
}

// Chama a função para definir a data quando a página é carregada
window.onload = definirDataVenda;
});
