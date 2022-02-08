import { IInsertProduct, NsInsertProduct } from '@/domain/protocols/insert-product-protocol'
import { InvalidParamError } from '@/presentation/errors'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, created } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class PostProductController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly validationInventory: IValidation,
    private readonly validationWarehouse: IValidation,
    private readonly insertProduct: IInsertProduct
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    const { sku, name, inventory } = httpRequest.body

    const errorInventory = this.validationInventory.validate(inventory)
    if (errorInventory) {
      return badRequest(errorInventory)
    }

    const { warehouses } = inventory

    if (warehouses.length === 0) { return badRequest(new InvalidParamError('inventory.warehouses[]')) }
    for (const item of warehouses) {
      const errorWarehouse = this.validationWarehouse.validate(item)
      if (errorWarehouse) {
        return badRequest(errorWarehouse)
      }
    }

    const params: NsInsertProduct.Input = {
      sku: sku,
      name: name,
      inventory: {
        warehouses: warehouses
      }
    }

    const result = await this.insertProduct.insert(params)
    return created(result)
  }
}
