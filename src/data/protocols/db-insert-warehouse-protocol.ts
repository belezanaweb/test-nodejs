export namespace NsDbInsertWarehouse {
  export type Input = {
    locality: string
    type: 'PHYSICAL_STORE' | 'ECOMMERCE'
  }
}

export interface IDbInsertWarehouse {
  insert: (params: NsDbInsertWarehouse.Input) => Promise<void>
}
