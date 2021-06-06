import Warehouse from '@modules/products/entities/Warehouse';
export default interface CreateProductDTO {
  sku: number;
  name: string;
  inventory: {
    warehouses: Warehouse[]
  }
}
