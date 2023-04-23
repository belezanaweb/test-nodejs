import { IInputProduct } from '../dto/IInputProduct';

export interface IProductRepo {
  find(sku: number): Promise<Product | null>;
  create(data: IInputProduct): Promise<Product>;
  update(sku: number, data: IInputProduct): Promise<Product>;
  delete(sku: number): Promise<void>;
}

export type Warehouses = {
  locality: string;
  quantity: number;
  type: string;
};

export type Inventury = {
  warehouses: Warehouses[];
};

export type Product = {
  sku?: number;
  name: string;
  inventory: Inventury;
};

export function instanceOfProduct(data: any): data is Product {
  if (!data) return false;
  return (
    Object.prototype.hasOwnProperty.call(data, 'sku') &&
    Object.prototype.hasOwnProperty.call(data, 'name') &&
    Object.prototype.hasOwnProperty.call(data, 'inventory')
  );
}
