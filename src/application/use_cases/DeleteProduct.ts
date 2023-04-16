import ProductRepository from "src/domain/repositories/ProductRepository";


export default class DeleteProduct {
  private productRepository: ProductRepository;

  constructor({ productRepository }: { productRepository: ProductRepository }) {
    this.productRepository = productRepository;
  }

  async execute({ sku }: { sku: number }): Promise<string> {
    await this.productRepository.delete({ sku });
    return `product sku: ${sku} deleted`;
  }
}
