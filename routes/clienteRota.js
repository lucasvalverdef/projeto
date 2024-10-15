// Importar módulos
const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente'); // Modelo de Cliente

// Rota para adicionar cliente
router.post('/add', async (req, res) => {
    try {
      const { nomeCliente, emailCliente, foneCliente, cpfCliente, cepCliente, cidadeCliente } = req.body;
  
      // Verificar se todos os campos obrigatórios foram preenchidos
      if (!nomeCliente || !emailCliente || !foneCliente || !cpfCliente) {
        return res.status(400).json({ message: "Erro: Todos os campos obrigatórios devem ser preenchidos." });
      }
  
      // Criar um novo cliente
      const novoCliente = new Cliente({
        nomeCliente,
        emailCliente,
        foneCliente,
        cpfCliente,
        cepCliente,
        cidadeCliente 
      });
  
      // Salvar o cliente no banco de dados
      await novoCliente.save();
      res.status(201).json({ message: "Cliente adicionado com sucesso!" });
    } catch (err) {
      console.error("Erro ao adicionar cliente:", err);
      res.status(500).json({ message: "Erro ao adicionar cliente." });
    }
  });
  

// Rota para buscar todos os clientes
router.get('/all', async (req, res) => {
  try {
    const clientes = await Cliente.find(); // Busca todos os clientes
    res.status(200).json(clientes); // Envia a lista de clientes como resposta
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    res.status(500).json({ message: "Erro ao buscar clientes" });
  }
});

// Rota para buscar cliente pelo nome
router.get('/search', async (req, res) => {
  const { nomeCliente } = req.query;

  try {
    const clientes = await Cliente.find({ nomeCliente: new RegExp(nomeCliente, 'i') }); // Busca clientes pelo nome (case insensitive)
    
    if (clientes.length > 0) {
      res.status(200).json(clientes); // Retorna os clientes encontrados
    } else {
      res.status(404).json({ message: "Nenhum cliente encontrado." });
    }
  } catch (err) {
    console.error("Erro ao buscar cliente:", err);
    res.status(500).json({ message: "Erro ao buscar cliente" });
  }
});
// Rota para fazer relatório
router.post('/relatorio', (req, res) => {
    Cliente.find() // Busca todos os clientes
    .then(clientes => {
        console.log("Clientes encontrados:", clientes); // Para depuração
        res.render('relatorio', { clientes: clientes }); // Envie os dados para o template
    })
    .catch(erro => {
        console.log("Erro ao buscar clientes:", erro);
        res.status(500).send("Erro ao buscar clientes");
    });
});


// Rota para deletar cliente
router.delete('/delete/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar cliente:", err);
    res.status(500).json({ message: "Erro ao deletar cliente" });
  }
});

module.exports = router;
