import { InventoryEntity } from '../../inventory/entities/inventory.entity';
export declare class ProductEntity {
    sku: number;
    name: string;
    inventory: InventoryEntity;
    isMarketable: boolean;
}
