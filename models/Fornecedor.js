const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FornecedorSchema = new Schema({
    nomeFornecedor: {
        type: String,
        required: true 
    }, 
    cnpjFornecedor: {
        type: String,
        required: true
    },
    foneFornecedor: {
        type: String,
        required: true
    },
    enderecoFornecedor: {
        type: String,
        required: true
    },
    emailFornecedor: {
        type: String,
        required: true
    },
    siteFornecedor: {
        type: String,
        required: true
    }
});

// Defina e exporte o modelo 
const Fornecedor = mongoose.model("Fornecedor", FornecedorSchema);
module.exports = Fornecedor;
