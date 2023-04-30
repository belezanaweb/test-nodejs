import ProductRepositoryInMemory from '../../../src/infrastructure/data_access/productInMemory.dataAccess';
import Product from '../../../src/domain/entities/product.entity';

describe('ProductRepositoryInMemory', () => {
  let productRepositoryInMemory: ProductRepositoryInMemory;

  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
  });

  test('should create a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productRepositoryInMemory.createProduct(product);
    const storedProduct = await productRepositoryInMemory.getProduct(1);

    await expect(storedProduct).toEqual(product);
  });

  test('should update a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productRepositoryInMemory.createProduct(product);

    const updatedProduct = new Product(1, 'Updated Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productRepositoryInMemory.updateProduct(1, updatedProduct);
    const storedProduct = await productRepositoryInMemory.getProduct(1);

    expect(storedProduct).toEqual(updatedProduct);
  });

  test('should delete a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productRepositoryInMemory.createProduct(product);
    await productRepositoryInMemory.deleteProduct(1);

    const storedProduct = await productRepositoryInMemory.getProduct(1);
    expect(storedProduct).toBeUndefined();
  });

  test('should find a product by SKU', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productRepositoryInMemory.createProduct(product);
    const storedProduct = await productRepositoryInMemory.getProduct(1);

    expect(storedProduct).toEqual(product);
  });

  test('should throw an error when updating a non-existing product', async () => {
    const updatedProduct = new Product(999, 'Updated Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 8, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 4, type: 'PHYSICAL_STORE' },
      ],
    });

    await expect(productRepositoryInMemory.updateProduct(999, updatedProduct)).rejects.toThrow(
      'Product not found.',
    );
  });

  test('should throw an error when deleting a non-existing product', async () => {
    await expect(productRepositoryInMemory.deleteProduct(0)).rejects.toThrow('Product not found.');
  });
});
