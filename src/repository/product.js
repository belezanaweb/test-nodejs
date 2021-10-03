const products = require('../config/db');

const product = {
  get() {
    return products;
  },
  getBySku(sku) {
    const product = products.find((product) => product.sku === Number(sku));
    return product;
  },
  put(sku, updatedProduct) {
    const index = products.findIndex((product) => product.sku === Number(sku));
    return products.splice(index, 1, updatedProduct);
  },
  post(newProduct) {
    return products.push(newProduct);
  },
  delete(sku) {
    const index = products.findIndex((product) => product.sku === Number(sku));
    return products.splice(index, 1);
  },
};
module.exports = product;
