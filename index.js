// Carregar módulos
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer'); // Importando o multer para lidar com uploads
const userRoutes = require('./routes/user'); // Roteador de usuários
require('dotenv').config(); // Para carregar variáveis de ambiente

const index = express();  // Usando "index" em vez de "app"

// Configurar o Express para servir arquivos estáticos
index.use(express.static(path.join(__dirname, 'public')));

// Configura a pasta 'public/uploads' para ser acessível publicamente
index.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configurações
index.use(bodyParser.urlencoded({ extended: true }));
index.use(bodyParser.json());

// Handlebars
index.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
index.set('view engine', 'handlebars');

// Conexão com o MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/BdImperial', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado com sucesso ao MongoDB!');
  })
  .catch((erro) => {
    console.error('Erro ao conectar ao MongoDB:', erro);
  });

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'));  // Local onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome da imagem
  }
});

const upload = multer({ storage });  // Middleware de upload

// Rotas
index.use('/user', userRoutes);  // Usando as rotas definidas no arquivo user.js

// Porta do servidor
const porta = process.env.PORT || 8081;
index.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

// Exportando o upload para uso nas rotas
module.exports = upload;
