import {Table, Model, Column, Index} from 'sequelize-typescript';
import {DataType} from 'sequelize-typescript';
import { Optional } from 'sequelize'
export type WarehousesAttributes = {
  locality: string
  quantity: number
  type: string
}
export type InventoryAtrributes = {
  quantity?: number
  warehouses: Array<WarehousesAttributes>
}
export interface ProductAttributes {
  id?: number
  sku: number
  name: string
  isMarketable?: boolean
  inventory: InventoryAtrributes
}


interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}
@Table
export class Product extends Model<ProductAttributes, ProductCreationAttributes> {

  @Index({
    name: 'sku-index',
    type: 'UNIQUE',
    unique: true
  })
  @Column(DataType.NUMBER)
  sku!: number

  @Column
  name!: string

  @Column(DataType.JSON)
  inventory!: string
}

export default Product;

