'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Warehouse, WarehouseWarehouse } = models;
      Warehouse.hasMany(WarehouseWarehouse, { foreinKey: 'warehouseId' });
    }
  }
  Warehouse.init(
    {
      locality: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.NUMBER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Warehouse'
    }
  );
  return Warehouse;
};
