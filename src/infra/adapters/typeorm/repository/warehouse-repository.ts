import { IDbFindWarehouseById, IDbFindWarehouseByLocality, IDbFindWarehouses } from '@/data/protocols/db-find-warehouse-protocol'
import { IWarehouseModel } from '@/domain/models/warehouse-model'
import { Warehouse } from '@/infra/adapters/typeorm/entities/warehouse'
import { Repository } from 'typeorm'
import { TypeORMRepository } from './typeorm-repository'

export class WarehouseRepository extends TypeORMRepository implements IDbFindWarehouses, IDbFindWarehouseById, IDbFindWarehouseByLocality {
  private getWarehouseRepo (): Repository<Warehouse> {
    return this.getRepository(Warehouse)
  }

  async findAll (): Promise<IWarehouseModel[] | undefined> {
    const warehouses = await this.getWarehouseRepo().find()
    console.log(warehouses)
    return []
  }

  async findById (warehouseId: number): Promise<IWarehouseModel | undefined> {
    const warehouse = await this.getWarehouseRepo().findOne({ warehouseCode: warehouseId })
    console.log(warehouse)
    return undefined
  }

  async findByLocality (locality: string): Promise<IWarehouseModel | undefined> {
    const warehouse = await this.getWarehouseRepo().findOne({ locality: locality })
    console.log(warehouse)
    return undefined
  }
}
