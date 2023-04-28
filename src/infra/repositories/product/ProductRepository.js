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
}

module.exports = ProductRepository;
