import { Transform, Type } from 'class-transformer';

export enum E_WAREHOUSE_STORE_TYPE {
  ECOMMERCE = 'ECOMMERCE',
  PHYSICAL_STORE = 'PHYSICAL_STORE',
}

class ProductWareHouse {
  locality: string;
  quantity: number;

  @Transform((e) => E_WAREHOUSE_STORE_TYPE[e.value])
  type: E_WAREHOUSE_STORE_TYPE;
}

class ProductInventory {
  @Type(() => ProductWareHouse)
  warehouses: ProductWareHouse[];
}

export class Product {
  sku: number;
  name: string;

  @Type(() => ProductInventory)
  inventory: ProductInventory;
}
