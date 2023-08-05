import { Product } from '../domain/product'
import {
  CreateProductInputDTO,
  CreateProductOutputDTO
} from '../dtos/create-product'
import { InvalidParamError } from '../error/invalid-param'
import { ProductGateway } from '../gateway/product.interface'

export class CreateProduct {
  constructor(private productRepository: ProductGateway) {}

  async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const product = new Product(input)
    const alreadyExists = await this.productRepository.findBySku(product.sku)
    if (alreadyExists) {
      throw new InvalidParamError('Product already exists')
    }
    await this.productRepository.add(product)
  }
}
