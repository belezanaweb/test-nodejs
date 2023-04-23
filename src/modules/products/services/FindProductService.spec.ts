import { container } from 'tsyringe';
import '../../../shared/container';
import { FindProductService } from './FindProductService';

describe('FindProductService', () => {
  let findProductService: FindProductService;

  beforeEach(() => {
    findProductService = container.resolve(FindProductService);
  });

  it('should be able find a product by id', async () => {
    const product = await findProductService.execute({ sku: 1 });
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(1);
  });

  it('should be able find a product by id', async () => {
    const product = await findProductService.execute({ sku: 1 });
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(1);
  });

  it('should not be able find a product by id', async () => {
    try {
      await findProductService.execute({ sku: 1500 });
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(404);
    }
  });

  it("should not be able find because hasn't a sku", async () => {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      await findProductService.execute({});
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(400);
    }
  });
});
