import { ProductsError } from "@shared/errors/ProductsError";

import Products from "./Products.entity";
import ProductsRepository from "./Products.repository";

export class ProductsService {
  private repository: ProductsRepository;

  constructor(repository: ProductsRepository) {
    this.repository = repository;
  }

  get(): Products[] {
    return this.repository.all();
  }

  findOne(sku: string): Products {
    const product = this.repository.findOne(sku);

    if (!product) {
      throw new ProductsError.ProductNotExists();
    }

    const sum = product.inventory.warehouses.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    return {
      ...product,
      inventory: {
        ...product.inventory,
        quantity: sum,
      },
      isMarketable: !!sum,
    } as Products;
  }

  create(product: Products): Products {
    const exists = this.repository.findOne(product.sku);

    if (exists) {
      throw new ProductsError.ProductExists();
    }

    return this.repository.create(product);
  }

  update(sku: string, product: Products): Products {
    const exists = this.repository.findOne(sku);

    if (!exists) {
      throw new ProductsError.ProductNotExists();
    }

    return this.repository.update(sku, product);
  }

  delete(sku: string): boolean {
    const exists = this.repository.findOne(sku);

    if (!exists) {
      throw new ProductsError.ProductNotExists();
    }

    return this.repository.delete(sku);
  }
}
