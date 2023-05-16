export class CreateProductDto {
  sku: number;
  name: string;
  inventory: Inventory;
}

interface Inventory {
  warehouses: Warehouse[];
}

interface Warehouse {
  locality: string;
  type: string;
}
