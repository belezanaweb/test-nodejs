import Product from "../../domain/Product";
import ProductRepository from "../../infraestructure/repositories/ProductRepository";
import DuplicateError from "../../errors/DuplicateError";

export default class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(data: any): Promise<Product> {
    const { sku, name, inventory } = data;

    if (await this.productRepository.findBySku(sku)) {
      throw new DuplicateError();
    }

    const product = new Product(sku, name, inventory);

    await this.productRepository.save(product);

    return product;
  }
}
