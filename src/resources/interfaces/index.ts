import { Document } from 'mongoose';

export declare interface IProduct extends Document {
  createdAt: Date;
  inventory: IInventory;
  isMarketable?: boolean;
  name: string;
  sku: number;
  updatedAt: Date;
}

export declare interface IInventory {
  quantity?: number;
  warehouses: IWarehouses[];
}

export declare interface IWarehouses {
  locality: string;
  quantity: number;
  type: string;
}
