const mongoose = require('mongoose');
const Usuario = require('../models/Usuario'); // Altere o caminho se necessário

mongoose.connect('mongodb://localhost/BdImperial', { useNewUrlParser: true, useUnifiedTopology: true });

const criarUsuarios = async () => {
    await Usuario.deleteMany({}); // Limpa usuários existentes (cuidado com isso em produção)

    const novoUsuario = new Usuario({
        username: 'TesteUser',
        password: 'senha123',
        email: 'teste@example.com',
        nomeCompleto: 'Teste Usuário'
    });

    await novoUsuario.save();
    console.log('Usuário criado com sucesso:', novoUsuario);
    mongoose.connection.close();
};

criarUsuarios();
