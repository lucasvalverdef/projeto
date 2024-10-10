const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para hashing de senhas
const Usuario = require('../models/Usuario'); // Importa o modelo de usuário

// Rota para cadastro de novo usuário
router.post('/cadastro', async (req, res) => {
    const { username, password, email, nomeCompleto } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ username });
        if (usuarioExistente) {
            return res.redirect('/cadastro?error=Usuário já existe.'); // Redireciona com erro
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        const novoUsuario = new Usuario({ username, password: hashedPassword, email, nomeCompleto });
        await novoUsuario.save();

        // Redireciona para a rota principal após cadastro bem-sucedido
        res.redirect('/?success=Usuário registrado com sucesso!');
    } catch (err) {
        console.error(err);
        res.redirect('/cadastro?error=Erro ao registrar o usuário.'); // Redireciona com erro
    }
});


// Rota de login
// Rota para login de usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.redirect('/login?error=Usuário ou senha incorretos.');
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.redirect('/login?error=Usuário ou senha incorretos.');
        }

        // Redireciona para a rota /home após o login bem-sucedido
        res.redirect('/home');
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        return res.redirect('/login?error=Erro ao fazer login.');
    }
});

// Exportar as rotas
module.exports = router;
