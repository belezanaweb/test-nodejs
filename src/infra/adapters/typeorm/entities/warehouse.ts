import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Inventory } from './inventory'

@Entity('Warehouse', { schema: 'dbo' })
export class Warehouse {
  @PrimaryColumn({ type: 'integer', primary: true, name: 'WarehouseCode' })
  warehouseCode?: number

  @Column({ type: 'varchar', name: 'Locality', length: 250 })
  locality!: string

  @Column({ type: 'varchar', name: 'Type', length: 20 })
  type!: 'PHYSICAL_STORE' | 'ECOMMERCE'

  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventory?: Inventory[]
}
