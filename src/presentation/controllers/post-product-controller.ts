import { ICreateProduct, NsCreateProduct } from '@/domain/protocols/create-product-protocol'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/protocols'

export class PostProductController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly validationInventory: IValidation,
    private readonly validationWarehouse: IValidation,
    private readonly createProduct: ICreateProduct
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

    if (warehouses.length === 0) {
      return badRequest(new InvalidParamError('inventory.warehouses[i]'))
    }

    for (const item of warehouses) {
      if (!item.type) {
        return badRequest(new MissingParamError('inventory.warehouses[i].type'))
      } else if (item.type !== 'PHYSICAL_STORE' && item.type !== 'ECOMMERCE') {
        return badRequest(new InvalidParamError('inventory.warehouses[i].type deve ser PHYSICAL_STORE ou ECOMMERCE'))
      }
      const errorWarehouse = this.validationWarehouse.validate(item)
      if (errorWarehouse) {
        return badRequest(errorWarehouse)
      }
    }

    const params: NsCreateProduct.Input = {
      sku: sku,
      name: name,
      inventory: {
        warehouses: warehouses
      }
    }

    const result = await this.createProduct.create(params)
    return ok(result)
  }
}
