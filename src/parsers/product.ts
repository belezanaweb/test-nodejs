import { IProduct } from "../interfaces/product";

export function productParser(product: IProduct): IProduct {
  product.inventory.quantity = product.inventory.warehouses.reduce(
    (acc, current) => acc + current.quantity,
    0
  );
  product.isMarketable = false;

  if (product.inventory.quantity > 0) {
    product.isMarketable = true;
  }

  return {
    sku: product.sku,
    name: product.name,
    inventory: {
      quantity: product.inventory.quantity,
      warehouses: product.inventory.warehouses
    },
      isMarketable: product.isMarketable
  };
}

export function productListParser(productList: IProduct[]): IProduct[] {
  const parsedProductList: IProduct[] = [];
  productList.forEach((product) => {
    parsedProductList.push(productParser(product));
  });

  return parsedProductList;
}
