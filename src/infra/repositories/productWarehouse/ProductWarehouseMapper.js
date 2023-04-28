// const { Warehouse, WarehouseOutput } = require('../../../domain/entities/Warehouse');

const ProductWarehouseMapper = {
  toInputDatabase(entry) {
    console.log(entry);
    return entry;
  },
  toOutputDabase({ dataValues }) {
    return dataValues;
  }
};

module.exports = () => ProductWarehouseMapper;
