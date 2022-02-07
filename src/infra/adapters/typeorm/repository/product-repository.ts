import { IDbFindProductById, IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { IDbInsertProduct, NsDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { IProductModel } from '@/domain/models/product-model'
import { Product } from '@/infra/adapters/typeorm/entities/product'
import { productMapToModel, productsMapToModel } from '@/infra/adapters/typeorm/helpers/mappers/product-mapper'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class ProductRepository extends TypeORMRepository implements IDbFindProducts, IDbFindProductById, IDbInsertProduct {
  private getProductRepo (): Repository<Product> {
    return this.getRepository(Product)
  }

  async findAll (): Promise<IProductModel[] | undefined> {
    const products = await this.getProductRepo().find()
    return products ? productsMapToModel(products) : undefined
  }

  async findById (sku: number): Promise<IProductModel | undefined> {
    const product = await this.getProductRepo().findOne({ productCode: sku })
    return product ? productMapToModel(product) : undefined
  }

  async insert (params: NsDbInsertProduct.Input): Promise<void> {
    await this.getProductRepo().insert({
      productCode: params.productCode,
      name: params.name
    })
  }
}
