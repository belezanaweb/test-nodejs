import { IDbFindProductById } from '@/data/protocols/db-find-product-by-id-protocol'
import { IDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { IProductModel } from '@/domain/models/product-model'
import { IInsertProduct, NsInsertProduct } from '@/domain/protocols/insert-product-protocol'

export class InsertProduct implements IInsertProduct {
  constructor (
    private readonly productRepo: IDbFindProductById & IDbInsertProduct
  ) {}

  async insert (params: NsInsertProduct.Input): Promise<IProductModel> {
    const existingProduct = await this.productRepo.findById(params.sku)
    if (existingProduct) {
      throw new GenericBussinessError(`Já existe um Produto com o Código SKU ${params.sku} cadastrado na Base de Dados.`)
    }

    const product = await this.productRepo.insert(params)

    const result: IProductModel = JSON.parse(product)
    return result
  }
}
