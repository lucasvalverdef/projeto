const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nome: {
        type: String,
        required: true 
    },
    email: {
      type: String,
      required: true
    },
    fone: {
      type: Number,
      required: true
    },
    cpf: {
      type: Number,
      required: false 
    },
    cnpj: {
      type: Number,
      required: false
    },
   date: {
    type: Date,
    default: Date.now()
   }
})

mongoose.model("clientes", Cliente)