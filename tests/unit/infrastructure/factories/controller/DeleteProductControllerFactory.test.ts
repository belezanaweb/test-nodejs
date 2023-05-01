import DeleteProductControllerFactory from '../../../../../src/infrastructure/factories/controller/DeleteProductControllerFactory';
import DeleteProductController from '../../../../../src/application/v1/controller/DeleteProductController';
import ProductServiceMock from '../../../../mocks/ProductServiceMock';

describe('DeleteProductControllerFactory', () => {
  it('should make the delete product controller #unit', async () => {
    const controller = await DeleteProductControllerFactory.make(new ProductServiceMock());

    expect(controller).toBeInstanceOf(DeleteProductController);
    expect(controller).toHaveProperty('handler');
    expect(controller).toHaveProperty('method');
    expect(controller).toHaveProperty('path');
  });
});
