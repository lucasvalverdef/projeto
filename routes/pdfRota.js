const express = require('express');
const { gerarComprovantePDF } = require('../public/js/geradorPdf'); // Importar a função de PDF
const Venda = require('../models/Venda');
const fs = require('fs');
const router = express.Router();

// Função para parsear valores monetários
function parseCurrency(value) {
    return parseFloat(value.replace(/[^0-9,-]+/g, '').replace(',', '.'));
}

router.post('/gerarpdf', async (req, res) => {
    try {
        const dadosVenda = req.body;

        // Gera o PDF e obtém o caminho do arquivo
        const pdfPath = await gerarComprovantePDF(dadosVenda);

        // Envia o PDF como resposta
        res.download(pdfPath, 'comprovante.pdf'); // Envia o arquivo para download

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        res.status(500).send('Erro ao gerar PDF');
    }
});

module.exports = router;
