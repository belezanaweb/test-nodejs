import UpdateProductControllerFactory from '../../../../../src/infrastructure/factories/controller/UpdateProductControllerFactory';
import UpdateProductController from '../../../../../src/application/v1/controller/UpdateProductController';
import ProductServiceMock from '../../../../mocks/ProductServiceMock';

describe('UpdateProductControllerFactory', () => {
  it('should make the create product controller #unit', async () => {
    const controller = await UpdateProductControllerFactory.make(new ProductServiceMock());

    expect(controller).toBeInstanceOf(UpdateProductController);
    expect(controller).toHaveProperty('handler');
    expect(controller).toHaveProperty('method');
    expect(controller).toHaveProperty('path');
  });
});
