import { Either, left, right } from '../../../core/either'
import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { IDeleteProductBySkuUseCase } from '../../../domain/use-cases/delete-product-by-sku'
import { noContent, notFound, serverError } from '../../../presentation/helpers/http-helper'
import { IController, IHttpRequest } from '../../../presentation/protocols'
import { DeleteProductController } from './delete-product-controller'

const makeDeleteProductBySkuUseCase = (): IDeleteProductBySkuUseCase => {
  class DeleteProductBySkuUseCaseStub implements IDeleteProductBySkuUseCase {
    async execute (sku: number): Promise<Either<ProductNotFoundError, void>> {
      return new Promise(resolve => resolve(right()))
    }
  }
  return new DeleteProductBySkuUseCaseStub()
}

const makeFakeRequest = (skuParam: number): IHttpRequest => ({
  params: {
    sku: skuParam
  }
})

type SutTypes = {
  deleteProductBySkuUseCaseStub: IDeleteProductBySkuUseCase
  sut: IController
}
const makeSut = (): SutTypes => {
  const deleteProductBySkuUseCaseStub = makeDeleteProductBySkuUseCase()
  const sut = new DeleteProductController(deleteProductBySkuUseCaseStub)

  return {
    deleteProductBySkuUseCaseStub,
    sut
  }
}

describe('DeleteProduct Controller', () => {
  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest(1))

    expect(response).toEqual(
      noContent()
    )
  })

  test('should return 404 if DeleteProductBySkyUseCase return left', async () => {
    const { sut, deleteProductBySkuUseCaseStub } = makeSut()
    jest.spyOn(deleteProductBySkuUseCaseStub, 'execute').mockReturnValueOnce(new Promise(resolve => resolve(left(new ProductNotFoundError()))))
    const response = await sut.handle(makeFakeRequest(1))

    expect(response).toEqual(
      notFound(new ProductNotFoundError())
    )
  })

  test('should return 500 if FindProductBySkyUseCase throws', async () => {
    const { sut, deleteProductBySkuUseCaseStub } = makeSut()
    jest.spyOn(deleteProductBySkuUseCaseStub, 'execute').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(makeFakeRequest(1))

    expect(response).toEqual(
      serverError('internal')
    )
  })
})
