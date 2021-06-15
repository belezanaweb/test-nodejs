import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { E_WAREHOUSE_STORE_TYPE } from '../entities/product.entity';

@Exclude()
class CreateProductWareHouseDto {
  @Expose()
  @ApiProperty()
  locality: string;

  @Expose()
  @ApiProperty()
  quantity: number;

  @Expose()
  @Transform((e) => E_WAREHOUSE_STORE_TYPE[e.value])
  @ApiProperty({ enum: E_WAREHOUSE_STORE_TYPE })
  type: E_WAREHOUSE_STORE_TYPE;
}

@Exclude()
class ProductInventoryPresenterRo {
  @Expose()
  @Type(() => CreateProductWareHouseDto)
  @ApiProperty({ type: [CreateProductWareHouseDto] })
  warehouses: CreateProductWareHouseDto[];

  @Expose()
  @Transform((e) =>
    e.obj?.warehouses?.reduce((accum, next) => accum + next.quantity, 0),
  )
  @ApiProperty()
  quantity: number;
}

@Exclude()
export class ProductPresenterRo {
  @Expose()
  @ApiProperty()
  sku: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @Type(() => ProductInventoryPresenterRo)
  @ApiProperty()
  inventory: ProductInventoryPresenterRo;

  @Expose()
  @Transform((e) =>
    e.obj?.inventory?.warehouses?.some((warehouse) => warehouse.quantity > 0),
  )
  @ApiProperty()
  isMarketable: boolean;
}
