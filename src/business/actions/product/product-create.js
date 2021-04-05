const Product = require('../../domains/product')
const ProductRules = require('../../validator/product-rules')

module.exports = class ProductCreate {
  async do(data) {
    try {
      await (new ProductRules()).do(data);
      return await (new Product()).create(data);
    } catch (error) {
      throw error;
    }
  }
}
