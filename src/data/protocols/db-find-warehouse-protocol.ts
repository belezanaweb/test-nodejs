import { IWarehouseModel } from '@/domain/models/warehouse-model'

export interface IDbFindWarehouses {
  findAll: () => Promise<IWarehouseModel[] | undefined>
}

export interface IDbFindWarehouseById {
  findById: (warehouseId: number) => Promise<IWarehouseModel | undefined>
}

export interface IDbFindWarehouseByLocality {
  findByLocality: (locality: string) => Promise<IWarehouseModel | undefined>
}
