const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
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
    cepCliente: {
        type: String,
        required: true
    },
    cpfCliente: {
        type: String,
        required: true
    },
    enderecoCliente: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Defina e exporte o modelo
const Cliente = mongoose.model("Cliente", ClienteSchema);
module.exports = Cliente;
