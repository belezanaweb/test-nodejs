import { IFindProducts } from '@/domain/protocols/find-product-protocol'
import ErrorHandler from '@/presentation/http/error-handler'
import { ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class GetProductsController implements IController {
  constructor (
    private readonly findProducts: IFindProducts
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const result = await this.findProducts.findAll()
    return ok(result)
  }
}
