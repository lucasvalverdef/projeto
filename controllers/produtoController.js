const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Função para salvar e redimensionar a imagem
async function salvarImagem(req, res) {
    try {
        // Verifica se o arquivo de imagem foi enviado
        if (!req.file) {
            return res.status(400).send('Nenhuma imagem foi enviada.');
        }

        // Caminho para salvar a imagem redimensionada
        const outputDir = path.join(__dirname, '../public/img');
        const outputPath = path.join(outputDir, req.file.filename);

        // Verifica se o diretório de saída existe, se não, cria
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Usar o sharp para redimensionar a imagem
        await sharp(req.file.path)
            .resize(50, 50) // Define o tamanho padronizado
            .toFile(outputPath); // Salva a imagem redimensionada

        // Remove a imagem original (sem redimensionar)
        fs.unlinkSync(req.file.path);

        // Continuar com o processo de salvar o produto no banco de dados...
        res.status(200).send('Imagem salva com sucesso e redimensionada!');

    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        res.status(500).send('Erro ao processar a imagem.');
    }
}

module.exports = { salvarImagem };
