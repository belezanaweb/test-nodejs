import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { IFindProductById, NsFindProduct } from '@/domain/protocols/find-product-protocol'

export class FindProductById implements IFindProductById {
  constructor (
    private readonly productRepo: IDbFindProductById
  ) {}

  async findById (sku: number): Promise<NsFindProduct.FindByIdOutput> {
    const product = await this.productRepo.findById(sku)
    if (product) {
      const result: IProductModel = JSON.parse(product)
      return result
    }
  }
}
