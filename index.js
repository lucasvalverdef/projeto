// Carregar módulos
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const {connectToMongo } = require("./config/connect")
dotenv.config(); // Carregar variáveis de ambiente

 connectToMongo();

// Importar rotas
const produtoRota = require('./routes/produtoRota'); // Roteador de produtos
const clienteRota = require('./routes/clienteRota'); // Roteador de clientes
const usuarioRota = require('./routes/usuarioRota'); // Roteador de usuários (login)
const fornecedorRota = require('./routes/fornecedorRota'); //roteador de fornecedores


const app = express();

// Configuração do Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Diretório de views

// Configurar o Express para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configurações de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Rota principal da aplicação
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/PRINCIPAL/login.html')); // Serve o arquivo HTML diretamente
});

// Rota para a página principal após o login
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/PRINCIPAL/principal.html')); // Serve o arquivo principal.html
});

// Rota para o formulário de registro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '/PRINCIPAL/cadastro.html')); // Serve o arquivo de cadastro
});

// Usar rotas importadas
app.use('/user/usuarioRota', usuarioRota); // Rotas de usuários (login e registro)
app.use('/user/produtoRota', produtoRota); // Rotas de produtos
app.use('/user/clienteRota', clienteRota); // Rotas de clientes
app.use('/user/fornecedorRota', fornecedorRota); //Rotas de fornecedores

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Porta do servidor
const porta = process.env.PORT || 8081;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});


