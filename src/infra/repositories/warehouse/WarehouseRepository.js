const Repository = require('../Repository');

class WarehouseRepository extends Repository {
  constructor({ sequelize, warehouseMapper, exceptions }) {
    const { Warehouse } = sequelize.models;
    super({
      ResourceModel: Warehouse,
      ResourceMapper: warehouseMapper,
      Exceptions: exceptions
    });
  }
}

module.exports = WarehouseRepository;
