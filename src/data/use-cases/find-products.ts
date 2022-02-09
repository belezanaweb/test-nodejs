import { IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { IFindProducts, NsFindProduct } from '@/domain/protocols/find-product-protocol'

export class FindProducts implements IFindProducts {
  constructor (
    private readonly productRepo: IDbFindProducts,
    private readonly calculateProductAttrib: ICalculateProductAttributes
  ) {}

  async findAll (): Promise<NsFindProduct.FindAllOutput> {
    const products = await this.productRepo.findAll()
    if (products) {
      const result: IProductModel[] = products.map(item => { return JSON.parse(item) })
      for (const item of result) {
        const inventoryQuantity = await this.calculateProductAttrib.calcTotalQuantity(item)
        const isMarketable = await this.calculateProductAttrib.calcIsMarketable(item)
        item.inventory.quantity = inventoryQuantity
        item.isMarketable = isMarketable
      }
      return result
    }
  }
}
