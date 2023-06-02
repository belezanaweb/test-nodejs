const { UpdateProductsBySkuUsecase } = require('../../../src/domain/products')
const { ProductsRepository } = require('../../../src/infra/db/memory')
const { MissingDependenceError, MissingParamError } = require('../../../src/utils/errors')

const { mockAddProducts } = require('./mocks')

const createDependencies = () => {
  ProductsRepository.updateBySku = jest.fn().mockReturnValue({ ...mockAddProducts, name: 'changed' })
  return ProductsRepository
}

const makeSut = () => {
  const productsRepository = createDependencies()
  return {
    sut: new UpdateProductsBySkuUsecase({ productsRepository }),
    productsRepositorySpy: productsRepository
  }
}

describe('Update Product By Sku UseCase', () => {
  test('Should throws if invalid dependencies are provided', async () => {
    const invalid = {}
    expect(() => new UpdateProductsBySkuUsecase(invalid)).toThrow(new MissingDependenceError('productsRepository'))
  })

  test('Should throws if no sku params is provided', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    const promise = sut.handle()
    expect(promise).rejects.toThrow(new MissingParamError('sku'))
    expect(productsRepositorySpy.updateBySku).not.toHaveBeenCalled()
  })

  test('Should throws if no product params is provided', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    const promise = sut.handle('any_value')
    expect(promise).rejects.toThrow(new MissingParamError('name'))
    expect(productsRepositorySpy.updateBySku).not.toHaveBeenCalled()
  })

  test('Should update a product by sku', async () => {
    const { sut, productsRepositorySpy } = makeSut()

    await sut.handle(43264, mockAddProducts)

    expect(productsRepositorySpy.updateBySku).toHaveBeenCalled()
  })
})
