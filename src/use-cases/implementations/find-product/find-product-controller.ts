import { IFindProductBySkuUseCase } from '../../../domain/use-cases/find-product-by-sku'
import { notFound, ok, serverError } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols'

export class FindProductController implements IController {
  constructor (private readonly findProductBySkuUseCase: IFindProductBySkuUseCase) {}

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const product = await this.findProductBySkuUseCase.execute(Number(request.params.sku))
      if (product.isLeft()) {
        return notFound(product.value)
      }

      return ok(product.value)
    } catch (err) {
      return serverError('internal')
    }
  }
}
