document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalClientes");
    const abrirModalBtn = document.getElementById("abrirModalCliente");
    const fecharModalBtn = document.getElementById("fecharModal");
    const listaClientes = document.getElementById("listaClientes");
    const clienteSelecionadoInput = document.getElementById("clienteSelecionado");
    const clienteNomeSelecionado = document.getElementById("clienteNomeSelecionado");
    const clienteCpfSelecionado = document.getElementById("clienteCpfSelecionado");
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
                    li.textContent = `${cliente.nomeCliente} - CPF: ${cliente.cpfCliente}`; // Adicionado CPF na lista
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
        const clienteNomeCpf = event.target.textContent;
        const [clienteNome, clienteCpf] = clienteNomeCpf.split(' - CPF: '); // Extrai o nome e CPF
        // Definir o valor do cliente selecionado
        clienteSelecionadoInput.value = clienteId;
        clienteNomeSelecionado.textContent = ` ${clienteNome}`;
        clienteCpfSelecionado.textContent = ` ${clienteCpf}`; // Adicionado CPF ao texto
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
            cpfCliente: document.getElementById("cpfCliente").value
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

// Adiciona a data atual no formato "DD/MM/YYYY"
function adicionarDataVenda() {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString('pt-BR'); // Formata a data
    document.getElementById('dataVenda').textContent = dataFormatada; // Adiciona a data ao elemento
}

// Chame essa função quando a venda for finalizada
adicionarDataVenda();

function finalizarVenda() {
        // Pega o total da comanda
        const total = parseFloat(document.querySelector('#total').textContent); // Pega o total como número
    
        // Atualiza o total na seção de venda
        document.querySelector('#totalFinalizar').textContent = total.toFixed(2); // Formata para duas casas decimais
}
document.getElementById("finalizarVenda").addEventListener("click", finalizarVenda);

// Evento para o botão "Confirmar Venda"
document.getElementById("btnFinalizarVenda").addEventListener("click", function () {
    // Lógica para finalizar a venda
    const total = parseFloat(document.querySelector('#total').textContent);
    document.getElementById('valorTotalComprovante').textContent = total.toFixed(2);
    
    // Exibir o pop-up
    document.getElementById("popupOpcoesVenda").style.display = "flex"; 
});

// Fechar o pop-up
document.getElementById("btnFecharPopup").addEventListener("click", function () {
    document.getElementById("popupOpcoesVenda").style.display = "none"; 
});

// Imprimir PDF
document.getElementById("btnImprimirPDF").addEventListener("click", function () {
    console.log("Imprimir PDF"); // Aqui você deve adicionar sua lógica de impressão
});

// Compartilhar no WhatsApp
document.getElementById("btnCompartilharWhatsApp").addEventListener("click", function () {
    console.log("Compartilhar no WhatsApp"); // Aqui você deve adicionar sua lógica de compartilhamento
});
