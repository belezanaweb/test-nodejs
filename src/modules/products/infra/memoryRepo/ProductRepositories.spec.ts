import ProductRepository from './ProductRepositories';
import { mockProduct as mock } from '../../../../shared/mocks/product';

describe('ProductRepositories', () => {
  let productRepo: ProductRepository;

  beforeEach(() => {
    productRepo = new ProductRepository();
  });

  it('should be able find a product by id', async () => {
    const product = await productRepo.find(1);
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(1);
  });

  it('should not be able find a product by id', async () => {
    const product = await productRepo.find(2);
    expect(product).toBeNull();
  });

  it('should be able create a new product', async () => {
    const data = mock.BODY_REQUEST.product_2;
    const product = await productRepo.create(data);
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(2);
  });

  it('should not be able create a new product', async () => {
    const data = mock.BODY_REQUEST.product_2;
    try {
      await productRepo.create(data);
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(400);
    }
  });

  it('should be able update a existing product', async () => {
    const data = mock.BODY_REQUEST.product_2;
    data.name = 'teste de update';
    const sku = 2;
    const product = await productRepo.update(sku, data);
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(2);
    expect(product?.name).toBe('teste de update');
  });

  it('should not be able update a existing product', async () => {
    const data = mock.BODY_REQUEST.product_2;
    data.name = 'teste de update';
    const sku = 1500;
    try {
      await productRepo.update(sku, data);
    } catch (error: any) {
      expect(error).toHaveProperty('code');
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('statusCode');
      expect(error?.statusCode).toBe(400);
    }
  });

  it('should be able delete a existing product', async () => {
    const sku = 2;
    const product = await productRepo.delete(sku);
    expect(product).toBeUndefined();
  });

  it('should not be able delete a existing product', async () => {
    const sku = 1500;
    try {
      await productRepo.delete(sku);
    } catch (error: any) {
      expect(error).toHaveProperty('code');
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('statusCode');
      expect(error?.statusCode).toBe(400);
    }
  });
});
