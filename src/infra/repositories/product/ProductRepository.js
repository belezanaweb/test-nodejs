const Repository = require('../Repository');

class ProductRepository extends Repository {
  constructor({ sequelize, productMapper, exceptions }) {
    const { Product } = sequelize.models;
    super({
      ResourceModel: Product,
      ResourceMapper: productMapper,
      Exceptions: exceptions
    });
  }

  async findBySku(sku) {
    const resource = await this.findOne({ where: { sku } });
    return resource;
  }

  async removeById(productId) {
    const resource = await this.remove({ where: { id: productId } });
    return resource;
  }

  async removeBySku(sku) {
    const resource = await this.remove({ where: { sku } });
    return resource;
  }
}

module.exports = ProductRepository;
