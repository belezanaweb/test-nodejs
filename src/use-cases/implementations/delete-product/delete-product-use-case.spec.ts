import { ProductNotFoundError } from '../../../domain/errors/product-not-found'
import { ProductModel } from '../../../domain/models/product'
import { IDeleteProductBySkuUseCase } from '../../../domain/use-cases/delete-product-by-sku'
import { IDeleteProductRepository } from '../../../repositories/delete-product'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { DeleteProductBySkuUseCase } from './delete-product-use-case'

const makeFindProductBySkuRepository = (): IFindProductBySkuRepository => {
  class FindProductBySkuRepositoryStub implements IFindProductBySkuRepository {
    async findBySku (sku: number): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }
  return new FindProductBySkuRepositoryStub()
}

const makeDeleteProductBySkuRepository = (): IDeleteProductRepository => {
  class DeleteProductBySkuRepositoryStub implements IDeleteProductRepository {
    async delete (sku: number): Promise<void> {}
  }
  return new DeleteProductBySkuRepositoryStub()
}

const makeFakeProduct = (): ProductModel => ({
  sku: 1,
  name: 'any_name',
  inventory: {
    quantity: 1,
    warehouses: [
      {
        locality: 'any_locality',
        quantity: 1,
        type: 'any_type'
      }
    ]
  },
  isMarketable: true
})

type SutTypes = {
  sut: IDeleteProductBySkuUseCase
  findProductBySkuRepositoryStub: IFindProductBySkuRepository
  deleteProductBySkuRepositoryStub: IDeleteProductRepository
}
const makeSut = (): SutTypes => {
  const findProductBySkuRepositoryStub = makeFindProductBySkuRepository()
  const deleteProductBySkuRepositoryStub = makeDeleteProductBySkuRepository()
  const sut = new DeleteProductBySkuUseCase(findProductBySkuRepositoryStub, deleteProductBySkuRepositoryStub)
  return { sut, findProductBySkuRepositoryStub, deleteProductBySkuRepositoryStub }
}

describe('DeleteProduct UseCase', () => {
  test('should be able to delete a product', async () => {
    const { sut } = makeSut()
    const sku = 1
    const response = await sut.execute(sku)

    expect(response.isRight()).toBeTruthy()
  })

  test('should return left if product does not exists', async () => {
    const { sut, findProductBySkuRepositoryStub } = makeSut()
    jest.spyOn(findProductBySkuRepositoryStub, 'findBySku').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))
    const sku = 1
    const response = await sut.execute(sku)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new ProductNotFoundError())
  })
})
