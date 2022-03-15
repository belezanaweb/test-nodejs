import { IFindProductById } from '@/domain/protocols/find-product-protocol'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, noContent, ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class GetProductByIdController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly findProductById: IFindProductById
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.pathParams)
    if (error) {
      return badRequest(error)
    }

    const { productId } = httpRequest.pathParams

    const result = await this.findProductById.findById(productId)
    return result ? ok(result) : noContent()
  }
}
