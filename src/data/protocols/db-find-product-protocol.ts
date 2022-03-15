export namespace NsDbFindProduct {
  export type FindAllOutput = string[] | undefined
  export type FindByIdOutput = string | undefined
}

export interface IDbFindProducts {
  findAll: () => Promise<NsDbFindProduct.FindAllOutput>
}

export interface IDbFindProductById {
  findById: (sku: number) => Promise<NsDbFindProduct.FindByIdOutput>
}
