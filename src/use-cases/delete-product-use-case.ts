import { ProductsRepository } from "../repositories/products-repository";
export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  execute(sku: number): void {
    return this.productsRepository.delete(sku);
  }
}
