class ProductRepository {
  constructor() {
    this.products = [];
  }

  get() {
    return this.products;
  }

  getBySku(sku) {
    return this.products.find(product => product.sku === +sku);
  }

  create(payload) {
    const product = {
      sku: payload.sku,
      name: payload.name,
      inventory: payload.inventory,
    };

    this.products.push(product);

    return product;
  }

  update(payload) {
    const productIndex =
      this.products.findIndex(product => +product.sku === +payload.sku);

    this.products[productIndex] = payload;

    return this.products[productIndex];
  }

  delete(sku) {
    const productIndex =
      this.products.findIndex(product => product.sku === +sku);

    this.products.splice(productIndex, 1);
  }
}

module.exports = ProductRepository;