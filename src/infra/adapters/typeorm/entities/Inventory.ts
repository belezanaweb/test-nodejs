import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Product } from './Product'
import { Warehouse } from './Warehouse'

@Entity('Inventory', { schema: 'dbo' })
export class Inventory {
  @PrimaryColumn({ type: 'integer', primary: true, name: 'InventoryCode' })
  inventoryCode?: number

  @Column({ type: 'integer', name: 'Quantity' })
  quantity!: number

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventory, { eager: true })
  @JoinColumn([{ name: 'WarehouseCode', referencedColumnName: 'warehouseCode' }])
  warehouse!: Warehouse

  @ManyToOne(() => Product, (product) => product.inventory, { eager: true })
  @JoinColumn([{ name: 'ProductCode', referencedColumnName: 'productCode' }])
  product!: Product
}
