import { ProductRepository } from '../../../../src/domain/repositories/ProductRepository';
import { createdProductMock, productToCreateMock, productToGetMock } from '../../../mocks/ProductMocks';
import { prismaMock } from '../../../mocks/PrismaMock';


describe('ProductRepository', () => {
  it('should create a product #unit', async () => {
    prismaMock.product.create.mockResolvedValue(createdProductMock)

    const instance = new ProductRepository(prismaMock);
    await instance.create(productToCreateMock.name, productToCreateMock.sku)

    expect(prismaMock.product.create).toHaveBeenCalled();
  });

  it('should get a product #unit', async () => {
    prismaMock.product.findUnique.mockResolvedValue(productToGetMock)

    const instance = new ProductRepository(prismaMock);
    await instance.getBySku(productToGetMock.sku)

    expect(prismaMock.product.findUnique).toHaveBeenCalled();
  });
});
