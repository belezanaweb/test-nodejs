import { IDbDeleteProductById } from '@/data/protocols/db-delete-product-by-id-protocol'
import { IDbFindProductById, IDbFindProducts, NsDbFindProduct } from '@/data/protocols/db-find-product-by-id-protocol'
import { IDbInsertProduct, NsDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { IDbUpdateProductById, NsDbUpdateProduct } from '@/data/protocols/db-update-product-protocol'
import { ProductJSON } from '@/infra/adapters/typeorm/entities/product-json'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class ProductJsonRepository extends TypeORMRepository implements IDbFindProducts, IDbFindProductById, IDbInsertProduct, IDbUpdateProductById, IDbDeleteProductById {
  private getProductJSONRepo (): Repository<ProductJSON> {
    return this.getRepository(ProductJSON)
  }

  async findAll (): Promise<NsDbFindProduct.FindAllOutput> {
    const products = await this.getProductJSONRepo().find()
    return products.map(item => { return item.value })
  }

  async findById (sku: number): Promise<NsDbFindProduct.FindByIdOutput> {
    const product = await this.getProductJSONRepo().findOne({ codigoProduct: sku })
    return product?.value
  }

  async insert (params: NsDbInsertProduct.Input): Promise<string> {
    await this.getProductJSONRepo().insert({ codigoProduct: params.sku, value: JSON.stringify(params) })
    return JSON.stringify(params)
  }

  async updateById (params: NsDbUpdateProduct.Input): Promise<string> {
    const { oldSku, ...newValue } = params
    await this.getProductJSONRepo().update({ codigoProduct: params.oldSku }, { codigoProduct: params.sku, value: JSON.stringify(newValue) })
    return JSON.stringify(newValue)
  }

  async deleteById (sku: number): Promise<void> {
    await this.getProductJSONRepo().delete({ codigoProduct: sku })
  }
}
