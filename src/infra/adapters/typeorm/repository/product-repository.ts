import { IDbFindProductById, IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { Product } from '@/infra/adapters/typeorm/entities/product'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class ProductRepository extends TypeORMRepository implements IDbFindProducts, IDbFindProductById {
  private getProductRepo (): Repository<Product> {
    return this.getRepository(Product)
  }

  async findAll (): Promise<IProductModel[] | []> {
    const products = await this.getProductRepo().find()
    console.log(products)
    return []
  }

  async findById (sku: number): Promise<IProductModel | undefined> {
    const product = await this.getProductRepo().findOne({ productCode: sku })
    console.log(product)
    return undefined
  }
}
