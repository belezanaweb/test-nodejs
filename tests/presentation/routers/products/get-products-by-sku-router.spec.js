const { GetProductsBySkuRouter } = require('../../../../src/presentation/routers/products')
const { DependenceNotFoundError, MissingDependenceError } = require('../../../../src/utils/errors')
const faker = require('faker')

const GetProductsBySkuUseCaseSpy = () => {
  const handle = async () => {
    return {
      sku: faker.datatype.number()
    }
  }

  return {
    handle
  }
}

const GetProductsBySkuUseCaseSpyError = () => {
  const handle = async (_) => {
    throw new Error('mock')
  }
  return {
    handle
  }
}

const makeSut = () => {
  const getProductsBySkuUseCase = GetProductsBySkuUseCaseSpy()
  const sut = new GetProductsBySkuRouter({ getProductsBySkuUseCase })

  return {
    getProductsBySkuUseCase,
    sut
  }
}

describe('Get Products By Sku Router', () => {
  test('Should return 200 with params', async () => {
    const params = {
      sku: faker.datatype.number()
    }
    const { sut } = makeSut()
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.sku).toBeTruthy()
  })

  test('Should return 500 when no dependencies is provided throws', async () => {
    expect(() => new GetProductsBySkuRouter({})).toThrow(new DependenceNotFoundError())
  })

  test('Should return 500 when getProductsBySkuUseCase throws', async () => {
    const params = {}
    const sut = new GetProductsBySkuRouter({ getProductsBySkuUseCase: GetProductsBySkuUseCaseSpyError() })
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new Error('mock').message)
  })

  test('Should return 500 when no has getProductsBySkuUseCase', async () => {
    expect(() => new GetProductsBySkuRouter({ getProductsBySkuUseCase: {} })).toThrow(new MissingDependenceError('getProductsBySkuUseCase'))
  })
})
