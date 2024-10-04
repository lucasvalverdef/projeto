// Carregar módulos
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer'); // Importando o multer para lidar com uploads
const user = require('./routes/user'); // Roteador de usuários

const index = express();  // Usando "index" em vez de "app"

// Configurar o Express para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurações
index.use(bodyParser.urlencoded({ extended: true }));
index.use(bodyParser.json());

// Handlebars
index.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
index.set('view engine', 'handlebars');

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/BdImperial')
  .then(() => {
    console.log('Conectado com sucesso!');
  })
  .catch((erro) => {
    console.log('Erro localizado: ' + erro);
  });

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');  // Local onde as imagens serão salvas
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nome da imagem
  }
});

const upload = multer({ storage: storage });  // Middleware de upload

// Conectar arquivos estáticos como CSS
index.use(express.static(path.join(__dirname, 'public')));

// Rotas
index.use('/user', user);  // Usando as rotas definidas no arquivo user.js

// Porta do servidor
const porta = 8081;
index.listen(porta, () => {
  console.log('Servidor rodando na porta ' + porta);
});

module.exports = upload; // Exportando o upload para uso nas rotas
