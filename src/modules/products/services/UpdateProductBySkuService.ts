import Product from '../infra/db/entities/Product';
import IProductRepository from '../infra/repositories/IProductRepository'

class UpdateProductBySkuService {
  constructor(private productsRepository: IProductRepository){}

  public async execute(sku: number, product: Product): Promise<Product | undefined> {
   const productUpdated = this.productsRepository.updateProduct(sku, product);
    return productUpdated;
  }
}

export default UpdateProductBySkuService;
