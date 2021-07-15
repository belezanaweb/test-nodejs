import { Either, left, right } from '../../../core/either'
import { IEditProductUseCase } from '../../../domain/use-cases/edit-product'
import { InvalidParamError, MissingParamError } from '../../../presentation/errors'
import { badRequest, notFound, ok, serverError } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols'

export class EditProductController implements IController {
  constructor (private readonly editProductUseCase: IEditProductUseCase) {}

  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const validPayload = this.validatePayload(request.body)
      if (validPayload.isLeft()) {
        return badRequest(validPayload.value)
      }
      const { name, inventory: { warehouses } } = request.body
      const editedProduct = await this.editProductUseCase.execute({ sku: Number(request.params.sku), name, warehouses })
      if (editedProduct.isLeft()) {
        return notFound(editedProduct.value)
      }

      return ok(editedProduct.value)
    } catch (err) {
      return serverError('internal')
    }
  }

  private validatePayload (payload: any): Either<MissingParamError | InvalidParamError, void> {
    const requiredParams = ['name', 'inventory']
    for (const requiredParam of requiredParams) {
      if (!payload[requiredParam]) {
        return left(new MissingParamError(requiredParam))
      }
    }
    if (!payload.inventory.warehouses || payload.inventory.warehouses.length === 0) {
      return left(new MissingParamError('warehouse'))
    }
    for (const warehouse of payload.inventory.warehouses) {
      if (!warehouse.locality || !warehouse.quantity || !warehouse.type) {
        return left(new InvalidParamError('warehouse', 'warehouse'))
      }
      if (!Number(warehouse.quantity)) {
        return left(new InvalidParamError('quantity', 'number'))
      }
    }

    return right()
  }
}
