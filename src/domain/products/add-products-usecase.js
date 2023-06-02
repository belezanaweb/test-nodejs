const { MissingParamError, MissingDependenceError } = require('../../utils/errors')

module.exports = class AddProductsUseCase {
  constructor ({ productsRepository }) {
    if (!productsRepository) throw new MissingDependenceError('productsRepository')
    this.productsRepository = productsRepository
  }

  async handle (product) {
    const { name } = product
    if (!name) throw new MissingParamError('name')
    return await this.productsRepository.add(product)
  }
}
