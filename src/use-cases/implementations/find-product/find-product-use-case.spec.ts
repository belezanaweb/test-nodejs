import { ProductModel } from '../../../domain/models/product'
import { IFindProductBySkuUseCase } from '../../../domain/use-cases/find-product-by-sku'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { FindProductBySkuUseCase } from './find-product-use-case'

const makeFindProductBySkuRepository = (): IFindProductBySkuRepository => {
  class FindProductBySkuRepositoryStub implements IFindProductBySkuRepository {
    async findBySku (sku: number): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeProduct()))
    }
  }
  return new FindProductBySkuRepositoryStub()
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
  sut: IFindProductBySkuUseCase
  findProductBySkuRepositoryStub: IFindProductBySkuRepository
}
const makeSut = (): SutTypes => {
  const findProductBySkuRepositoryStub = makeFindProductBySkuRepository()
  const sut = new FindProductBySkuUseCase(findProductBySkuRepositoryStub)
  return { sut, findProductBySkuRepositoryStub }
}

describe('FindProduct UseCase', () => {
  test('should be able to return a product by sku', async () => {
    const { sut } = makeSut()
    const sku = 1
    const response = await sut.execute(sku)

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(makeFakeProduct())
  })
})
