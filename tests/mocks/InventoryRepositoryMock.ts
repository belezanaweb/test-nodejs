import { IInventoryRepository } from '../../src/domain/repositories/InventoryRepository';

export default class InventoryRepositoryMock implements IInventoryRepository {
  async create(_productId: string): Promise<string> {
    return '';
  }
}
