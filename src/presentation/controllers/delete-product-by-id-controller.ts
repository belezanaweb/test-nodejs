import { IDeleteProductById } from '@/domain/protocols/delete-product-by-id-protocol'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class DeleteProductByIdController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly deleteProductById: IDeleteProductById
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.pathParams)
    if (error) {
      return badRequest(error)
    }

    const { productId } = httpRequest.pathParams

    await this.deleteProductById.deleteById(productId)
    return ok(`O Produto com o Código SKU ${+productId} foi removido com Sucesso da Base de Dados!`)
  }
}
