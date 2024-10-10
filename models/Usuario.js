const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema de Usuário
const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

// Exportando o modelo de Usuário
module.exports = mongoose.model('Usuario', UsuarioSchema);
