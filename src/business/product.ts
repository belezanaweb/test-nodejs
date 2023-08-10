import { product } from "./../models/product";
import { IProduct } from "../interfaces/product";
import { productListParser, productParser } from "../parsers/product";

export async function createBusiness(data: IProduct): Promise<number> {
  if (product.checkExists(data.sku)) {
    throw new Error("Product already exists");
  }

  return product.create(data);
}

export async function findAll(): Promise<IProduct[]> {
  const productList = product.findAll();
  return productListParser(productList);
}

export async function findBySku(sku: number): Promise<IProduct> {
  const response = product.findBySku(sku);
  if (response.length === 0) {
    throw new Error("Product not found");
  }

  return productParser(response[0]);
}
