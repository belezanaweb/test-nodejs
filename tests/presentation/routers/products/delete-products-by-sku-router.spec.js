const { DeleteProductsBySkuRouter } = require('../../../../src/presentation/routers/products')
const { MissingDependenceError, DependenceNotFoundError, MissingParamError } = require('../../../../src/utils/errors')
const faker = require('faker')

const DeleteProductsBySkuUseCaseSpy = () => {
  const handle = async (sku) => {
    if (!sku) throw new MissingParamError('sku')
    return true
  }

  return {
    handle
  }
}

const DeleteProductsBySkuUseCaseSpyError = () => {
  const handle = async (_) => {
    throw new Error('mock')
  }
  return {
    handle
  }
}

const makeSut = () => {
  const deleteProductsBySkuUseCase = DeleteProductsBySkuUseCaseSpy()
  const sut = new DeleteProductsBySkuRouter({ deleteProductsBySkuUseCase })

  return {
    deleteProductsBySkuUseCase,
    sut
  }
}

describe('Delete Products By Sku Router', () => {
  test('Should return 204 with correct params', async () => {
    const params = {
      sku: faker.datatype.number()
    }
    const { sut } = makeSut()
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
    expect(httpResponse.body).toBeFalsy()
  })

  test('Should return 204 when not found sku', async () => {
    const params = {
      sku: faker.datatype.number()
    }
    const { sut, deleteProductsBySkuUseCase } = makeSut()
    deleteProductsBySkuUseCase.handle = () => Promise.resolve(false)
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
  })

  test('Should return 500 when no dependencies is provided throws', async () => {
    expect(() => new DeleteProductsBySkuRouter({ })).toThrow(new DependenceNotFoundError())
  })

  test('Should return 500 when deleteProductsBySkuUseCase throws', async () => {
    const params = {}
    const sut = new DeleteProductsBySkuRouter({ deleteProductsBySkuUseCase: DeleteProductsBySkuUseCaseSpyError() })
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new Error('mock').message)
  })

  test('Should return 500 when deleteProductsBySkuUseCase throws', async () => {
    const dependencies = { deleteProductsBySkuUseCase: {} }
    expect(() => new DeleteProductsBySkuRouter(dependencies)).toThrow(new MissingDependenceError('deleteProductsBySkuUseCase'))
  })

  test('Should return 400 when MissingParamError throws', async () => {
    const params = {}
    const { sut } = makeSut()
    const httpRequest = { params }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('sku').message)
  })
})
