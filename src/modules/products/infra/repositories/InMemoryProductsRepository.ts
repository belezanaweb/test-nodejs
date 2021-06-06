import ProductsRepository from '@modules/products/repositories/ProductRepository'
import CreateProductDTO from '../../dto/CreateProductDTO';
import Product from '../../entities/Product';

class InMemoryProductsRepository implements ProductsRepository {
  private products: Product[] = []

  public async create({ name, sku, inventory }: CreateProductDTO): Promise<Product> {
    const product: Product = { name, sku, inventory }

    this.products.push(product)

    return product
  }
}

export default InMemoryProductsRepository
