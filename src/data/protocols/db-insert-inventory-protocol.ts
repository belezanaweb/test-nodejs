export namespace NsDbInsertInventory {
  export type Input = {
    quantity: number
    warehouseCode: number
    productCode: number
  }
}

export interface IDbInsertInventory {
  insert: (params: NsDbInsertInventory.Input) => Promise<void>
}
