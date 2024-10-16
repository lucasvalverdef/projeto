// JavaScript para adicionar funcionalidades
const purchaseList = document.getElementById('purchaseList');

// Adiciona uma compra à lista
function addPurchase() {
    const productName = prompt("Digite o nome do produto:");
    const purchaseDate = prompt("Digite a data da compra (dd/mm/aaaa):");
    const quantity = prompt("Digite a quantidade:");
    const value = prompt("Digite o valor:");

    if (productName && purchaseDate && quantity && value) {
        const purchaseItem = createPurchaseItem(productName, purchaseDate, quantity, value);
        purchaseList.appendChild(purchaseItem);
    } else {
        alert("Por favor, preencha todas as informações.");
    }
}

// Cria um item de compra
function createPurchaseItem(name, date, quantity, value) {
    const purchaseItem = document.createElement('div');
    purchaseItem.classList.add('purchase-item');
    purchaseItem.innerHTML = `
        <strong>Produto:</strong> ${name} <br>
        <strong>Data:</strong> ${date} <br>
        <strong>Quantidade:</strong> ${quantity} <br>
        <strong>Valor:</strong> R$ ${value}
    `;
    return purchaseItem;
}

// Salva os dados do fornecedor
function saveSupplier() {
    // Aqui você pode adicionar a lógica para salvar os dados do fornecedor
    alert("Fornecedor salvo com sucesso!");
}

// Remove o fornecedor
function removeSupplier() {
    // Aqui você pode adicionar a lógica para remover o fornecedor
    alert("Fornecedor removido com sucesso!");
}

// Função para exibir detalhes do fornecedor e ocultar a lista
function showSupplierDetails(supplierId) {
    // Esconder a lista de fornecedores
    document.getElementById('fornecedoresCadastrados').style.display = 'none';

    // Exibir seções de detalhes do fornecedor
    document.getElementById('informacoesBasicas').style.display = 'block';
    document.getElementById('detalhesContato').style.display = 'block';
    document.getElementById('informacoesComerciais').style.display = 'block';
    document.getElementById('produtosFornecidos').style.display = 'block';
    document.getElementById('documentacaoCertificacoes').style.display = 'block';
    document.getElementById('acoesFornecedor').style.display = 'block';
}
