import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Inventory } from './Inventory'

@Entity('Product', { schema: 'dbo' })
export class Product {
  @PrimaryColumn({ type: 'integer', primary: true, name: 'ProductCode' })
  productCode?: number

  @Column({ type: 'varchar', name: 'Name', length: 250 })
  name!: string

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory?: Inventory[]
}
