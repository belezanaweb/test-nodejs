import { IDbFindProductById, IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { IDbInsertProduct, NsDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { Product } from '@/infra/adapters/typeorm/entities/product'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class ProductRepository extends TypeORMRepository implements IDbFindProducts, IDbFindProductById, IDbInsertProduct {
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

  async insert (params: NsDbInsertProduct.Input): Promise<void> {
    await this.getProductRepo().insert({
      productCode: params.productCode,
      name: params.name
    })
  }
}
