const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Alterado para bcrypt

// Definindo o esquema para o usuário
const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Garante que o nome de usuário seja único
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante que o email seja único
        trim: true
    },
    nomeCompleto: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Adiciona campos de createdAt e updatedAt automaticamente
});


// Método para comparar a senha fornecida com a senha armazenada
usuarioSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Criar o modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar o modelo
module.exports = Usuario;
