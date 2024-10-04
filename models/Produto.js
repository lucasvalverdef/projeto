const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  productdesc: {
    type: String,
    required: true
  },
  productprice: {
    type: Number,
    required: true
  },
  productimg: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Produto', ProdutoSchema);
