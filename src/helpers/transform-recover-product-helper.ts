import { ProductData } from "../repositories/products-repository";

export function transformRecoverProduct(product: ProductData | undefined) {
  if (product === undefined) {
    throw new Error("Produto ausente");
  }

  const countQuantityProductsInWarehouses = product.inventory.warehouses.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const checkIfProductIsMarketable = countQuantityProductsInWarehouses > 0;

  return Object.assign(
    {},
    {
      ...product,
      inventory: {
        quantity: countQuantityProductsInWarehouses,
        warehouses: product.inventory,
      },
      isMarketable: checkIfProductIsMarketable,
    }
  );
}
