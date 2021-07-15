import { IDeleteProductBySkuUseCase } from '../../../domain/use-cases/delete-product-by-sku'
import { noContent, notFound, serverError } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols'

export class DeleteProductController implements IController {
  constructor (private readonly deleteProductBySkuUseCase: IDeleteProductBySkuUseCase) {}

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const deleted = await this.deleteProductBySkuUseCase.execute(Number(request.params.sku))
      if (deleted.isLeft()) {
        return notFound(deleted.value)
      }

      return noContent()
    } catch (err) {
      return serverError('internal')
    }
  }
}
