import {
  ProductData,
  ProductsRepository,
} from "../repositories/products-repository";

interface RecoverProductUseCaseRequest {
  sku: number;
}

export class RecoverProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    sku,
  }: RecoverProductUseCaseRequest): Promise<ProductData | undefined> {
    return this.productsRepository.recover(sku);
  }
}
