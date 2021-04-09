enum TypeWarehouse {
  ECOMMERCE = "ECOMMERCE",
  PHYSICAL_STORE = "PHYSICAL_STORE",
}

export interface WarehouseInterface {
  locality: string;
  quantity: number;
  type: TypeWarehouse;
}

export interface InventoryInterface {
  warehouses: WarehouseInterface[];
}

export class Product {
  constructor(
    public readonly sku: number,
    public readonly name: string,
    public readonly inventory: InventoryInterface,
    public readonly isMarketable?: boolean
  ) {}
}

export class Inventory {
  constructor(
    public readonly warehouses: WarehouseInterface,
    public readonly quantity?: number
    ) {}
}

export class Warehouse {
  constructor(
    public readonly locality: string,
    public readonly quantity: number,
    public readonly type: TypeWarehouse,
  ) {}
}



export interface ProductsInputDTO{
  sku: number,
  name: string,
  inventory: InventoryInterface
}

