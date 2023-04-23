import { container } from 'tsyringe';
import '../../../shared/container';
import { mockProduct } from '../../../shared/mocks/product';
import { CreateProductService } from './CreateProductService';
import { DeleteProductService } from './DeleteProductService';

describe('DeleteProductService', () => {
  let createProductService: CreateProductService;
  let deleteProductService: DeleteProductService;

  beforeAll(() => {
    createProductService = container.resolve(CreateProductService);
    deleteProductService = container.resolve(DeleteProductService);
  });

  it('should be able delete a product having sku=2', async () => {
    await createProductService.execute({
      product: mockProduct.BODY_REQUEST.product_2,
    });

    const resp = await deleteProductService.execute(2);
    expect(resp).toBeUndefined();
  });

  it('should not be able update a product having sku=2', async () => {
    try {
      await deleteProductService.execute(2);
    } catch (err: any) {
      expect(err).toHaveProperty('code');
      expect(err).toHaveProperty('message');
      expect(err).toHaveProperty('statusCode');
      expect(err?.statusCode).toBe(400);
    }
  });

  it("should not be able delete because hasn't a sku", async () => {
    try {
      // eslint-disable-next-line
      // @ts-ignore
      await deleteProductService.execute();
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(400);
    }
  });
});
