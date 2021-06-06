import Warehouse from "../entities/Warehouse";

export default interface CreateProductDTO {
  sku: number;
  name: string;
  inventory: {
    warehouses: Warehouse[]
  }
}
