import { container } from 'tsyringe';
import '../../../shared/container';
import { mockProduct } from '../../../shared/mocks/product';
import { UpdateProductService } from './UpdateProductService';
import { CreateProductService } from './CreateProductService';
import { DeleteProductService } from './DeleteProductService';

describe('UpdateProductService', () => {
  let updateProductService: UpdateProductService;
  let createProductService: CreateProductService;
  let deleteProductService: DeleteProductService;

  beforeAll(() => {
    updateProductService = container.resolve(UpdateProductService);
    createProductService = container.resolve(CreateProductService);
    deleteProductService = container.resolve(DeleteProductService);
  });

  afterAll(async () => {
    await deleteProductService.execute(2);
  });

  it('should be able update a product having sku=2', async () => {
    await createProductService.execute({
      product: mockProduct.BODY_REQUEST.product_2,
    });

    const mockUpdate = mockProduct.BODY_REQUEST.product_2;
    mockUpdate.name = 'Creme de barbear spary 300ml';
    const product = await updateProductService.execute({
      sku: 2,
      product: mockUpdate,
    });
    expect(product).toHaveProperty('sku');
    expect(product?.sku).toBe(2);
    expect(product?.name).toBe('Creme de barbear spary 300ml');
  });

  it('should not be able update a product having sku=2', async () => {
    const mockUpdate = mockProduct.BODY_REQUEST.product_2;
    const sku = 1500;
    try {
      await updateProductService.execute({ sku, product: mockUpdate });
    } catch (err: any) {
      expect(err).toHaveProperty('code');
      expect(err).toHaveProperty('message');
      expect(err).toHaveProperty('statusCode');
      expect(err?.statusCode).toBe(400);
    }
  });

  it("should not be able update because hasn't a sku", async () => {
    try {
      const mockUpdate = mockProduct.BODY_REQUEST.product_2;
      // eslint-disable-next-line
      // @ts-ignore
      await updateProductService.execute({ product: mockUpdate });
    } catch (err: any) {
      const expec_error = JSON.parse(JSON.stringify(err));
      expect(expec_error).toHaveProperty('code');
      expect(expec_error).toHaveProperty('message');
      expect(expec_error).toHaveProperty('statusCode');
      expect(expec_error?.statusCode).toBe(400);
    }
  });
});
