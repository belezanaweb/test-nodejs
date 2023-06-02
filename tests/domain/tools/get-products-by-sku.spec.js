const { GetProductsBySkuUsecase } = require('../../../src/domain/products')
const { ProductsRepository } = require('../../../src/infra/db/memory')
const { MissingDependenceError, NotFoundError } = require('../../../src/utils/errors')

const { mockGetProductsBySku } = require('./mocks')

const createDependencies = () => {
  ProductsRepository.getBySku = jest.fn().mockReturnValue(mockGetProductsBySku)
  return ProductsRepository
}

const makeSut = () => {
  const productsRepository = createDependencies()
  return {
    sut: new GetProductsBySkuUsecase({ productsRepository }),
    productsRepositorySpy: productsRepository
  }
}
describe('Get Products By Sku UseCase', () => {
  test('Should throws if invalid dependencies are provided', async () => {
    const invalid = {}
    expect(() => new GetProductsBySkuUsecase(invalid)).toThrow(new MissingDependenceError('productsRepository'))
  })

  test('Should return a product', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    const product = await sut.handle(43264)

    expect(productsRepositorySpy.getBySku).toHaveBeenCalled()
    expect(product).toBeTruthy()
    expect(product).toEqual({
      ...mockGetProductsBySku,
      inventory: {
        quantity: 15,
        ...mockGetProductsBySku.inventory
      },
      isMarketable: true
    })
  })

  test('Should return a empty product', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    productsRepositorySpy.getBySku = jest.fn().mockReturnValue(undefined)

    expect(sut.handle(1)).rejects.toThrow(new NotFoundError())
    expect(productsRepositorySpy.getBySku).toHaveBeenCalled()
  })
})
