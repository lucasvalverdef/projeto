//carregar modulos
   const express = require('express')
   const exphbs = require('express-handlebars')
   const bodyParser = require("body-parser")
   const index = express()  
   const user = require("./routes/user")  
   const path = require('path')
   const mongoose = require("mongoose")
//configurações 
   //Body Parser
   index.use(bodyParser.urlencoded({extended: true}))
   index.use(bodyParser.json())
   //Handlebars
   index.engine('handlebars', exphbs.engine({defaultLayout:'main'}))
   index.set('view engine', 'handlebars')
   //Mongoose
   mongoose.Promise = global.Promise;
   mongoose.connect("mongodb://localhost/BdImperial").then(() =>{
      console.log("Conectado com sucesso!")
   }).catch((erro)=>{
      console.log("erro localizado: "+erro)
   })
   // Conectar CSS
   index.use(express.static(path.join(__dirname, 'public'))); // Apenas uma vez

//rotas
index.use('/user', user)

//outros 
const porta = 8081
index.listen(porta,() =>{
    console.log("servidor rodando na porta " + porta)
})