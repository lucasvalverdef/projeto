const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Produto = require('../models/Produto');

// Diretório de upload
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.memoryStorage(); // Mude para armazenar em memória
const upload = multer({ storage });

// Rota para adicionar produtos
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Verificar se todos os campos estão preenchidos corretamente
    if (!req.file || !name || !description || !price || isNaN(price)) {
      return res.status(400).json({ message: "Erro: Todos os campos devem ser preenchidos corretamente." });
    }

    // Redimensionar a imagem usando sharp
    const resizedImageBuffer = await sharp(req.file.buffer)
      .resize(100, 100) // Defina a largura e altura desejadas
      .toFormat('jpeg') // Formato desejado
      .jpeg({ quality: 90 }) // Configurações de qualidade
      .toBuffer();

    // Criar um nome de arquivo único para a imagem
    const filename = `${Date.now()}-${req.file.originalname}`;
    const filepath = path.join(uploadDir, filename);

    // Salvar a imagem redimensionada no disco
    fs.writeFileSync(filepath, resizedImageBuffer);

    // Criar um novo produto
    const newProduct = new Produto({
      productname: name,
      productdesc: description,
      productprice: parseFloat(price),
      productimg: `/uploads/${filename}` // Caminho da imagem no servidor
    });

    // Salvar o novo produto no banco de dados
    await newProduct.save();
    res.status(201).json({ message: "Produto adicionado com sucesso!" });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(500).json({ message: "Erro ao adicionar produto" });
  }
});

// Rota para buscar todos os produtos
router.get('/all', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
