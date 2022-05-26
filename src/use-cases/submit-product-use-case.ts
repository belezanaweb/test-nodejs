import { ProductsRepository } from "../repositories/products-repository";

interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
}

interface SubmitProductUseCaseRequest {
  name: string;
  sku: number;
  inventory: Inventory;
}

export class SubmitProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  execute(request: SubmitProductUseCaseRequest) {
    const { name, sku, inventory } = request;
    return this.productsRepository.create({
      name,
      sku,
      inventory,
    });
  }
}
