import { InvalidParamError } from '../error/invalid-param'

export type Warehouse = {
  locality: string
  quantity: number
  type: string
}

export type InventoryProps = {
  warehouses: Warehouse[]
}

export type ProductProps = {
  sku: number
  name: string
  inventory: InventoryProps
}

export type Inventory = {
  warehouses: Warehouse[]
  quantity: number
}

export class Product {
  private _sku: number
  private _name: string
  private _inventory: Inventory
  private _isMarketable: boolean

  constructor(private readonly props: ProductProps) {
    this.validate(props)
    this._sku = props.sku
    this._name = props.name
    this._inventory = {
      warehouses: props.inventory.warehouses,
      quantity: 0
    }
    this._isMarketable = false
    this.calculateQuantity()
    this.calculateMarketable()
  }

  private validate(props: ProductProps) {
    if (!props.sku || props.sku <= 0) {
      throw new InvalidParamError('Invalid product sku')
    }
    if (!props.name) {
      throw new InvalidParamError('Invalid product name')
    }
    if (!props.inventory) {
      throw new InvalidParamError('Invalid product inventory')
    }
    if (
      !props.inventory.warehouses ||
      !Array.isArray(props.inventory.warehouses)
    ) {
      throw new InvalidParamError('Invalid product inventory')
    }
    if (props.inventory.warehouses.length === 0) {
      throw new InvalidParamError('Invalid product inventory')
    }
    props.inventory.warehouses.forEach((warehouse) => {
      if (!warehouse.locality) {
        throw new InvalidParamError('Invalid warehouse locality')
      }
      if (!(warehouse.quantity >= 0)) {
        throw new InvalidParamError('Invalid warehouse quantity')
      }
      if (!warehouse.type) {
        throw new InvalidParamError('Invalid warehouse type')
      }
    })
  }

  private calculateQuantity() {
    const quantity = this._inventory.warehouses.reduce(
      (acc, warehouse) => acc + warehouse.quantity,
      0
    )
    this._inventory.quantity = quantity
  }

  private calculateMarketable() {
    const quantity = this._inventory.warehouses.reduce(
      (acc, warehouse) => acc + warehouse.quantity,
      0
    )
    this._isMarketable = quantity > 0
  }

  get sku() {
    return this._sku
  }

  get name() {
    return this._name
  }

  get inventory() {
    return this._inventory
  }

  get isMarketable() {
    return this._isMarketable
  }
}
