const { MissingParamError, MissingDependenceError } = require('../../utils/errors')

module.exports = class DeleteProductsBySkuUseCase {
  constructor ({ productsRepository }) {
    if (!productsRepository) throw new MissingDependenceError('productsRepository')
    this.productsRepository = productsRepository
  }

  async handle (sku) {
    if (!sku) throw new MissingParamError('sku')
    await this.productsRepository.deleteBySku(sku)
  }
}
