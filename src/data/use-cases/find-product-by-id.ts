import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { IFindProductById } from '@/domain/protocols/find-product-by-id-protocol'

export class FindProductById implements IFindProductById {
  constructor (
    private readonly productRepo: IDbFindProductById
  ) {}

  async findById (sku: number): Promise<IProductModel | undefined> {
    const result = await this.productRepo.findById(sku)
    return result
  }
}
