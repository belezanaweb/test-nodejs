const Repository = require('../Repository');

class ProductWarehouseRepository extends Repository {
  constructor({ sequelize, productWarehouseMapper, exceptions }) {
    const { ProductWarehouse } = sequelize.models;
    super({
      ResourceModel: ProductWarehouse,
      ResourceMapper: productWarehouseMapper,
      Exceptions: exceptions
    });
  }

  async findAllByProductId(productId) {
    const resource = await this.findAll({ where: { productId } });
    return resource;
  }

  async removeByProductId(productId) {
    const resource = await this.remove({ where: { productId } });
    return resource;
  }
}

module.exports = ProductWarehouseRepository;
