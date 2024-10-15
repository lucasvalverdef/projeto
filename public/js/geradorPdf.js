function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionar logo da empresa no topo à esquerda
    const logo = new Image();
    logo.src = '/img/logo.png'; // Caminho da logo
    logo.onload = function() {
        doc.addImage(logo, 'PNG', 10, 10, 40, 20); // Adiciona a logo no canto superior esquerdo

        // Nome da empresa abaixo da logo
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text("Imperial Mobile", 10, 35);

        // Título "Comprovante de Venda" no topo à direita
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 102, 204); // Cor azul
        doc.text("Comprovante de Venda", 200, 15, null, null, 'right');

        // Data da venda abaixo do título
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Data: " + document.querySelector('#dataVenda').textContent.trim(), 200, 25, null, null, 'right');

        // Informações do cliente abaixo da logo
        const clienteInfoStartY = 45;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("Nome: " + document.querySelector('#clienteNomeComprovante').textContent.trim(), 10, clienteInfoStartY);
        doc.text("Endereço: " + document.querySelector('#clienteEnderecoComprovante').textContent.trim(), 10, clienteInfoStartY + 10);
        doc.text("Telefone: " + document.querySelector('#clienteTelefoneComprovante').textContent.trim(), 10, clienteInfoStartY + 20);
        doc.text("CPF: " + document.querySelector('#clienteCpfComprovante').textContent.trim(), 10, clienteInfoStartY + 30);

        // Desenho da tabela central para os produtos
        const startY = clienteInfoStartY + 50; // Posição da tabela após as informações do cliente
        const columnWidths = [20, 100, 35, 35]; // Larguras para as colunas [Qtd, Descrição, Valor Unit., Valor Total]

        // Cabeçalho da tabela com fundo cinza (estilo Excel)
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0); // Cor preta
        doc.setFillColor(200, 200, 200); // Cor de fundo cinza
        doc.rect(10, startY - 5, 190, 10, 'F'); // Retângulo de fundo cinza para o cabeçalho
        doc.text("Qtd", 12, startY);
        doc.text("Descrição", 32, startY);
        doc.text("Valor Unitário", 132, startY);
        doc.text("Valor Total", 172, startY);

        // Linhas e colunas para a tabela
        doc.setLineWidth(0.2);
        doc.line(10, startY + 5, 200, startY + 5); // Linha abaixo do cabeçalho

        // Adicionar os itens da venda na tabela
        const itens = document.querySelectorAll('#itensVenda li');
        let y = startY + 10;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Cor preta para os itens
        if (itens.length > 0) {
            itens.forEach(item => {
                const partes = item.textContent.trim().split(' '); // Divida o texto para pegar as partes separadas (Qtd, Descrição, Valores)
                const qtd = partes[0];
                const descricao = partes.slice(1, -2).join(' ');
                const valorUnitario = partes[partes.length - 2];
                const valorTotal = partes[partes.length - 1];

                // Adicionar bordas para cada célula
                doc.rect(10, y - 5, columnWidths[0], 10); // Quantidade
                doc.rect(30, y - 5, columnWidths[1], 10); // Descrição
                doc.rect(130, y - 5, columnWidths[2], 10); // Valor Unitário
                doc.rect(170, y - 5, columnWidths[3], 10); // Valor Total

                doc.text(qtd, 12, y); // Quantidade
                doc.text(descricao, 32, y); // Descrição do produto
                doc.text(valorUnitario, 132, y); // Valor unitário
                doc.text(valorTotal, 172, y); // Valor total

                y += 10; // Incrementa a posição Y para a próxima linha
            });
        } else {
            doc.text("Nenhum item encontrado na venda.", 10, y);
        }

        // Caixa ao redor do total geral da venda
        y += 10; // Deixe um espaço após os itens
        const totalBoxX = 150;
        const totalBoxY = y - 5;
        const totalBoxWidth = 50;
        const totalBoxHeight = 10;

        doc.setLineWidth(0.5);
        doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight); // Caixa ao redor do total
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 102, 204); // Cor azul para o total
        let total = parseFloat(document.querySelector('#totalFinalizar').textContent.trim().replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (isNaN(total)) total = 0;
        doc.text("Total: R$ " + total.toFixed(2), 170, y, null, null, 'right'); // Alinha o texto dentro da caixa

        // Agradecimento
        y += 20; // Espaçamento para o agradecimento
        doc.setFontSize(12);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(0, 102, 204);
        doc.text("Obrigado pela sua compra!", 105, y, null, null, 'center');

        // Informações de garantia no rodapé
        const pageHeight = doc.internal.pageSize.height;
        const footerY = pageHeight - 20; // Posição das informações de garantia no pé da página
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Os produtos comprados têm garantia de 3 meses a partir da data da compra.", 10, footerY);
        doc.text("Guarde este comprovante para validação da garantia.", 10, footerY + 10);

        // Rodapé com informações da empresa
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text("Imperial Mobile | Rua Exemplo, 123 | Telefone: (31) 99626-2171", 105, footerY + 20, null, null, 'center');

        // Salvando o PDF com nome personalizado
        const clienteNome = document.querySelector('#clienteNomeComprovante').textContent.trim().replace(/\s+/g, '-');
        const clienteCpf = document.querySelector('#clienteCpfComprovante').textContent.trim();
        doc.save(`comprovante-${clienteNome}-${clienteCpf}.pdf`);
    };
}

// Evento de clique para gerar PDF
document.querySelector('#btnGerarPDF').addEventListener('click', function () {
    gerarPDF();
});
