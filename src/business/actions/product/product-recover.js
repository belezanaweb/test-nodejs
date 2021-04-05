const Product = require('../../domains/product')

module.exports = class ProductRecover {
  async do(sku) {
    try {
      return await (new Product()).recover(sku);
    } catch (error) {
      throw error;
    }
  }
}
