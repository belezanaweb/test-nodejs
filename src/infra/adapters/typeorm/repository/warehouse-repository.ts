import { IDbFindWarehouseById, IDbFindWarehouseByLocality, IDbFindWarehouses } from '@/data/protocols/db-find-warehouse-protocol'
import { IWarehouseModel } from '@/domain/models/warehouse-model'
import { Warehouse } from '@/infra/adapters/typeorm/entities/warehouse'
import { warehouseMapToModel, warehousesMapToModel } from '@/infra/adapters/typeorm/helpers/mappers/warehouse-mapper'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class WarehouseRepository extends TypeORMRepository implements IDbFindWarehouses, IDbFindWarehouseById, IDbFindWarehouseByLocality {
  private getWarehouseRepo (): Repository<Warehouse> {
    return this.getRepository(Warehouse)
  }

  async findAll (): Promise<IWarehouseModel[] | undefined> {
    const warehouses = await this.getWarehouseRepo().find()
    return warehouses ? warehousesMapToModel(warehouses) : undefined
  }

  async findById (warehouseId: number): Promise<IWarehouseModel | undefined> {
    const warehouse = await this.getWarehouseRepo().findOne({ warehouseCode: warehouseId })
    return warehouse ? warehouseMapToModel(warehouse) : undefined
  }

  async findByLocality (locality: string): Promise<IWarehouseModel | undefined> {
    const warehouse = await this.getWarehouseRepo().findOne({ locality: locality })
    return warehouse ? warehouseMapToModel(warehouse) : undefined
  }
}
