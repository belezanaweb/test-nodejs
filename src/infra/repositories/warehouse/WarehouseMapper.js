const { Warehouse, WarehouseOutput } = require('../../../domain/entities/Warehouse');

const WarehouseMapper = {
  toInputDatabase(entry) {
    return new Warehouse({ ...entry }).toJSON();
  },
  toOutputDabase({ dataValues }) {
    return new WarehouseOutput({ ...dataValues }).toJSON();
  }
};

module.exports = () => WarehouseMapper;
