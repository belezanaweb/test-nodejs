export interface Product {
  sku: number;
  name: string;
  inventory: Inventory;
  isMarketable?: boolean;
}

export interface Inventory {
  quantity?: number;
  warehouses: Warehouse[];
}

export interface Warehouse {
  locality: string;
  quantity: number;
  type: string;
}

const getQuantityTotal = (warehouses: Warehouse[]) => {
  return warehouses.reduce(sumQuantity, 0);
};

const sumQuantity = (sum: number, warehouse: Warehouse) => {
  return sum + warehouse.quantity;
};

export const getProduct = (product: Product) => {
  if (product) {
    const totalQuantity = getQuantityTotal(product.inventory.warehouses);

    return {
      ...product,
      inventory: {
        ...product.inventory,
        quantity: totalQuantity,
      },
      isMarketable: totalQuantity > 0,
    };
  }
};
