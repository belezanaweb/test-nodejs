const Inventory = require("./inventory");

module.exports = class Product {
  constructor(product) {
    this.sku = product.sku;
    this.name = product.name;
    this.inventory = new Inventory(product.inventory);
  }
};
