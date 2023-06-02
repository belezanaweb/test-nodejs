const { HttpResponse } = require('../../helpers')
const { MissingDependenceError, DependenceNotFoundError } = require('../../../utils/errors')

module.exports = class AddProductsRouter {
  constructor ({ addProductsUseCase }) {
    if (!addProductsUseCase) throw new DependenceNotFoundError()
    if (!Object.keys(addProductsUseCase).length) throw new MissingDependenceError('addProductsUseCase')
    this.addProductsUseCase = addProductsUseCase
  }

  async route (httpRequest) {
    try {
      const product = await this.addProductsUseCase.handle(httpRequest.body)
      return HttpResponse.created(product)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
