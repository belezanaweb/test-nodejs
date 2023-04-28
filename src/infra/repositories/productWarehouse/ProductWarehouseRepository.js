const Repository = require('../Repository');

class WarehouseRepository extends Repository {
  constructor({ sequelize, productWarehouseMapper, exceptions }) {
    const { ProductWarehouse } = sequelize.models;
    super({
      ResourceModel: ProductWarehouse,
      ResourceMapper: productWarehouseMapper,
      Exceptions: exceptions
    });
  }
}

module.exports = WarehouseRepository;
