import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { IProductModel } from '@/domain/models/product-model'
import { ICreateProduct, NsCreateProduct } from '@/domain/protocols/create-product-protocol'

export class CreateProduct implements ICreateProduct {
  constructor (
    private readonly productRepo: IDbFindProductById & IDbInsertProduct
  ) {}

  async create (params: NsCreateProduct.Input): Promise<IProductModel> {
    const existingProduct = await this.productRepo.findById(params.sku)
    if (existingProduct) {
      throw new GenericBussinessError(`Já existe um Produto com o Código SKU ${params.sku} cadastrado.`)
    }

    await this.productRepo.insert({ productCode: params.sku, name: params.name })

    const result = await this.productRepo.findById(params.sku)
    if (!result) {
      throw new GenericBussinessError(`Não foi possivel inserir o Produto com o Código SKU ${params.sku}.`)
    }

    return result
  }
}
