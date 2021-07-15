import { Either, left, right } from '../../../core/either'
import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { ProductModel } from '../../../domain/models/product'
import { EditProductDTO, IEditProductUseCase } from '../../../domain/use-cases/edit-product'
import { InvalidParamError, MissingParamError } from '../../../presentation/errors'
import { badRequest, notFound, ok, serverError } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest } from '../../../presentation/protocols'
import { EditProductController } from './edit-product-controller'

const makeEditProductUseCase = (): IEditProductUseCase => {
  class EditProductUseCaseStub implements IEditProductUseCase {
    async execute ({ sku, name, warehouses }: EditProductDTO): Promise<Either<ProductNotFoundError, ProductModel>> {
      return new Promise(resolve => resolve(right(makeFakeEditedProduct())))
    }
  }
  return new EditProductUseCaseStub()
}

const makeFakeEditedProduct = (): ProductModel => ({
  sku: 1,
  name: 'new_name',
  inventory: {
    warehouses: [
      {
        locality: 'NEW_LOCALITY',
        quantity: 1,
        type: 'NEW_TYPE'
      }
    ]
  }
})

const makeFakeSutRequest = (): IHttpRequest => ({
  params: {
    sku: 1
  },
  body: {
    name: 'any_name',
    inventory: {
      warehouses: [{
        locality: 'any_locality',
        quantity: 1,
        type: 'any_type'
      }]
    }
  }
})

type SutTypes = {
  editProductUseCaseStub: IEditProductUseCase
  sut: IController
}
const makeSut = (): SutTypes => {
  const editProductUseCaseStub = makeEditProductUseCase()
  const sut = new EditProductController(editProductUseCaseStub)

  return {
    editProductUseCaseStub,
    sut
  }
}

describe('EditProduct Controller', () => {
  test('should return badRequest if any of requiredParams is not provided', async () => {
    const { sut } = makeSut()

    const missingName = await sut.handle({
      ...makeFakeSutRequest(),
      body: {
        sku: 'any_sku',
        inventory: {}
      }
    })

    expect(missingName).toEqual(
      badRequest(new MissingParamError('name'))
    )
  })

  test('should return badRequest if warehouse is missing or empty', async () => {
    const { sut } = makeSut()

    const emptyWarehouses = await sut.handle({
      body: {
        ...makeFakeSutRequest().body,
        inventory: {
          warehouses: []
        }
      }
    })

    const missingWarehouses = await sut.handle({
      body: {
        ...makeFakeSutRequest().body,
        inventory: {}
      }
    })

    expect(emptyWarehouses).toEqual(badRequest(new MissingParamError('warehouse')))
    expect(missingWarehouses).toEqual(badRequest(new MissingParamError('warehouse')))
  })

  test('should return badRequest if warehouse is invalid', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        ...makeFakeSutRequest().body,
        inventory: {
          warehouses: [
            {
              quantity: 1
            }
          ]
        }
      }
    })

    expect(response).toEqual(badRequest(new InvalidParamError('warehouse', 'warehouse')))
  })

  test('should return badRequest if quantity is not a number', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      body: {
        ...makeFakeSutRequest().body,
        inventory: {
          warehouses: [
            {
              locality: 'any_locality',
              quantity: 'not a number',
              type: 'any_type'
            }
          ]
        }
      }
    })

    expect(response).toEqual(badRequest(new InvalidParamError('quantity', 'number')))
  })

  test('should return 404 if editProductUseCase returns left', async () => {
    const { sut, editProductUseCaseStub } = makeSut()
    jest.spyOn(editProductUseCaseStub, 'execute').mockReturnValueOnce(new Promise(resolve => resolve(left(new ProductNotFoundError()))))
    const response = await sut.handle({
      ...makeFakeSutRequest()
    })

    expect(response).toEqual(
      notFound(new ProductNotFoundError())
    )
  })

  test('should return 500 if editProductUseCase throws', async () => {
    const { sut, editProductUseCaseStub } = makeSut()
    jest.spyOn(editProductUseCaseStub, 'execute').mockReturnValueOnce(new Promise((resolve,reject) => reject(new Error())))
    const response = await sut.handle({
      ...makeFakeSutRequest()
    })

    expect(response).toEqual(
      serverError('internal')
    )
  })

  test('should return 200 with edit product on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      ...makeFakeSutRequest()
    })

    expect(response).toEqual(
      ok(makeFakeEditedProduct())
    )
  })
})
