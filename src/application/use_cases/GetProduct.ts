import ProductRepository from "src/domain/repositories/ProductRepository";
import { ProductDTO } from "src/application/use_cases/DTO/ProductDTO";
import ProductUseCaseAbstract from "./abstracts/ProductUseCaseAbstract";

export default class GetProduct extends ProductUseCaseAbstract {
  private productRepository: ProductRepository;

  constructor({ productRepository }: { productRepository: ProductRepository }) {
    super();
    this.productRepository = productRepository;
  }

  async execute({ sku }: { sku: string }): Promise<ProductDTO> {
    const product = await this.productRepository.getBySku({ sku });
    return this.buildDTOFromProduct(product);
  }
}
