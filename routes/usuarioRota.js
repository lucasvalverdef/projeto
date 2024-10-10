const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para hashing de senhas
const Usuario = require('../models/Usuario'); // Importa o modelo de usuário

// Rota para registro de novo usuário
router.post('/register', async (req, res) => {
    const { username, password, email, nomeCompleto } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const novoUsuario = new Usuario({ username, password: hashedPassword, email, nomeCompleto });
        await novoUsuario.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar o usuário.', error: err.message });
    }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica a senha
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Você pode retornar um token JWT ou um status de sucesso
        res.status(200).json({ message: 'Login bem-sucedido!', user: { username: usuario.username } });
        // ou, se preferir redirecionar
        // res.redirect('/home'); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
});

// Exportar as rotas
module.exports = router;
