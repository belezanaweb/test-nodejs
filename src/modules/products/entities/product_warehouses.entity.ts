import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductWarehouseType } from "../enum/ProductWarehouseType.enum";
import { Product } from "./product.entity";

@Entity()
export class ProductWarehouse {
  @PrimaryColumn({ name: "locality" })
  locality: string;

  @Column({ name: "quantity" })
  quantity: number;

  @Column({ name: "type" })
  type: ProductWarehouseType;

  @Column()
  product_sku: number;

  @JoinColumn({
    name: "product_sku",
  })
  @ManyToOne(() => Product, (product) => product.warehouses)
  product?: Product;
}
