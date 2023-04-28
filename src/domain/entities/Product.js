const { attributes } = require('structure');
const Inventory = require('./Inventory');

const types = {
  required_string: {
    type: String,
    required: true
  },
  required_number: {
    type: Number,
    required: true
  }
};

const Product = attributes({
  sku: { ...types.required_number },
  name: { ...types.required_string }
})(class Product {});

const ProductOutput = attributes({
  id: { ...types.required_number },
  sku: { ...types.required_number },
  name: { ...types.required_string },
  inventory: Inventory,
  isMarketable: Boolean
})(class ProductOutput {});

module.exports = { Product, ProductOutput };
