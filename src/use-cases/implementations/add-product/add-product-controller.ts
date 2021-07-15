import { Either, left, right } from '../../../core/either'
import { IAddProductUseCase } from '../../../domain/use-cases/add-product'
import { InvalidParamError, MissingParamError } from '../../../presentation/errors'
import { badRequest, ok, serverError } from '../../../presentation/helpers/http-helper'
import { IController } from '../../../presentation/protocols/controller'
import { IHttpRequest, IHttpResponse } from '../../../presentation/protocols/http'

export class AddProductController implements IController {
  constructor (private readonly addProductUseCase: IAddProductUseCase) {}
  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const validPayload = this.validatePayload(request.body)
      if (validPayload.isLeft()) {
        return badRequest(validPayload.value)
      }

      const { sku, name, inventory: { warehouses } } = request.body
      const createdProduct = await this.addProductUseCase.execute({ sku, name, warehouses })
      if (createdProduct.isLeft()) {
        return badRequest(createdProduct.value)
      }

      return ok(createdProduct.value)
    } catch (err) {
      return serverError('internal')
    }
  }

  private validatePayload (payload: any): Either<MissingParamError | InvalidParamError, void> {
    const requiredParams = ['sku', 'name', 'inventory']
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
