// user.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Para hashing de senhas
const Usuario = mongoose.model('usuarios'); // Certifique-se de que o modelo de usuário esteja definido

// Rota para processar o login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Encontre o usuário no banco de dados
        const usuario = await Usuario.findOne({ username });

        // Verifique se o usuário foi encontrado
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verifique a senha
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Autenticação bem-sucedida
        // Aqui você pode gerar um token JWT se desejar
        res.status(200).json({ message: 'Login bem-sucedido', userId: usuario._id });
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const novoUsuario = new Usuario({
            username,
            password: hashedPassword,
        });

        // Salva o novo usuário no banco de dados
        await novoUsuario.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para obter informações do usuário (opcional)
router.get('/me', async (req, res) => {
    const { userId } = req; // Você deve ter alguma forma de identificar o usuário logado, como um JWT ou um cookie de sessão.

    try {
        const usuario = await Usuario.findById(userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = router;
