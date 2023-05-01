import Warehouse from '../../src/domain/entities/Warehouse';
import { IWarehouseRepository } from '../../src/domain/repositories/WarehouseRepository';

export default class WarehouseRepositoryMock implements IWarehouseRepository {
  async create(_warehouses: Warehouse[], _inventoryId: string): Promise<void> {}
}
