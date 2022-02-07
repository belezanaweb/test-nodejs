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

  async findAll (): Promise<IProductModel[] | undefined> {
    const products = await this.getProductRepo().find()
    const result: IProductModel[] = []
    products.map(item => {
      return result.push({
        sku: item.productCode,
        name: item.name,
        inventory: {
          quantity: 99,
          warehouses: item
            ? item.inventory?.map(item => {
              return {
                locality: item.warehouse.locality,
                quantity: item.quantity,
                type: item.warehouse.type
              }
            })
            : undefined
        },
        isMarketable: true
      })
    })
    return result
  }

  async findById (sku: number): Promise<IProductModel | undefined> {
    const product = await this.getProductRepo().findOne({ productCode: sku })
    if (product) {
      return {
        sku: product.productCode,
        name: product.name,
        inventory: {
          quantity: 99,
          warehouses: product
            ? product.inventory?.map(item => {
              return {
                locality: item.warehouse.locality,
                quantity: item.quantity,
                type: item.warehouse.type
              }
            })
            : undefined
        },
        isMarketable: true
      }
    }
  }

  async insert (params: NsDbInsertProduct.Input): Promise<void> {
    await this.getProductRepo().insert({
      productCode: params.productCode,
      name: params.name
    })
  }
}
