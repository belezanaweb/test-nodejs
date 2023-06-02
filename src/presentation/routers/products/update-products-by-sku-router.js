const { HttpResponse } = require('../../helpers')
const { MissingDependenceError, DependenceNotFoundError } = require('../../../utils/errors')

module.exports = class UpdateProductsBySkuRouter {
  constructor ({ updateProductsBySkuUseCase }) {
    if (!updateProductsBySkuUseCase) throw new DependenceNotFoundError()
    if (!Object.keys(updateProductsBySkuUseCase).length) throw new MissingDependenceError('updateProductsBySkuUseCase')
    this.updateProductsBySkuUseCase = updateProductsBySkuUseCase
  }

  async route (httpRequest) {
    try {
      const { sku } = httpRequest.params
      const product = await this.updateProductsBySkuUseCase.handle(sku, httpRequest.body)
      return HttpResponse.ok(product)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
