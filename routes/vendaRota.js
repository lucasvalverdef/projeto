// Exemplo de rota para adicionar uma venda
router.post('/add', async (req, res) => {
    const { clienteId, produtos, dataVenda } = req.body;
    
    try {
        const novaVenda = new Venda({
            cliente: clienteId,
            produtos: produtos,
            data: dataVenda
        });
        
        await novaVenda.save();
        res.status(201).json({ success: true, message: "Venda adicionada com sucesso!" });
    } catch (error) {
        console.error("Erro ao adicionar venda:", error);
        res.status(500).json({ success: false, message: "Erro ao adicionar venda." });
    }
});
