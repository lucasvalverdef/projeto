function showRegistrationPopup(message) {
    document.getElementById('registrationPopupMessage').innerText = message;
    document.getElementById('registrationPopupOverlay').style.display = 'block';
    document.getElementById('registrationPopup').style.display = 'block';
}

function closeRegistrationPopup() {
    document.getElementById('registrationPopupOverlay').style.display = 'none';
    document.getElementById('registrationPopup').style.display = 'none';
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    const successMessage = urlParams.get('success');

    if (errorMessage) {
        showRegistrationPopup(errorMessage);
    } else if (successMessage) {
        showRegistrationPopup(successMessage);
    }
};

// Função para abrir o pop-up de opções de venda
function abrirOptionsPopup() {
    document.getElementById('optionsPopup').style.display = 'block'; // Mostra o pop-up
    document.getElementById('optionsPopupOverlay').style.display = 'block'; // Mostra o overlay
}

// Função para fechar o pop-up de opções de venda
function fecharOptionsPopup() {
    document.getElementById('optionsPopup').style.display = 'none'; // Esconde o pop-up
    document.getElementById('optionsPopupOverlay').style.display = 'none'; // Esconde o overlay
}

// Adiciona evento de clique ao botão "Confirmar Venda"
document.getElementById('btnConfirmarVenda').addEventListener('click', abrirOptionsPopup);

// Adiciona evento de clique ao botão de fechar do pop-up de opções
document.getElementById('closeOptionsPopup').addEventListener('click', fecharOptionsPopup);

// Fechar o pop-up ao clicar fora dele
window.addEventListener('click', function(event) {
    const optionsPopup = document.getElementById('optionsPopup');
    if (event.target === optionsPopup) {
        fecharOptionsPopup();
    }
});
