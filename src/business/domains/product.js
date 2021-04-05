const ProductData = require("../domains/data");

module.exports = class Product {
  constructor() {
    this.products = ProductData;
  }

  async create(data) {
    const index = this.products.findIndex((product) => product.sku === data.sku);

    if (index > -1) {
      throw {
        status: 500,
        message: `SKU: ${data.sku} já existe.`
      };
    }

    this.products.push(data);

    return data;
  }

  async update(sku, data) {
    const index = this.products.findIndex((product) => product.sku === sku);

    if (index === -1) {
      throw  {
        status: 500,
        message: `Produto inexistente.`
      }
    }

    data.sku = sku;
    this.products[index] = data;

    return this.products[index];
  }

  async recover(sku) {
    const product = await this.products.find((product) => product.sku === sku);

    if (!product) {
      throw  {
        status: 500,
        message: `Produto inexistente.`
      }
    }

    return await this.quantity(product);
  }

  async delete(sku) {
    const index = this.products.findIndex((product) => product.sku === sku);

    if (index === -1) {
      throw  {
        status: 500,
        message: `Produto inexistente.`
      }
    }

    this.products.splice(index, 1);

    console.log(this.products);

    return {};
  }

  async quantity(product) {
    let quantity = 0;

    product.inventory.warehouses.map((item) => quantity += item.quantity);
    product.inventory.quantity = quantity;
    product.isMarketable = (product.inventory.quantity > 0);

    return product;
  }
}
