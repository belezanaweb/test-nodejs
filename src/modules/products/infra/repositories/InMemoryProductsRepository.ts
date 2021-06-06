import ProductsRepository from '@modules/products/repositories/ProductRepository'
import CreateProductDTO from '../../dto/CreateProductDTO';
import Product from '../../entities/Product';

class InMemoryProductsRepository implements ProductsRepository {

  private products: Product[] = []

  public async findBySku(sku: number): Promise<Product> {
    return this.products.find((product) => product.sku == sku)
  }

  public async create({ name, sku, inventory }: CreateProductDTO): Promise<Product> {
    const product: Product = { name, sku, inventory }
    this.products.push(product)
    return product
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(findProduct => findProduct.sku == product.sku)
    this.products[findIndex] = product
    return product
  }
}

export default InMemoryProductsRepository
