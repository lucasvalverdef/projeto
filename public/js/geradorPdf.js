// Função para gerar PDF com estilo personalizado e logo
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar logo da empresa
    const logo = new Image();
    logo.src = '/img/logo.png'; // Caminho da logo
    logo.onload = function() {
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adiciona a logo na posição (10, 10) com largura 50 e altura 20
        
        // Cabeçalho do PDF
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 102, 204); // Cor do texto do cabeçalho (azul)
        doc.text("Comprovante de Venda", 105, 30, null, null, 'center'); // Ajuste a posição Y para dar espaço para a logo

        // Desenhar linha abaixo do cabeçalho
        doc.setLineWidth(1);
        doc.setDrawColor(0, 102, 204); // Cor azul
        doc.line(10, 35, 200, 35); // Ajuste a linha de acordo com a nova posição do cabeçalho

        // Estilo para informações da venda
        const startY = 45; // Posição inicial para as informações
        const lineHeight = 10; // Altura das linhas
        const itemSpacing = 10; // Aumenta o espaçamento entre os itens
        const boxWidth = 190; // Largura das caixas
        const margin = 10; // Margem lateral

        // Caixa para Data da Venda
        doc.setDrawColor(200, 200, 200); // Cor da borda
        doc.setFillColor(220, 240, 255); // Cor de fundo suave em azul claro
        doc.rect(margin, startY - 5, boxWidth, lineHeight * 6 + 10, 'F'); // Desenha a caixa
        doc.setLineWidth(0.5);
        doc.rect(margin, startY - 5, boxWidth, lineHeight * 6 + 10); // Borda da caixa

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Cor do texto
        doc.text("Data da Venda: " + document.querySelector('#dataVenda').textContent.trim(), margin + 5, startY);
        doc.text("Cliente: " + document.querySelector('#clienteNomeComprovante').textContent.trim(), margin + 5, startY + lineHeight);
        doc.text("CPF: " + document.querySelector('#clienteCpfComprovante').textContent.trim(), margin + 5, startY + lineHeight * 2);
        doc.text("Email: " + document.querySelector('#clienteEmailComprovante').textContent.trim(), margin + 5, startY + lineHeight * 3);
        doc.text("Telefone: " + document.querySelector('#clienteTelefoneComprovante').textContent.trim(), margin + 5, startY + lineHeight * 4);
        doc.text("Endereço: " + document.querySelector('#clienteEnderecoComprovante').textContent.trim(), margin + 5, startY + lineHeight * 5);

        // Linha de separação
        doc.setLineWidth(1);
        doc.line(margin, startY + lineHeight * 6 + 10, margin + boxWidth, startY + lineHeight * 6 + 10);

        // Título dos Itens da Venda
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 102, 204); // Cor do título
        doc.text("Itens da Venda:", margin, startY + lineHeight * 6 + 15);
        
        // Caixa para Itens da Venda
        const itensStartY = startY + lineHeight * 6 + 20;
        const itensBoxHeight = 10 + lineHeight * (Math.max(1, document.querySelectorAll('#itensVenda li').length)) + itemSpacing * (document.querySelectorAll('#itensVenda li').length - 1); // altura baseada na quantidade de itens
        doc.setFillColor(220, 240, 255); // Cor de fundo suave em azul claro
        doc.rect(margin, itensStartY - 5, boxWidth, itensBoxHeight, 'F'); // Desenha a caixa para itens
        doc.setLineWidth(0.5);
        doc.rect(margin, itensStartY - 5, boxWidth, itensBoxHeight); // Borda da caixa

        // Adicionar itens da venda
        let y = itensStartY;
        const itens = document.querySelectorAll('#itensVenda li'); // Seleciona todos os itens da lista
        if (itens.length > 0) {
            itens.forEach(item => {
                const textoItem = item.textContent.trim();
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0); // Cor do texto
                
                // Desenhar cada item como uma linha em uma tabela
                const itemHeight = lineHeight + itemSpacing; // Altura de cada item com espaçamento
                doc.setFillColor(240, 240, 240); // Cor de fundo dos itens (cinza claro)
                doc.rect(margin + 5, y - 5, boxWidth - 10, itemHeight, 'F'); // Desenha a caixa para o item
                doc.setLineWidth(0.5);
                doc.rect(margin + 5, y - 5, boxWidth - 10, itemHeight); // Borda da caixa do item
                
                doc.text(textoItem, margin + 10, y); // Adiciona o texto do item
                y += itemHeight; // Incrementa a posição vertical
            });
        } else {
            doc.text("Nenhum item encontrado na venda.", margin + 5, y);
        }

        // Linha de separação
        y += 10; // Incrementa a posição para o total
        doc.setLineWidth(1);
        doc.line(margin, y, margin + boxWidth, y); 

        // Total Final
        doc.setFontSize(12);
        doc.setTextColor(0, 102, 204); // Cor do texto do total

        // Garantir que o total é um número válido
        let total = parseFloat(document.querySelector('#totalFinalizar').textContent.trim().replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (isNaN(total)) {
            total = 0; // Defina como 0 se não for um número válido
        }

        doc.text(`Total: R$ ${total.toFixed(2)}`, margin + 5, y + 5);

        // Informações sobre Garantia
        y += 15; // Incrementa a posição
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Cor do texto
        doc.text("Os produtos comprados têm garantia de 3 meses a partir da data da compra. Guarde este comprovante para validação da garantia.", margin + 5, y);
        
        // Agradecimento
        y += 20; // Incrementa a posição
        doc.setFontSize(12);
        doc.setFont("helvetica", "italic"); // Itálico para o agradecimento
        doc.setTextColor(0, 102, 204); // Cor do texto
        doc.text("Obrigado pela sua compra!", 105, y, null, null, 'center');

        // Rodapé com informações da empresa
        y += 15; // Incrementa a posição
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal"); // Fonte normal para o rodapé
        doc.setTextColor(150, 150, 150); // Cor do texto do rodapé
        doc.text("Imperial Mobile | Rua Exemplo, 123 | Telefone: (31) 99626-2171", margin + 5, y);

        // Salvando o PDF
        doc.save('comprovante_venda_estilizado.pdf');
    };
}

// Evento de clique para gerar PDF
document.querySelector('#btnGerarPDF').addEventListener('click', function () {
    gerarPDF();
});
