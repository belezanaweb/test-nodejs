import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { ProductWarehouse } from "./product_warehouses.entity";

@Entity()
export class Product {
  @PrimaryColumn({ name: "sku" })
  sku: number;

  @Column({ name: "name" })
  name: string;

  @OneToMany(
    () => ProductWarehouse,
    (productWarehouse) => productWarehouse.product,
    {
      eager: true,
    }
  )
  warehouses: ProductWarehouse[];
}
