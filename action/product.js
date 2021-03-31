const Product = require('../domain/Product');

const produto = new Product();

exports.getProductBySky = async (sku) => {
  const result = await produto.get(sku);

  if (result === undefined) {
    return {
      msg: 'Product not found',
    };
  }

  return result;
};

exports.createProduct = async (data) => {
  return await produto.create(data);
};

exports.deleteProductBySky = async (data) => {
  const result = await produto.delete(data);

  if (result === undefined) {
    return {
      msg: 'Product not found',
    };
  }

  return result;
};

exports.updateProduct = async (data) => {
  const result = await produto.update(data);

  if (result === undefined) {
    return {
      msg: 'Product not found',
    };
  }

  return result;
};
