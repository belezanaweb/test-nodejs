import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { IFindProductById, NsFindProduct } from '@/domain/protocols/find-product-protocol'

export class FindProductById implements IFindProductById {
  constructor (
    private readonly productRepo: IDbFindProductById,
    private readonly calculateProductAttrib: ICalculateProductAttributes
  ) {}

  async findById (sku: number): Promise<NsFindProduct.FindByIdOutput> {
    const product = await this.productRepo.findById(sku)
    if (product) {
      const result: IProductModel = JSON.parse(product)
      const inventoryQuantity = await this.calculateProductAttrib.calcTotalQuantity(result)
      const isMarketable = await this.calculateProductAttrib.calcIsMarketable(result)
      result.inventory.quantity = inventoryQuantity
      result.isMarketable = isMarketable
      return result
    }
  }
}
