// Função para gerar PDF
function gerarPDF(valorTotal, itensVenda) {
    const { jsPDF } = window.jspdf; // Acesse a biblioteca jsPDF
    const doc = new jsPDF();

    // Adiciona conteúdo ao PDF
    doc.text("Comprovante de Venda", 10, 10);
    doc.text(`Valor Total: R$ ${valorTotal}`, 10, 20);

    let y = 30; // Posição inicial para os itens
    itensVenda.forEach(item => {
        doc.text(item, 10, y);
        y += 10; // Incrementa a posição vertical
    });

    doc.save('comprovante_venda.pdf'); // Salva o PDF
}

// Adiciona o evento ao botão de gerar PDF
document.getElementById('btnGerarPDF').addEventListener('click', function () {
    const valorTotal = document.getElementById('valorTotalComprovante').textContent;
    const itens = Array.from(document.getElementById('itensVendaComprovante').children);
    const itensVenda = itens.map(item => item.textContent);

    gerarPDF(valorTotal, itensVenda); // Chama a função para gerar o PDF
});
