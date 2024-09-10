const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const Post = require('./models/Post');

// Configuração
// Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conectar CSS
app.use(express.static('public'));
app.use(express.static('files'))

// Rotas
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/PRINCIPAL/principal.html");
})

app.post('/add', function (req, res) {
    Post.create({
        nomeC: req.body.nomeC,
        emailC: req.body.emailC,
        foneC: req.body.foneC,
        

    }).then(function(){
        res.sendFile(__dirname + "/PRINCIPAL/principal.html");
      }).catch(function(erro){
        res.send("Erro localizado: "+erro)
      })
})

app.listen(8081, function () {
    console.log("Servidor rodando na url http://localhost:8081");
});