const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Produto = require('../models/Produto'); // O modelo do produto no MongoDB

// Verifica se o diretório 'public/uploads' existe e o cria se não existir
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para salvar imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Usa o diretório criado
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome único para cada imagem
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Erro: Tipo de arquivo não suportado!'));
    }
  }
});

// Rota para adicionar produtos
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validação adicional
    if (!req.file || !name || !description || !price || isNaN(price)) {
      return res.status(400).json({ message: "Erro: Todos os campos devem ser preenchidos corretamente." });
    }

    const newProduct = new Produto({
      productname: name,
      productdesc: description,
      productprice: parseFloat(price), // Garantir que o preço seja um número
      productimg: `/uploads/${req.file.filename}`
    });

    await newProduct.save();
    res.status(201).json({ message: "Produto adicionado com sucesso!" });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(500).json({ message: "Erro ao adicionar produto" });
  }
});

// Rota para buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

module.exports = router;
