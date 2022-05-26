interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
}

interface ProductVerify {
  products: ProductData[];
  sku: number;
}

export interface ProductData {
  name: string;
  sku: number;
  id?: string;
  inventory: Inventory;
}

export function verifyProductExist({ products, sku }: ProductVerify): boolean {
  const findProduct = products.find((product) => product.sku === sku);

  return Boolean(findProduct);
}
