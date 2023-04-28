'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { ProductWarehouse, Product, Warehouse } = models;
      ProductWarehouse.belongsTo(Product, { sourceKey: 'productId' });
      ProductWarehouse.belongsTo(Warehouse, { sourceKey: 'warehouseId' });
    }
  }
  ProductWarehouse.init(
    {
      productId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      warehouseId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ProductWarehouse'
    }
  );
  return ProductWarehouse;
};
