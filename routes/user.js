const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Adicionando o módulo fs
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
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada imagem
  }
});

const upload = multer({ storage: storage });

// Rota GET para a página principal (ajuste conforme necessário)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'PRINCIPAL', 'principal.html')); // Pode ser substituído por renderização de uma view
});

// Rota para adicionar produtos
router.post('/produto/add', upload.single('image'), (req, res) => {
  console.log("Recebendo requisição para adicionar produto");
  console.log("Dados do produto:", req.body);
  console.log("Imagem:", req.file);

  const { name, description, price } = req.body;

  const newProduct = new Produto({
    productname: name,
    productdesc: description,
    productprice: price,
    productimg: `/uploads/${req.file.filename}` // Caminho da imagem salva
  });

  newProduct.save()
    .then(() => {
      console.log("Produto adicionado com sucesso!");
      res.redirect('/'); // Redireciona para a página principal após a adição
    })
    .catch((err) => {
      console.log("Erro ao adicionar produto: " + err);
      res.status(500).send("Erro ao adicionar produto");
    });
});

module.exports = router;
