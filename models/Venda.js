const mongoose = require('mongoose');


const vendaSchema = new mongoose.Schema({
    nomeCliente: { type: String, required: true },
    enderecoCliente: { type: String, required: true },
    telefoneCliente: { type: String, required: true },
    cpfCliente: { type: String, required: true },
    subtotal: { type: Number, required: true },
    totalGeral: { type: Number, required: true },
    produtos: [produtoSchema], // Array de produtos
}, { timestamps: true }); // Adiciona timestamps para criação e atualização

const Venda = mongoose.model('Venda', vendaSchema);

module.exports = Venda;