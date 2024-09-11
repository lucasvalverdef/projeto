const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const path = require('path'); // Adicionar o path para manipulação de caminhos
const Post = require('./models/Post');

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
})

app.post('/add', function (req, res) {
    Post.create({
        nomeC: req.body.nomeC,
        emailC: req.body.emailC,
        foneC: req.body.foneC,
    }).then(function () {
        res.sendFile(path.join(__dirname, 'principal', 'principal.html')); // Enviar novamente o arquivo HTML após o sucesso
    }).catch(function (erro) {
        res.send("Erro localizado: " + erro); // Exibir erro
    });
})

// Iniciar o servidor
app.listen(8081, function () {
    console.log("Servidor rodando na url http://localhost:8081");
});
