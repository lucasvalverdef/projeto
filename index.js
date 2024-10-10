// Carregar módulos
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer'); // Importando o multer para lidar com uploads
const userRoutes = require('./routes/user'); // Roteador de usuários
const Cliente = require('./models/Cliente'); // Modelo de Cliente
const dotenv = require('dotenv'); // Para carregar variáveis de ambiente
const router = express.Router(); // Necessário para definir as rotas

dotenv.config(); // Carregar variáveis de ambiente

const index = express(); // Usando "index" em vez de "app"

// Configurar o Express para servir arquivos estáticos
index.use(express.static(path.join(__dirname, 'public')));

// Configura a pasta 'public/uploads' para ser acessível publicamente
index.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configurações
index.use(bodyParser.urlencoded({ extended: true }));
index.use(bodyParser.json());

// Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main', // Certifique-se de que este arquivo existe em views/layouts
  layoutsDir: path.join(__dirname, 'views', 'layouts'), // Define a pasta de layouts
  runtimeOptions: {
      allowProtoPropertiesByDefault: true
  }
});
// Adicionar o helper length
hbs.handlebars.registerHelper('length', function (array) {
  return array.length;
});
// Adicionar o helper eq
hbs.handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Usar o motor de visualização Handlebars
index.engine('handlebars', hbs.engine);
index.set('view engine', 'handlebars');

index.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
index.set('view engine', 'handlebars');

// Middleware para processar dados de formulários
index.use(express.urlencoded({ extended: true }));

// Conexão com o MongoDB
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/BdImperial", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado com sucesso!");
    })
    .catch((erro) => {
        console.log("Erro localizado: " + erro);
    });

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads')); // Local onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome da imagem
  }
});

const upload = multer({ storage }); // Middleware de upload

// Rotas
index.use('/user', userRoutes); // Usando as rotas definidas no arquivo user.js

// Porta do servidor
const porta = process.env.PORT || 8081;
index.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

// Rota para adicionar cliente
router.post('/cliente/add', async (req, res) => {
  try {
    const { nomeCliente, emailCliente, foneCliente, cpf, cnpj } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nomeCliente || !emailCliente || !foneCliente) {
      return res.status(400).json({ message: "Erro: Todos os campos obrigatórios devem ser preenchidos." });
    }

    // Criar um novo cliente
    const novoCliente = new Cliente({
      nome: nomeCliente,
      email: emailCliente,
      fone: foneCliente,
      cpf: cpf,   // Pode ser opcional, se não enviado
      cnpj: cnpj  // Pode ser opcional, se não enviado
    });

    // Salvar o cliente no banco de dados
    await novoCliente.save();
    res.status(201).json({ message: "Cliente adicionado com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar cliente:", err);
    res.status(500).json({ message: "Erro ao adicionar cliente", error: err.message });
  }
});
// Configura o diretório de views
index.set('views', path.join(__dirname, 'views'));
// Exportando o upload para uso nas rotas
module.exports = upload;
