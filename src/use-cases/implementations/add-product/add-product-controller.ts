import { WarehouseModel } from '../../../domain/models/warehouse'
import { AddProduct } from '../../../domain/use-cases/add-product'
import { ok } from '../../../presentation/helpers/http-helper'
import { IController } from '../../../presentation/protocols/controller'
import { IHttpRequest, IHttpResponse } from '../../../presentation/protocols/http'

export class AddProductController implements IController {
  constructor (private readonly addProductUseCase: AddProduct) {}
  async handle (request: IHttpRequest): Promise<IHttpResponse> {
    request.body.warehouses.map((warehouse: WarehouseModel) => {
      warehouse.locality = warehouse.locality.toUpperCase()
      warehouse.type = warehouse.type.toUpperCase()
      return warehouse
    })

    const createdProduct = await this.addProductUseCase.execute(request.body)

    return ok(createdProduct.value)
  }
}
