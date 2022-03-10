import { Exclude, Expose } from 'class-transformer';
import { InventoryEntity } from '../../inventory/entities/inventory.entity';

@Exclude()
export class ProductEntity {
  @Expose()
  sku: number;

  @Expose()
  name: string;

  @Expose()
  inventory: InventoryEntity;

  @Expose()
  isMarketable: boolean;
}
