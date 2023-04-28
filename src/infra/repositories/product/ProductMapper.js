const { Product, ProductOutput } = require('../../../domain/entities/Product');

const ProductMapper = {
  toInputDatabase(product) {
    return new Product({ ...product }).toJSON();
  },
  toOutputDabase({ dataValues }) {
    return new ProductOutput({ ...dataValues }).toJSON();
  }
};

module.exports = () => ProductMapper;
