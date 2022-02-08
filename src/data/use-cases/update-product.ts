import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IDbUpdateProductById } from '@/data/protocols/db-update-product-protocol'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { IProductModel } from '@/domain/models/product-model'
import { IUpdateProductById, NsUpdateProduct } from '@/domain/protocols/update-product-protocol'

export class UpdateProductById implements IUpdateProductById {
  constructor (
    private readonly productRepo: IDbFindProductById & IDbUpdateProductById
  ) {}

  async updateById (params: NsUpdateProduct.Input): Promise<IProductModel> {
    const existingProduct = await this.productRepo.findById(params.oldSku)
    if (!existingProduct) {
      throw new GenericBussinessError(`Não foi localizado um Produto com o Código SKU ${params.oldSku} na Base de Dados.`)
    }

    const product = await this.productRepo.updateById(params)

    const result: IProductModel = JSON.parse(product)
    return result
  }
}
