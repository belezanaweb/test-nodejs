import { container } from 'tsyringe';
import '../../../shared/container';
import { mockProduct } from '../../../shared/mocks/product';
import { CreateProductService } from './CreateProductService';
import { DeleteProductService } from './DeleteProductService';

describe('CreateProductService', () => {
  let createProductService: CreateProductService;
  let deleteProductService: DeleteProductService;

  beforeAll(() => {
    createProductService = container.resolve(CreateProductService);
    deleteProductService = container.resolve(DeleteProductService);
  });

  afterAll(async () => {
    await deleteProductService.execute(2);
  });

  it('should be able create a new product', async () => {
    const mockCreate = mockProduct.BODY_REQUEST.product_2;
    const product = await createProductService.execute({ product: mockCreate });
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(2);
  });

  it('should not be able find a product by id', async () => {
    const mockCreate = mockProduct.BODY_REQUEST.product_2;
    try {
      await createProductService.execute({ product: mockCreate });
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(400);
    }
  });
});
