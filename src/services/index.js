const products = require('../data/data.js')

const filterProduct = (param) => {
  return products.filter(products => products.sku == param);
}

const sumProductsInventory = (warehouses) => {
  let sum = 0;
  if (warehouses.length) {
    warehouses.map((warehouse) => {
      sum += warehouse.quantity
    })
  }
  return sum;
}

const getProductBySku = (sku) => {
  var productFiltered = filterProduct(sku)

  if (productFiltered.length) {

    let quantityInventory = sumProductsInventory(productFiltered[0].inventory.warehouses)

    const inventory = {
      quantity: quantityInventory,
      warehouses: productFiltered[0].inventory.warehouses
    }
    const product = {
      sku: productFiltered[0].sku,
      name: productFiltered[0].name,
      inventory: inventory,
      isMarketable: quantityInventory > 0 ? true : false
    }
    return product;
  }
}

const createProduct = (body) => {

  var productFiltered = filterProduct(body.sku)

  if (productFiltered.length <= 0) {
    const inventory = {
      warehouses: body.inventory.warehouses
    }

    const product = {
      sku: body.sku,
      name: body.name,
      inventory: inventory,
    }
    products.push(product)
    return product;
  }
}

const updateProductBySku = (body) => {
  var product = products.filter(products => products.sku == body.sku)
  products[products.indexOf(product[0])] = body
  return true;
}

const deleteProductBySku = (sku) => {
  var productByindex = products.findIndex(product => product.sku == sku)
  products.splice(productByindex, 1)

  return true;
}

module.exports = {
  getProductBySku,
  createProduct,
  updateProductBySku,
  deleteProductBySku,
  filterProduct
}
