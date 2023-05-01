import GetOneProductControllerFactory from '../../../../../src/infrastructure/factories/controller/GetOneProductControllerFactory';
import GetOneProductController from '../../../../../src/application/v1/controller/GetOneProductController';
import ProductServiceMock from '../../../../mocks/ProductServiceMock';

describe('GetOneProductControllerFactory', () => {
  it('should make the get one product controller #unit', async () => {
    const controller = await GetOneProductControllerFactory.make(new ProductServiceMock());

    expect(controller).toBeInstanceOf(GetOneProductController);
    expect(controller).toHaveProperty('handler');
    expect(controller).toHaveProperty('method');
    expect(controller).toHaveProperty('path');
  });
});
