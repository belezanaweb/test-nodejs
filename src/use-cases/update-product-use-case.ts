import { ProductsRepository } from "../repositories/products-repository";

interface UpdateProductUseCaseRequest {
  name: string;
  sku: number;
  inventory: Inventory;
}

interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
  isMarketable?: boolean;
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: UpdateProductUseCaseRequest) {
    const { name, sku, inventory } = request;
    return this.productsRepository.update({
      name,
      sku,
      inventory,
    });
  }
}
