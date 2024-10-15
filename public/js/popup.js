function showPopup(message) {
    document.getElementById('popup-message').innerText = message;
    document.getElementById('popup-overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    const successMessage = urlParams.get('success');

    if (errorMessage) {
        showPopup(errorMessage);
    } else if (successMessage) {
        showPopup(successMessage);
    }
};

// Função para abrir o popup
function abrirPopup() {
    document.getElementById('popupOpcoesVenda').style.display = 'block'; // Mostra o popup
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById('popupOpcoesVenda').style.display = 'none'; // Esconde o popup
}

// Adiciona evento de clique ao botão "Confirmar Venda"
document.getElementById('btnConfirmarVenda').addEventListener('click', abrirPopup);

// Adiciona evento de clique ao botão de fechar do popup
document.getElementById('btnFecharPopup').addEventListener('click', fecharPopup);

// Fechar o popup ao clicar fora dele
window.addEventListener('click', function(event) {
    const popup = document.getElementById('popupOpcoesVenda');
    if (event.target === popup) {
        fecharPopup();
    }
});

