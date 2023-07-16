import Product from "../../domain/Product";
import ProductRepository from "../../infraestructure/repositories/ProductRepository";

export default class UpdateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  execute(sku: number, newData: Partial<Product>): Product {
    const product = this.productRepository.findBySku(sku);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    const typedProduct = product as unknown as Product;
    Object.assign(product, newData);

    this.productRepository.save(typedProduct);

    return typedProduct;
  }
}
