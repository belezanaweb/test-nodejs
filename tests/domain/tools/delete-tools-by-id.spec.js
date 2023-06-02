const { DeleteProductsBySkuUsecase } = require('../../../src/domain/products')
const { ProductsRepository } = require('../../../src/infra/db/memory')
const { MissingDependenceError, MissingParamError } = require('../../../src/utils/errors')

const createDependencies = () => {
  ProductsRepository.deleteBySku = jest.fn(() => true)
  return ProductsRepository
}

const makeSut = () => {
  const productsRepository = createDependencies()
  return {
    sut: new DeleteProductsBySkuUsecase({ productsRepository }),
    productsRepositorySpy: productsRepository
  }
}

describe('Delete Products By Sku UseCase', () => {
  test('Should throws if invalid dependencies are provided', async () => {
    const invalid = {}
    expect(() => new DeleteProductsBySkuUsecase(invalid)).toThrow(new MissingDependenceError('productsRepository'))
  })

  test('Should throws if sku is not provided', async () => {
    const { sut } = makeSut()
    expect(sut.handle()).rejects.toThrow(new MissingParamError('sku'))
  })

  test('Should delete a products with correct sku params', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    const product = await sut.handle(1)

    expect(productsRepositorySpy.deleteBySku).toHaveBeenCalledWith(1)
    expect(product).toBe(undefined)
  })
})
