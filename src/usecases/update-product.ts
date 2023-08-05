import { Product } from '../domain/product'
import {
  UpdateProductInputDTO,
  UpdateProductOutputDTO
} from '../dtos/update-product'
import { NotFoundError } from '../error/not-found'
import { ProductGateway } from '../gateway/product.interface'

export class UpdateProduct {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
    const product = await this.productRepository.findBySku(input.sku)

    if (!product) {
      throw new NotFoundError()
    }

    const newProduct = new Product(input)

    const updatedProduct = await this.productRepository.update(newProduct)

    return {
      sku: updatedProduct.sku,
      name: updatedProduct.name,
      inventory: {
        quantity: updatedProduct.inventory.quantity,
        warehouses: updatedProduct.inventory.warehouses
      },
      isMarketable: updatedProduct.isMarketable
    }
  }
}
