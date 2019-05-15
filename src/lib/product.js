const productModel = require('../models/product')
const helper = require('../utils/helper')

/**
 * @module lib/product
 * @method [lib/product] get
 * @description Returns a product by SKU
 * @param  {String} sku Product SKU
 */
const get = async (sku) => {
  const product = await productModel.get(sku)
  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND')
  }

  product.inventory.quantity = helper.getTotalQuantity(product)
  product.isMarketable = (product.inventory.quantity > 0)

  return product
}

/**
 * @module lib/product
 * @method [lib/product] save
 * @description Saves a product
 */
const save = async (data) => {
  let product = await productModel.get(data.sku)
  if (product) {
    throw new Error('PRODUCT_EXISTS')
  }

  product = {
    sku: data.sku,
    name: data.name,
    inventory: {
      warehouses: helper.parseWarehouses(data.inventory)
    }
  }

  await productModel.set(product)
}

/**
 * @module lib/product
 * @method [lib/product] update
 * @description Updates a product
 */
const update = async (sku, data) => {
  let product = await productModel.get(sku)
  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND')
  }

  product = {
    sku: sku,
    name: data.name,
    inventory: {
      warehouses: helper.parseWarehouses(data.inventory)
    }
  }

  await productModel.set(product)
}

/**
 * @module lib/product
 * @method [lib/product] remove
 * @description Removes a product
 */
const remove = async (sku) => {
  let product = await productModel.get(sku)
  if (!product) {
    throw new Error('PRODUCT_NOT_FOUND')
  }

  await productModel.remove(sku)
}

module.exports = { get, save, update, remove }
