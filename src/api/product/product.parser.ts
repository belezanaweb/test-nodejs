import { IProduct, IWarehouse } from './product.interface';

const getTotalQuantity = (warehouses : IWarehouse[]) => {
  return warehouses.reduce(sumQuantity, 0);
}

const sumQuantity = (sum: number, warehouse: IWarehouse) => {
  return sum + warehouse.quantity;
}

export const getProductParser = (product: IProduct) => {
  const totalQuantity = getTotalQuantity(product.inventory.warehouses);

  return {
    ...product,
    inventory: {
      ...product.inventory,
      quantity: totalQuantity,
    },
    isMarketable: totalQuantity > 0
  };
}
