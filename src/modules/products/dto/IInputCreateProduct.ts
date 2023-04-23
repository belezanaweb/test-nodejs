import { IInputProduct } from './IInputProduct';

export interface IInputCreateProduct {
  product: CreateProduct;
}

interface CreateProduct extends IInputProduct {
  sku: number;
}
