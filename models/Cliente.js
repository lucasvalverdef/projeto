const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nomeCliente: {
        type: String,
        required: true 
    }, 
    emailCliente: {
      type: String,
      required: true
    },
    foneCliente: {
      type: String,
      required: true
    },
    // cidadeCliente: {
    //   type: String,
    //   required: true
    // },
    cepCliente: {
      type: String,
      required: true
    },
    date: {
    type: Date,
    default: Date.now
   }
})

mongoose.model("clientes", Cliente)