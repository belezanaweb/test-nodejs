const { AddProductsUsecase } = require('../../../src/domain/products')
const { ProductsRepository } = require('../../../src/infra/db/memory')
const { MissingDependenceError, MissingParamError } = require('../../../src/utils/errors')

const { mockAddProducts } = require('./mocks')

const createDependencies = () => {
  ProductsRepository.add = jest.fn(product => ({ sku: 43264, ...product }))
  return ProductsRepository
}

const makeSut = () => {
  const productsRepository = createDependencies()
  return {
    sut: new AddProductsUsecase({ productsRepository }),
    productsRepositorySpy: productsRepository
  }
}

describe('Add Products UseCase', () => {
  test('Should throws if invalid dependencies are provided', async () => {
    const invalid = {}
    expect(() => new AddProductsUsecase(invalid)).toThrow(new MissingDependenceError('productsRepository'))
  })

  test('Should throws if name is not provided', async () => {
    const { sut } = makeSut()
    expect(sut.handle({})).rejects.toThrow(new MissingParamError('name'))
  })

  test('Should add a new product with correct params', async () => {
    const { sut, productsRepositorySpy } = makeSut()
    const product = await sut.handle(mockAddProducts)
    expect(productsRepositorySpy.add).toHaveBeenCalledWith(mockAddProducts)
    expect(product).toBeTruthy()
    expect(product).toEqual({ ...mockAddProducts })
    expect(Object.keys(product)).toEqual([
      'sku',
      'name',
      'inventory'
    ])
  })
})
