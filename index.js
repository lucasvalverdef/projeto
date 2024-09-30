const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const path = require('path'); // Adicionar o path para manipulação de caminhos
const mongoose = require('mongoose'); // Importar o Mongoose
const Post = require('./models/Post');

// Configuração do Mongoose
mongoose.connect('mongodb://localhost/seu_banco', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao MongoDB");
}).catch((err) => {
    console.log("Erro ao conectar ao MongoDB: " + err);
});

// Configuração
// Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conectar CSS
// Servir a pasta 'public' onde está o CSS
app.use(express.static(path.join(__dirname, 'public'))); // Apenas uma vez

// Rotas
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'principal', 'principal.html')); // Usar path.join para segurança e compatibilidade
});

app.post('/add', function (req, res) {
    Post.create({
        nomeC: req.body.nomeC,
        emailC: req.body.emailC,
        foneC: req.body.foneC,
    }).then(function () {
        res.redirect('/'); // Redireciona para a rota principal após adicionar
    }).catch(function (erro) {
        res.send("Erro localizado: " + erro); // Exibir erro
    });
});

// Iniciar o servidor
app.listen(8081, function () {
    console.log("Servidor rodando na url http://localhost:8081");
});
