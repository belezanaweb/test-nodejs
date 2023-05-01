import ProductServiceFactory from '../../../../../src/infrastructure/factories/service/ProductServiceFactory';
import { ProductService } from '../../../../../src/service/ProductService';
import ProductRepositoryMock from '../../../../mocks/ProductRepositoryMock';
import InventoryRepositoryMock from '../../../../mocks/InventoryRepositoryMock';
import WarehouseRepositoryMock from '../../../../mocks/WarehouseRepositoryMock';

describe('ProductServiceFactory', () => {
  it('should make the product service #unit', async () => {
    const service = await ProductServiceFactory.make(
      new ProductRepositoryMock(),
      new InventoryRepositoryMock(),
      new WarehouseRepositoryMock(),
    );

    expect(service).toBeInstanceOf(ProductService);
    expect(service).toHaveProperty('getBySku');
    expect(service).toHaveProperty('create');
    expect(service).toHaveProperty('delete');
    expect(service).toHaveProperty('update');
  });
});
