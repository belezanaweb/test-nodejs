import { WarehouseModel } from '../../../domain/models/warehouse'
import { AddProduct } from '../../../domain/use-cases/add-product'
import { MissingParamError } from '../../../presentation/errors'
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

      request.body.inventory.warehouses.map((warehouse: WarehouseModel) => {
        warehouse.locality = warehouse.locality.toUpperCase()
        warehouse.type = warehouse.type.toUpperCase()
        return warehouse
      })

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
