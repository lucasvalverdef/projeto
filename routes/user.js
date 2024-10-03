const express = require("express")
const router = express.Router()
const path = require('path')
const mongoose = require("mongoose")
require("../models/Cliente")
const Cliente = mongoose.model("clientes")

router.get('/',(req, res) => {
     res.sendFile (path.join(__dirname, '..', 'PRINCIPAL', 'principal.html'))
})

router.post('/cliente/add',(req, res) => { 
    const novoCliente = {
         nomeCliente: req.body.nomeCliente, 
         emailCliente: req.body.emailCliente,
         foneCliente: req.body.foneCliente,
         formaPagamento: req.body.formaPagamento   
    }
    new Cliente(novoCliente).save().then(() =>{
        console.log("Cliente salvo com sucesso!")  
    }).catch((erro) =>{
        console.log("erro localizado: " + erro)
    })
    res.sendFile (path.join(__dirname, '..', 'html', 'addcliente.html'))
})

router.get('/teste',(req, res) => {
    res.send("<h2>teste bão de mais sô!!!!<h2>")
})

router.get('/resultado',(req, res) =>{
    res.send("<h1>bulbasaur ganhou!!!<h1>")
})

router.get('/teste2',(req, res) =>{
    res.send("<h1>teste deu certo!!!!<h1>")
})

module.exports = router 