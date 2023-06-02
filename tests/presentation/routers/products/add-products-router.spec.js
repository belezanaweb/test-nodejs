const { AddProductsRouter } = require('../../../../src/presentation/routers/products')
const { MissingDependenceError, DependenceNotFoundError, MissingParamError } = require('../../../../src/utils/errors')
const faker = require('faker')

const AddProductsUseCaseSpy = () => {
  const handle = async (product) => {
    if (!product.name) throw new MissingParamError('name')
    return {
      sku: faker.datatype.number(),
      ...product
    }
  }

  return {
    handle
  }
}

const AddProductsUseCaseSpyError = () => {
  const handle = async (tool) => {
    throw new Error('mock')
  }
  return {
    handle
  }
}

const makeSut = () => {
  const addProductsUseCase = AddProductsUseCaseSpy()
  const sut = new AddProductsRouter({ addProductsUseCase })

  return {
    addProductsUseCase,
    sut
  }
}

describe('Add Products Router', () => {
  test('Should return 201 with correct params', async () => {
    const body = {
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        warehouses: [
          {
            locality: 'SP',
            quantity: 12,
            type: 'ECOMMERCE'
          },
          {
            locality: 'MOEMA',
            quantity: 3,
            type: 'PHYSICAL_STORE'
          }
        ]
      }
    }
    const { sut } = makeSut()
    const httpRequest = { body }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body.sku).toBeTruthy()
    expect(httpResponse.body.name).toBe(httpRequest.body.name)
    expect(httpResponse.body.inventory).toBe(httpRequest.body.inventory)
    expect(httpResponse.body.inventory.warehouses).toBe(httpRequest.body.inventory.warehouses)
  })

  test('Should return 500 when no dependencies is provided throws', async () => {
    expect(() => new AddProductsRouter({ })).toThrow(new DependenceNotFoundError())
  })

  test('Should return 500 when no addProductsUseCase is provided throws', async () => {
    expect(() => new AddProductsRouter({ addProductsUseCase: {} })).toThrow(new MissingDependenceError('addProductsUseCase'))
  })

  test('Should return 500 when addProductsUseCase throws', async () => {
    const body = {}
    const sut = new AddProductsRouter({ addProductsUseCase: AddProductsUseCaseSpyError() })
    const httpRequest = { body }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body.error).toBe(new Error('mock').message)
  })

  test('Should return 400 when MissingParamError throws', async () => {
    const body = {}
    const { sut } = makeSut()
    const httpRequest = { body }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body.error).toBe(new MissingParamError('name').message)
  })
})
