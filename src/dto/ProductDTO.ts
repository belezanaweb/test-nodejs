import { Inventory } from "../model/Inventory";
import { Product } from "../model/Product";

export interface CreateProductInputDTO {
  sku: number;
  name: string;
  inventory: Inventory;
}

export interface EditProductInputDTO {
  sku: number;
  product: Product
}
