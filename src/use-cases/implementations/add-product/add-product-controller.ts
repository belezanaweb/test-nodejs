import { AddProduct } from '../../../domain/use-cases/add-product'
import { InvalidParamError, MissingParamError } from '../../../presentation/errors'
import { badRequest, ok, serverError } from '../../../presentation/helpers/http-helper'
import { IController } from '../../../presentation/protocols/controller'
import { IHttpRequest, IHttpResponse } from '../../../presentation/protocols/http'

export class AddProductController implements IController {
  constructor (private readonly addProductUseCase: AddProduct) {}
  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredParams = ['sku', 'name', 'inventory']
      for (const requiredParam of requiredParams) {
        if (!request.body[requiredParam]) {
          return badRequest(new MissingParamError(requiredParam))
        }
      }
      if (!request.body.inventory.warehouses || request.body.inventory.warehouses.length === 0) {
        return badRequest(new MissingParamError('warehouse'))
      }
      for (const warehouse of request.body.inventory.warehouses) {
        if (!warehouse.locality || !warehouse.quantity || !warehouse.type) {
          return badRequest(new InvalidParamError('warehouse', 'warehouse'))
        }
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
}
