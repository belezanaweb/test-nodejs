import { Inventory } from "../model/Inventory";

export interface CreateProductInputDTO {
    sku: number;
    name: string;
    inventory: Inventory;
  }