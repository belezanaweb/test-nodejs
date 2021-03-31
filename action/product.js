const Product = require('../domain/Product');

const produto = new Product();

exports.getProductBySky = async (sku) => {
  const result = await produto.get(sku);

  if (result === undefined) {
    return {
      mstType: 'info',
      msg: `Product sku: ${sku} not found`,
    };
  }

  return await processQuantity(result);
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

exports.updateProduct = async (sku, data) => {
  const result = await produto.update(sku, data);

  if (result === undefined) {
    return {
      msg: 'Product not found',
    };
  }

  return result;
};

function processQuantity(product) {
  let inventoryQuantity = 0;
  let isMarktable = false;

  for (const wharehouse of product.inventory.warehouses) {
    if (wharehouse.quantity > 0) inventoryQuantity += wharehouse.quantity;
  }

  console.log('product');
  console.log(product);
  inventoryQuantity > 0 ? (isMarktable = true) : (isMarktable = false);

  product.inventory.quantity = inventoryQuantity;
  product.isMarketable = isMarktable;

  return product;
}
