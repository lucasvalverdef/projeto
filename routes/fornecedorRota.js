// Importar módulos
const express = require('express');
const router = express.Router();
const Fornecedor = require('../models/Fornecedor'); // Modelo de Fornecedor

// Rota para adicionar Fornecedor
router.post('/add', async (req, res) => {
    try {
        const { nomeFornecedor, emailFornecedor, cnpjFornecedor, siteFornecedor, enderecoFornecedor, foneFornecedor } = req.body;

        // Verificar se todos os campos obrigatórios estão presentes e não são vazios
        if (!nomeFornecedor || !emailFornecedor || !cnpjFornecedor || !siteFornecedor || !enderecoFornecedor || !foneFornecedor) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Criar um novo fornecedor
        const novoFornecedor = new Fornecedor({
            nomeFornecedor,
            emailFornecedor,
            foneFornecedor,
            cnpjFornecedor,
            siteFornecedor,
            enderecoFornecedor 
        });

        // Salvar o fornecedor no banco de dados
        await novoFornecedor.save();
        res.status(201).json({ message: "Fornecedor adicionado com sucesso!", fornecedor: novoFornecedor });
    } catch (err) {
        // Se o erro for de validação do Mongoose, retorne uma mensagem específica
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Erro de validação: " + err.message });
        }

        console.error("Erro ao adicionar fornecedor:", err);
        res.status(500).json({ message: "Erro ao adicionar fornecedor." });
    }
});

  

// Rota para buscar todos os fornecedores
router.get('/all', async (req, res) => {
  try {
    const fornecedores = await Fornecedor.find(); // Busca todos os fornecedores
    res.status(200).json(fornecedores); // Envia a lista de fornecedores como resposta
  } catch (err) {
    console.error("Erro ao buscar fornecedores:", err);
    res.status(500).json({ message: "Erro ao buscar fornecedores" });
  }
});


// Rota para buscar fornecedor pelo nome
router.get('/search', async (req, res) => {
  const { nomefornecedor } = req.query;

  try {
    const fornecedores = await Fornecedor.find({ nomeFornecedor: new RegExp(nomeFornecedor, 'i') }); // Busca fornecedores pelo nome (case insensitive)
    
    if (fornecedores.length > 0) {
      res.status(200).json(fornecedores); // Retorna os fornecedores encontrados
    } else {
      res.status(404).json({ message: "Nenhum fornecedor encontrado." });
    }
  } catch (err) {
    console.error("Erro ao buscar fornecedor:", err);
    res.status(500).json({ message: "Erro ao buscar fornecedor" });
  }
});

// Rota para fazer relatório
router.post('/relatorio', (req, res) => {
    Fornecedor.find() // Busca todos os fornecedores
    .then(fornecedores => {
        console.log("Fornecedores encontrados:", fornecedores); // Para depuração
        res.render('relatorio', { fornecedores: fornecedores }); // Envie os dados para o template
    })
    .catch(erro => {
        console.log("Erro ao buscar fornecedores:", erro);
        res.status(500).send("Erro ao buscar fornecedores");
    });
});


// Rota para deletar fornecedor
router.delete('/delete/:id', async (req, res) => {
  try {
    const fornecedor = await Fornecedor.findByIdAndDelete(req.params.id);

    if (!Fornecedor) {
      return res.status(404).json({ message: "Fornecedor não encontrado." });
    }

    res.status(200).json({ message: "Fornecedor deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar fornecedor:", err);
    res.status(500).json({ message: "Erro ao deletar fornecedor" });
  }
});

module.exports = router;
