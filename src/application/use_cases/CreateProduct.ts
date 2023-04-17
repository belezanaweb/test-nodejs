import ProductRepository from "src/domain/repositories/ProductRepository";
import { ProductDTO } from "src/application/use_cases/DTO/ProductDTO";
import ProductUseCaseAbstract from "src/application/use_cases/abstracts/ProductUseCaseAbstract";


export default class CreateProduct extends ProductUseCaseAbstract {
  private productRepository: ProductRepository;

  constructor({ productRepository }: { productRepository: ProductRepository }) {
    super();
    this.productRepository = productRepository;
  }

  async execute(newProduct: ProductDTO): Promise<ProductDTO> {
    const createdProduct = await this.productRepository.create({ product: this.buildProductFromDTO(newProduct) })
    return this.buildDTOFromProduct(createdProduct);
  }
}
