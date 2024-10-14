document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalClientes");
    const abrirModalBtn = document.getElementById("abrirModalCliente");
    const fecharModalBtn = document.getElementById("fecharModal");
    const listaClientes = document.getElementById("listaClientes");
    const clienteSelecionadoInput = document.getElementById("clienteSelecionado");
    const clienteNomeSelecionado = document.getElementById("clienteNomeSelecionado");
    const pesquisaClienteInput = document.getElementById("pesquisarCliente"); // Campo de pesquisa

    // Modal de Cadastrar Cliente
    const modalCadastrarCliente = document.getElementById("modalCadastrarCliente");
    const adicionarClienteBtn = document.getElementById("adicionarClienteBtn"); // Botão de adicionar cliente
    const fecharModalCadastrarBtn = document.getElementById("fecharModalCadastrar");

    // Função para abrir o modal de seleção de cliente
    abrirModalBtn.addEventListener("click", function () {
        modal.style.display = "block";

        // Fazer requisição AJAX para buscar os clientes
        fetch('/user/clienteRota/all')
            .then(response => response.json())
            .then(clientes => {
                listaClientes.innerHTML = ''; // Limpar a lista

                // Adicionar cada cliente à lista
                clientes.forEach(cliente => {
                    const li = document.createElement('li');
                    li.textContent = cliente.nomeCliente;
                    li.setAttribute('data-id', cliente._id);
                    listaClientes.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar clientes:', error);
            });
    });

    // Função para fechar o modal de seleção de cliente
    fecharModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Função para abrir o modal de cadastro de cliente
    const botaoCadastrarCliente = document.getElementById("botaoCadastrarCliente");
    botaoCadastrarCliente.addEventListener("click", function () {
        modalCadastrarCliente.style.display = "block";
    });

    // Função para fechar o modal de cadastro de cliente
    fecharModalCadastrarBtn.addEventListener("click", function () {
        modalCadastrarCliente.style.display = "none";
    });

    // Fechar o modal clicando fora da área de conteúdo
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == modalCadastrarCliente) {
            modalCadastrarCliente.style.display = "none";
        }
    };

    // Função para selecionar um cliente da lista
    listaClientes.addEventListener("click", function (event) {
        const clienteId = event.target.getAttribute('data-id');
        const clienteNome = event.target.textContent;

        // Definir o valor do cliente selecionado
        clienteSelecionadoInput.value = clienteId;
        clienteNomeSelecionado.textContent = `Cliente Selecionado: ${clienteNome}`;

        // Fechar o modal
        modal.style.display = "none";
    });

    // Função para filtrar clientes
    pesquisaClienteInput.addEventListener('input', function () {
        filtrarClientes();
    });

    // Função para adicionar cliente
    adicionarClienteBtn.addEventListener("click", async function () {
        const novoCliente = {
            nomeCliente: document.getElementById("nomeCliente").value,
            emailCliente: document.getElementById("emailCliente").value,
            foneCliente: document.getElementById("foneCliente").value,
            cidadeCliente: document.getElementById("cidadeCliente").value,
            cepCliente: document.getElementById("cepCliente").value,
        };

        try {
            // Fazer requisição AJAX para adicionar o cliente
            const response = await fetch('/user/clienteRota/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Mensagem de sucesso
                modalCadastrarCliente.style.display = "none"; // Fechar o modal
                // Limpar os campos do formulário
                document.getElementById("clienteForm").reset();
            } else {
                alert(data.message || "Erro ao adicionar cliente.");
            }
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
            alert("Erro ao adicionar cliente.");
        }
    });
});

// Função para filtrar a lista de clientes
function filtrarClientes() {
    const input = document.getElementById('pesquisarCliente');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('listaClientes');
    const li = ul.getElementsByTagName('li');

    // Itera sobre todos os itens da lista e oculta aqueles que não correspondem à pesquisa
    for (let i = 0; i < li.length; i++) {
        const txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}