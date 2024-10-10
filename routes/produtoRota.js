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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
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

// Função para redimensionar a imagem
async function redimensionarImagem(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(250, 250)
    .toFile(outputPath);
}

// Rota para adicionar produtos
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file || !name || !description || !price || isNaN(price)) {
      return res.status(400).json({ message: "Erro: Todos os campos devem ser preenchidos corretamente." });
    }

    const outputPath = path.join(uploadDir, req.file.filename);
    await redimensionarImagem(req.file.path, outputPath);
    fs.unlinkSync(req.file.path);

    const newProduct = new Produto({
      productname: name,
      productdesc: description,
      productprice: parseFloat(price),
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
