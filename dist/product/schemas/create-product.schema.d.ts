import { CreateInventorySchema } from '../../inventory/schemas/create-inventory.schema';
export declare class CreateProductSchema {
    sku: number;
    name: string;
    inventory: CreateInventorySchema;
}
