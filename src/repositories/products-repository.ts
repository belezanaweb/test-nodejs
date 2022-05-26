export interface ProductCreateData {
  name: string;
  sku: number;
  id?: string;
  inventory: Inventory;
}

export interface ProductData extends ProductCreateData {
  id: string;
}

interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
}

export interface Product {
  name: string;
  sku: number;
  id?: string;
  inventory: Inventory;
}

export interface ProductRecoverData {
  sku: number;
  name: string;
  id: string;
  inventory: Warehouse[];
}

export interface ProductsRepository {
  create: (data: ProductCreateData) => Promise<string>;
  recover: (sku: number) => ProductData | undefined;
  update: (product: Product) => ProductData;
  delete: (sku: number) => void;
}
