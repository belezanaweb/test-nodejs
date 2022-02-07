import { IFindProductById } from '@/domain/protocols/find-product-by-id-protocol'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class GetProductByIdController implements IController {
  constructor (
    private readonly validation: IValidation | any,
    private readonly findProductBySku: IFindProductById
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.pathParams)
    if (error) {
      return badRequest(error)
    }

    const { sku } = httpRequest.pathParams

    const result = await this.findProductBySku.findById(sku)
    return ok(result)
  }
}
