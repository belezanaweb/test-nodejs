const { DuplicatedKeyError, InvalidParamError } = require('../../../utils/errors')
let PRODUCT_COLLECTION = []

module.exports = class ProductsRepository {
  static add (product) {
    const { sku, name, inventory } = product
    const { warehouses } = inventory

    const hasFound = this.getBySku(sku)

    if (hasFound?.sku) throw new DuplicatedKeyError(sku)

    PRODUCT_COLLECTION.push({
      sku,
      name,
      inventory: {
        warehouses
      }
    })
    return product
  }

  static deleteBySku (sku) {
    if (isNaN(sku)) throw new InvalidParamError('sku')

    let found = false
    PRODUCT_COLLECTION = PRODUCT_COLLECTION.filter((product) => {
      if (product.sku === +sku) { found = true }
      return product.sku !== +sku
    })
    return found
  }

  static getBySku (sku) {
    return PRODUCT_COLLECTION.find((product) => product.sku === +sku)
  }

  static updateBySku (sku, product) {
    PRODUCT_COLLECTION = PRODUCT_COLLECTION.map((p) => {
      if (+sku === p.sku) Object.assign(p, product)
      return product
    })
  }
}
