import { IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { IFindProducts, NsFindProduct } from '@/domain/protocols/find-product-protocol'

export class FindProducts implements IFindProducts {
  constructor (
    private readonly productRepo: IDbFindProducts
  ) {}

  async findAll (): Promise<NsFindProduct.FindAllOutput> {
    const products = await this.productRepo.findAll()
    if (products) {
      const result: IProductModel[] = products.map(item => { return JSON.parse(item) })
      return result
    }
  }
}
