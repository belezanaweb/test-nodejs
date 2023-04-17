import ProductRepository from "src/domain/repositories/ProductRepository";
import { ProductDTO } from "src/application/use_cases/DTO/ProductDTO";
import ProductUseCaseAbstract from "src/application/use_cases/abstracts/ProductUseCaseAbstract";

export default class UpdateProduct extends ProductUseCaseAbstract {

  private productRepository: ProductRepository;

  constructor({ productRepository }: { productRepository: ProductRepository }) {
    super();
    this.productRepository = productRepository;
  }

  async execute(productToUpdate: ProductDTO): Promise<ProductDTO> {
    const updatedProduct = await this.productRepository.update({ product: this.buildProductFromDTO(productToUpdate) });
    return this.buildDTOFromProduct(updatedProduct);
  }
}
