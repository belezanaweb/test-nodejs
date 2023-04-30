import ProductUseCase from '../../../src/application/use_cases/product.useCase';
import IProductDataAccess from '../../../src/domain/data_access/product.dataAccess.interface';
import ProductInMemoryDataAccess from '../../../src/infrastructure/data_access/productInMemory.dataAccess';
import Product from '../../../src/domain/entities/product.entity';

describe('ProductUseCase', () => {
  let productUseCase: ProductUseCase;

  beforeEach(() => {
    const productDataAccess: IProductDataAccess = new ProductInMemoryDataAccess();
    productUseCase = new ProductUseCase(productDataAccess);
  });

  test('should create a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    const createdProduct = await productUseCase.createProduct(product);

    expect(createdProduct).toEqual(product);
  });

  test('should update a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productUseCase.createProduct(product);

    const updatedProduct = new Product(1, 'Updated Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 8, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 3, type: 'PHYSICAL_STORE' },
      ],
    });

    await productUseCase.updateProduct(1, updatedProduct);

    expect(await productUseCase.getProduct(1)).toEqual(updatedProduct);
  });

  test('should get a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productUseCase.createProduct(product);

    const retrievedProduct = await productUseCase.getProduct(1);

    expect(retrievedProduct).toEqual(product);
  });

  test('should delete a product', async () => {
    const product = new Product(1, 'Test Product', {
      warehouses: [
        { locality: 'SP', quantity: 10, type: 'ECOMMERCE' },
        { locality: 'MOEMA', quantity: 5, type: 'PHYSICAL_STORE' },
      ],
    });

    await productUseCase.createProduct(product);

    expect(await productUseCase.getProduct(1)).toEqual(product);

    await productUseCase.deleteProduct(1);

    expect(await productUseCase.getProduct(1)).toBeUndefined();
  });
});
