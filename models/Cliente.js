const mongoose = require("mongoose");
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
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false 
    },
    cnpj: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now // Corrigido: não precisa de () aqui
    }
});

// Exporta o modelo para uso em outros arquivos
module.exports = mongoose.model("clientes", Cliente);