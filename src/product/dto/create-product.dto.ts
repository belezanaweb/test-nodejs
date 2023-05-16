export class CreateProductDto {
  sku: string;
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
