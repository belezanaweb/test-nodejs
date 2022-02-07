import { WarehouseRepository } from '@/infra/adapters/typeorm/repository/warehouse-repository'

const makeWarehouseRepository = (): WarehouseRepository => {
  return new WarehouseRepository()
}

export const warehouseRepository = makeWarehouseRepository()
