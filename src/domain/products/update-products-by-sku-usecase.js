const { MissingParamError, MissingDependenceError } = require('../../utils/errors')

module.exports = class UpdateProductsBySkuUseCase {
  constructor ({ productsRepository }) {
    if (!productsRepository) throw new MissingDependenceError('productsRepository')
    this.productsRepository = productsRepository
  }

  async handle (sku, product = {}) {
    const { name } = product
    if (!sku) throw new MissingParamError('sku')
    if (!name) throw new MissingParamError('name')
    await this.productsRepository.updateBySku(sku, product)
  }
}
