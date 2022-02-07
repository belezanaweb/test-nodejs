export namespace NsDbInsertProduct {
  export type Input = {
    productCode: number
    name: string
  }
}

export interface IDbInsertProduct {
  insert: (params: NsDbInsertProduct.Input) => Promise<void>
}
