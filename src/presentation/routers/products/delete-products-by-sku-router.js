const { HttpResponse } = require('../../helpers')
const { MissingDependenceError, DependenceNotFoundError } = require('../../../utils/errors')

module.exports = class DeleteProductsBySkuRouter {
  constructor ({ deleteProductsBySkuUseCase }) {
    if (!deleteProductsBySkuUseCase) throw new DependenceNotFoundError()
    if (!Object.keys(deleteProductsBySkuUseCase).length) throw new MissingDependenceError('deleteProductsBySkuUseCase')
    this.deleteProductsBySkuUseCase = deleteProductsBySkuUseCase
  }

  async route (httpRequest) {
    try {
      const { sku } = httpRequest.params
      await this.deleteProductsBySkuUseCase.handle(sku)
      return HttpResponse.noContent()
    } catch (error) {
      return HttpResponse.serverError(error)
    }
  }
}
