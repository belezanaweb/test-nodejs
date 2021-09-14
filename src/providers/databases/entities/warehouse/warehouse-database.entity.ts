import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductDatabaseEntity } from "../product/product-database.entity";

@Entity('warehouses')
export class WarehouseDatabaseEntity {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  locality: string;

  @Column()
  quantity: number;

  @Column()
  type: 'ECOMMERCE' | 'PHYSICAL_STORE';

  @Column({
    name: 'product_id'
  })
  productId: number;

  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'sku'
  })
  @ManyToOne(() => ProductDatabaseEntity, productEntity => productEntity.warehouses)
  product: ProductDatabaseEntity;

  @CreateDateColumn({
    name: 'created_at'
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  readonly updatedAt: Date;
}
