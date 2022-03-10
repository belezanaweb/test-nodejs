import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class WarehouseEntity {
  @Expose()
  locality: string;

  @Expose()
  quantity: number;

  @Expose()
  type: string;
}
