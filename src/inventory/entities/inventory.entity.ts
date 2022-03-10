import { Exclude, Expose } from 'class-transformer';
import { WarehouseEntity } from '../../warehouse/entities/warehouse.entity';

@Exclude()
export class InventoryEntity {
  @Expose()
  quantity: number;

  @Expose()
  warehouses: WarehouseEntity[];
}
