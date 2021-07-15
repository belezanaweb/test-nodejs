import { IFindProductBySkuUseCase } from '../../../domain/use-cases/find-product-by-sku'
import { notFound, ok } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols'

export class FindProductController implements IController {
  constructor (private readonly findProductBySkuUseCase: IFindProductBySkuUseCase) {}

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const product = await this.findProductBySkuUseCase.execute(request.params.sku)
    if (product.isLeft()) {
      return notFound(product.value)
    }

    return ok(product.value)
  }
}
