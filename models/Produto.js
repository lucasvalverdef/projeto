const { number } = require('handlebars-helpers/lib');
const mongoose = require('mongoose');
const { DECIMAL } = require('mysql/lib/protocol/constants/types');

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
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  productimg: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Produto', ProdutoSchema);
