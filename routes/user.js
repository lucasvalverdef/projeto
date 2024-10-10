const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')
const Produto = require('../models/Produto'); // O modelo do produto no MongoDB

//importar os modelos 
require("../models/Cliente")
const Cliente = mongoose.model("clientes")
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
    const filetypes = /jpeg|jpg|png|gif/; // Tipos de arquivos permitidos
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Erro: Tipo de arquivo não suportado!'));
    }
  }
});

// Rota GET para a página principal (ajuste conforme necessário)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'PRINCIPAL', 'principal.html')); // Pode ser substituído por renderização de uma view
});

// Rota para adicionar produtos
router.post('/produto/add', upload.single('image'), async (req, res) => {
  try {
    console.log("Recebendo requisição para adicionar produto");
    console.log("Dados do produto:", req.body);
    console.log("Imagem:", req.file);

    // Verifica se a imagem foi enviada
    if (!req.file) {
      return res.status(400).json({ message: "Erro: Nenhuma imagem foi enviada." });
    }

    const { name, description, price } = req.body;

    // Verifica se os campos necessários foram preenchidos
    if (!name || !description || !price) {
      return res.status(400).json({ message: "Erro: Todos os campos devem ser preenchidos." });
    }

    // Criando um novo produto
    const newProduct = new Produto({
      productname: name,
      productdesc: description,
      productprice: price,
      productimg: `/uploads/${req.file.filename}` // Caminho da imagem salva
    });

    // Salvando o novo produto no banco de dados
    await newProduct.save();
    console.log("Produto adicionado com sucesso!");
    res.status(201).json({ message: "Produto adicionado com sucesso!" }); // Retorna status 201
  } catch (err) {
    console.log("Erro ao adicionar produto:", err); // Imprime o erro detalhado
    res.status(500).json({ message: "Erro ao adicionar produto", error: err.message });
  }
});

// Rota para buscar todos os produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find(); // Busca todos os produtos do banco
    res.status(200).json(produtos); // Envia os produtos como resposta em formato JSON
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: "Erro ao buscar produtos", error: err.message });
  }
});
router.post('/cliente/search', (req, res) => {
  const nome = req.query.nomeCliente;  // Captura o valor do nome passado no formulário
  
  Cliente.find({ nomeCliente: new RegExp(nome, 'i') }).lean().then((clientes) => {
      if (clientes.length > 0) {
          res.render('main', { clientes: clientes }); // Renderiza a página principal com os clientes encontrados
      } else {
          res.render('main', { clientes: [] }); // Se não encontrar, renderiza a página com array vazio
      }
  }).catch((erro) => {
      console.log("Erro ao buscar clientes: " + erro);
      res.redirect('/');
  });
});

router.post('/relatorio', (req, res) => {
  Cliente.find() // Busca todos os clientes
  .then(clientes => {
      console.log("Clientes encontrados:", clientes); // Para depuração
      res.render('relatorio', { clientes: clientes }); // Envie os dados para o template
  })
  .catch(erro => {
      console.log("Erro ao buscar clientes:", erro);
      res.status(500).send("Erro ao buscar clientes");
  });
});

// Rota para adicionar cliente
router.post('/cliente/add',(req, res) => { 
  const novoCliente = {
       nomeCliente: req.body.nomeCliente, 
       emailCliente: req.body.emailCliente,
       foneCliente: req.body.foneCliente,
       cepCliente: req.body.cepCliente,
       cidadeCliente: req.body.cidade          
  }
  new Cliente(novoCliente).save().then(() => {
      console.log("Cliente salvo com sucesso!")  
  }).catch((erro) =>{
      console.log("erro localizado: " + erro)
  })
  res.sendFile (path.join(__dirname, '..', 'PRINCIPAL', 'principal.html'))
})

module.exports = router;

