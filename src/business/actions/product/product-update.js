const Product = require('../../domains/product')

module.exports = class ProductCreate {
  async do(sku, data) {
    try {
      return await (new Product()).update(sku, data);
    } catch (error) {
      throw error;
    }
  }
}
