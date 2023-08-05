import { DeleteProductDTO } from '../dtos/delete-product'
import { NotFoundError } from '../error/not-found'
import { ProductGateway } from '../gateway/product.interface'

export class DeleteProduct {
  constructor(private readonly productGateway: ProductGateway) {}

  async execute(input: DeleteProductDTO): Promise<void> {
    const product = await this.productGateway.findBySku(input.sku)
    if (!product) {
      throw new NotFoundError()
    }
    await this.productGateway.delete(input.sku)
  }
}
