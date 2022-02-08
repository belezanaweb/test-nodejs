import { IDbDeleteProductById } from '@/data/protocols/db-delete-product-by-id-protocol'
import { IDbFindProductById } from '@/data/protocols/db-find-product-by-id-protocol'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { IDeleteProductById } from '@/domain/protocols/delete-product-by-id-protocol'

export class DeleteProductById implements IDeleteProductById {
  constructor (
    private readonly productRepo: IDbFindProductById & IDbDeleteProductById
  ) {}

  async deleteById (sku: number): Promise<void> {
    const existingProduct = await this.productRepo.findById(sku)
    if (!existingProduct) {
      throw new GenericBussinessError(`Não foi localizado um Produto com o Código SKU ${sku} na Base de Dados.`)
    }

    await this.productRepo.deleteById(sku)
  }
}
