// Importa o Mongoose
const mongoose = require('mongoose');

// Conecta ao MongoDB
mongoose.connect('mongodb://localhost/loja', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelo de Cliente
const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

// Modelo de Produto
const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  imagem: { type: String }
});

const Produto = mongoose.model('Produto', produtoSchema);

// Modelo de Venda
const vendaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  data: { type: Date, default: Date.now }
});

const Venda = mongoose.model('Venda', vendaSchema);

// Modelo de Fornecedor
const fornecedorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { type: String, required: true },
  endereco: {
    cep: String,
    rua: String,
    bairro: String,
    cidade: String,
    estado: String,
    numero: String
  },
  telefone: String,
  email: String,
  descricao: String
});

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

module.exports = { Cliente, Produto, Venda, Fornecedor };