import Product from '../../src/domain/entities/product.entity';

describe('Product', () => {
  test('should calculate inventory quantity correctly', () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });
    expect(product.getQuantity()).toBe(15);
  });

  test('should calculate marketable correctly', () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 0, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 0, type: 'PHYSICAL_STORE' },
      ],
    });
    expect(product.getIsMarketable()).toBeFalsy();

    const product2 = new Product(2, 'Test Product 2', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });
    expect(product2.getIsMarketable()).toBeTruthy();
  });
});
