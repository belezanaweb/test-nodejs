const { MissingParamError, MissingDependenceError, NotFoundError } = require('../../utils/errors')

module.exports = class GetProductsBySkuUseCase {
  constructor ({ productsRepository }) {
    if (!productsRepository) throw new MissingDependenceError('productsRepository')
    this.productsRepository = productsRepository
  }

  async handle (sku) {
    if (!sku) throw new MissingParamError('sku')
    const product = await this.productsRepository.getBySku(sku)
    if (!product?.sku) throw new NotFoundError()
    const quantity = product.inventory.warehouses.reduce((acc, item) => (acc += item.quantity), 0)
    return {
      ...product,
      inventory: {
        quantity,
        ...product.inventory
      },
      isMarketable: quantity > 0
    }
  }
}
