import CreateProductControllerFactory from '../../../../../src/infrastructure/factories/controller/CreateProductControllerFactory';
import CreateProductController from '../../../../../src/application/v1/controller/CreateProductController';
import ProductServiceMock from '../../../../mocks/ProductServiceMock';

describe('CreateProductControllerFactory', () => {
  it('should make the create product controller #unit', async () => {
    const controller = await CreateProductControllerFactory.make(new ProductServiceMock());

    expect(controller).toBeInstanceOf(CreateProductController);
    expect(controller).toHaveProperty('handler');
    expect(controller).toHaveProperty('method');
    expect(controller).toHaveProperty('path');
  });
});
