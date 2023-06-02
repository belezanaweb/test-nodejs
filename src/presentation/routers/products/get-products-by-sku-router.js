const { HttpResponse } = require('../../helpers')
const { MissingDependenceError, DependenceNotFoundError } = require('../../../utils/errors')

module.exports = class GetProductsBySkuRouter {
  constructor ({ getProductsBySkuUseCase }) {
    if (!getProductsBySkuUseCase) throw new DependenceNotFoundError()
    if (!Object.keys(getProductsBySkuUseCase).length) throw new MissingDependenceError('getProductsBySkuUseCase')
    this.getProductsBySkuUseCase = getProductsBySkuUseCase
  }

  async route (httpRequest) {
    try {
      const { sku } = httpRequest.params
      const product = await this.getProductsBySkuUseCase.handle(sku)
      return HttpResponse.ok(product)
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
