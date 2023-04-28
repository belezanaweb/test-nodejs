'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const { Product, ProductWarehouse } = models;
      Product.hasMany(ProductWarehouse, { foreinKey: 'productId' });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sku: {
        type: DataTypes.NUMBER.UNSIGNED,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Product'
    }
  );
  return Product;
};
