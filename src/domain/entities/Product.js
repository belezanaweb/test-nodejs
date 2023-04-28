const { attributes } = require('structure');

const types = {
  required_string: {
    type: String,
    required: true
  }
};

const Product = attributes({
  sku: Number,
  name: String
})(class Product {});

module.exports = Product;
