const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Para hashing de senhas
const Usuario = require('../models/Usuario'); // Importa o modelo de usuário

// Rota para cadastro de novo usuário
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
        res.redirect('/login?success=Usuário registrado com sucesso!');
    } catch (err) {
        res.redirect('/cadastro?error=Erro ao registrar o usuário.'); // Redireciona com erro
    }
});


// Rota de login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tente encontrar o usuário
        const usuario = await Usuario.findOne({ username });

        // Se o usuário não for encontrado, redirecione com erro
        if (!usuario) {
            return res.redirect('/login?error=Usuário ou senha incorretos.');
        }

        // Comparar a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, usuario.password);

        // Se a senha não corresponder, redirecione com erro
        if (!isMatch) {
            return res.redirect('/login?error=Usuário ou senha incorretos.');
        }

        // Se o login for bem-sucedido, redirecione para a página principal
        res.redirect('/home');
    } catch (err) {

        return res.redirect('/login?error=Erro ao fazer login.');
    }
});



// Exportar as rotas
module.exports = router;
  