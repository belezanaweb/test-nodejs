import Product from '../infra/db/entities/Product';
import IProductRepository from '../infra/repositories/IProductRepository'
import AppError from '../../../shared/error/AppError';

class FindProductBySkuService {
  constructor(private productsRepository: IProductRepository){}

  public async execute(sku: number) {
    const product = await this.productsRepository.getProductBySku(sku);

    if(!product) {
      throw new AppError('Product not found', 404)
    }

    const productWithQuantity: Product = this.sumProductsInventory(product)

    if(productWithQuantity.inventory.quantity <= 0) {
      productWithQuantity.isMarketable = false;
    }

    return product;
  }

  private sumProductsInventory(product: Product): Product {
    const quantity = product.inventory.warehouses.length ? product.inventory.warehouses
      .map(warehouse => warehouse.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue) : 0

    Object.assign(product.inventory, { quantity })

    return product;
  }
}

export default FindProductBySkuService;
