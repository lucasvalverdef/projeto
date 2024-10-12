const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const Produto = require('../models/Produto');

// Diretório de upload
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Erro: Tipo de arquivo não suportado!'));
    }
  }
});

// Função para redimensionar a imagem
async function redimensionarImagem(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(50, 50)
    .toFile(outputPath);
}

// Rota para adicionar produtos
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!req.file || !name || !description || !price || isNaN(price)) {
      return res.status(400).json({ message: "Erro: Todos os campos devem ser preenchidos corretamente." });
    }

    const outputPath = path.join(uploadDir, req.file.filename);
    await redimensionarImagem(req.file.path, outputPath);
    fs.unlinkSync(req.file.path);

    const newProduct = new Produto({
      productname: name,
      productdesc: description,
      productprice: parseFloat(price),
      productimg: `/uploads/${req.file.filename}`
    });

    await newProduct.save();
    res.status(201).json({ message: "Produto adicionado com sucesso!" });
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(500).json({ message: "Erro ao adicionar produto" });
  }
});

// Rota para buscar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

// Rota para buscar todos os produtos e adicionar a lógica de clique
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    const produtosHtml = produtos.map(produto => `
      <div class="produto" id="produto-${produto._id}">
        <h3>${produto.productname}</h3>
        <p>${produto.productdesc}</p>
        <p>R$${produto.productprice.toFixed(2)}</p>
        <img src="${produto.productimg}" alt="${produto.productname}">
      </div>
    `).join('');

    // Enviar HTML com produtos e incluir lógica de clique
    res.send(`
      <div id="vendas">${produtosHtml}</div>
      <script>
        document.querySelectorAll('.produto').forEach((produto) => {
          produto.addEventListener('click', function () {
            const name = this.querySelector('h3').innerText;
            const price = parseFloat(this.querySelector('p:nth-of-type(2)').innerText.replace('R$', ''));
            console.log(\`Produto clicado: \${name}, R$\${price}\`); // Verifica no console se o evento de clique está sendo disparado
            addToCart(name, price);
          });
        });

        function addToCart(name, price) {
          // Aqui você pode implementar a lógica para atualizar o carrinho
          console.log(\`Produto adicionado ao carrinho: \${name}, R$\${price}\`);
        }
      </script>
    `);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
});

module.exports = router;
