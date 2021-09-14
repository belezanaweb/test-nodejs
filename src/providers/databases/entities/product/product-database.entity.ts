import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WarehouseDatabaseEntity } from "../warehouse/warehouse-database.entity";

@Entity('products')
export class ProductDatabaseEntity {

  @PrimaryGeneratedColumn()
  sku: number;

  @Column()
  name: string;

  @OneToMany(() => WarehouseDatabaseEntity, warehouseEntity => warehouseEntity.product)
  warehouses: WarehouseDatabaseEntity[];

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date;
}
