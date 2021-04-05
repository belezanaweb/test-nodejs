const Product = require('../../domains/product')

module.exports = class ProductDelete {
  async do(sku) {
    try {
      return await (new Product()).delete(sku);
    } catch (error) {
      throw error;
    }
  }
}
