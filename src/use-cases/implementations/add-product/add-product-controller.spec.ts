import { Either, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { AddProduct, AddProductDTO, CreatedProduct } from '../../../domain/use-cases/add-product'
import { IController } from '../../../presentation/protocols/controller'
import { IHttpRequest } from '../../../presentation/protocols/http'
import { AddProductController } from './add-product-controller'

const makeAddProductUseCase = (): AddProduct => {
  class AddProductUseCaseStub implements AddProduct {
    async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, CreatedProduct>> {
      return new Promise(resolve => resolve(right({} as CreatedProduct)))
    }
  }
  return new AddProductUseCaseStub()
}

const makeFakeSutRequest = (): IHttpRequest => ({
  body: {
    sku: 1,
    name: 'any_name',
    warehouses: [{
      locality: 'any_locality',
      quantity: 1,
      type: 'any_type'
    }]
  }
})

const makeFakeAddProductDTO = (): AddProductDTO => ({
  sku: 1,
  name: 'any_name',
  warehouses: [{
    locality: 'ANY_LOCALITY',
    quantity: 1,
    type: 'ANY_TYPE'
  }]
})

type SutTypes = {
  addProductUseCaseStub: AddProduct
  sut: IController
}
const makeSut = (): SutTypes => {
  const addProductUseCaseStub = makeAddProductUseCase()
  const sut = new AddProductController(addProductUseCaseStub)

  return {
    addProductUseCaseStub,
    sut
  }
}

describe('AddProduct Controller', () => {
  test('should call AddProductUseCase with correct params', async () => {
    const { sut,addProductUseCaseStub } = makeSut()
    const executeSpy = jest.spyOn(addProductUseCaseStub, 'execute')
    await sut.handle(makeFakeSutRequest())

    expect(executeSpy).toHaveBeenCalledWith(makeFakeAddProductDTO())
  })
})
