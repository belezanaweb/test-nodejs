import { IDbFindProductById } from '@/data/protocols/db-find-product-by-id-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { IFindProductById, NsFindProductById } from '@/domain/protocols/find-product-by-id-protocol'

export class FindProductById implements IFindProductById {
  constructor (
    private readonly productRepo: IDbFindProductById
  ) {}

  async findById (sku: number): Promise<NsFindProductById.Output> {
    const product = await this.productRepo.findById(sku)
    if (product) {
      const result: IProductModel = JSON.parse(product)
      return result
    }
  }
}
