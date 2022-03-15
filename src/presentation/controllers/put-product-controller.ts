import { IUpdateProductById, NsUpdateProduct } from '@/domain/protocols/update-product-protocol'
import { InvalidParamError } from '@/presentation/errors'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, created } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class PutProductController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly validationInventory: IValidation,
    private readonly validationWarehouse: IValidation,
    private readonly updateProductById: IUpdateProductById
  ) {}

  @ErrorHandler()
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const toValidate = { ...httpRequest.pathParams, ...httpRequest.body }
    const error = this.validation.validate(toValidate)
    if (error) {
      return badRequest(error)
    }

    const { productId } = httpRequest.pathParams
    const { name, inventory } = httpRequest.body

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

    const params: NsUpdateProduct.Input = {
      sku: productId,
      name: name,
      inventory: {
        warehouses: warehouses
      }
    }

    const result = await this.updateProductById.updateById(params)
    return created(result)
  }
}
