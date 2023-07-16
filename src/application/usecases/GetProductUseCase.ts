import ProductRepository from "../../infraestructure/repositories/ProductRepository";
import ProductNotFoundError from "../../errors/ProductNotFoundError";

export default class GetProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  execute(sku: number): any {
    const product = this.productRepository.findBySku(sku);

    if (!product) {
      throw new ProductNotFoundError(sku);
    }

    return product;
  }
}
