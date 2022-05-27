import ProductsRepository from '../repositories/products-repository';
import Product from '../models/product';
import { Request,RequestUpdate } from '../interfaces/global.interfaces';

class ProductsService {
  private productsRepository: ProductsRepository;
  
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }

  public create({ sku, name, inventory }: Request): Product {    
    const product = this.productsRepository.create({
      sku,
      name,
      inventory
    });
    return product;
  }

  public update(sku: number,{ name, inventory }: RequestUpdate): Product {    
    const product = this.productsRepository.update(
      sku,
      { name, inventory }
    );
    return product;
  }

  public get(sku: number): Product {    
    const product = this.productsRepository.get(sku);
    return product;
  }

  public delete(sku: number): void {    
    this.productsRepository.delete(sku);
    return;
  }

}
export default ProductsService;
