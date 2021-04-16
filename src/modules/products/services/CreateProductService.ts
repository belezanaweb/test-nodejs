import Product from '../infra/db/entities/Product';
import ProductRepository from '../infra/db/repositories/ProductReposity';

class CreateProductService {
  constructor(private productsRepository: ProductRepository){}

  public async execute(product: Product) {
    const products = this.productsRepository.create(product);
    return products;
  }
}

export default CreateProductService;
