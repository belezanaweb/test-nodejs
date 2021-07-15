import { IFindProductBySkuUseCase } from '../../../domain/use-cases/find-product-by-sku'
import { ok } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols'

export class FindProductController implements IController {
  constructor (private readonly findProductBySkuUseCase: IFindProductBySkuUseCase) {}

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    const product = await this.findProductBySkuUseCase.execute(request.params.sku)

    return ok(product.value)
  }
}
