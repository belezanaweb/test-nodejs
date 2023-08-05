import { GetProductBySkuOutputDTO } from '../dtos'
import { NotFoundError } from '../error/not-found'
import { ProductGateway } from '../gateway/product.interface'

export class GetProductBySku {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(sku: number): Promise<GetProductBySkuOutputDTO> {
    const product = await this.productRepository.findBySku(sku)

    if (!product) {
      throw new NotFoundError()
    }

    return {
      sku: product.sku,
      name: product.name,
      inventory: {
        quantity: product.inventory.quantity,
        warehouses: product.inventory.warehouses
      },
      isMarketable: product.isMarketable
    }
  }
}
