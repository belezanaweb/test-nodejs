import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductDTO } from '../../../domain/use-cases/add-product'
import { FindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { AddProductUseCase } from './add-product-use-case'

const makeFindProductBySkuRepository = (): FindProductBySkuRepository => {
  class FindProductBySkuRepositoryStub implements FindProductBySkuRepository {
    async findBySku (sku: number): Promise<ProductModel> {
      return new Promise(resolve => resolve({} as ProductModel))
    }
  }
  return new FindProductBySkuRepositoryStub()
}

const makeFakeAddProductRequest = (): AddProductDTO => ({
  sku: 1,
  name: 'any_name',
  warehouses: [
    {
      locality: 'any_locality',
      quantity: 1,
      type: 'any_type'
    }
  ]
})

type SutTypes = {
  sut: AddProduct
  findProductBySkuRepositoryStub: FindProductBySkuRepository
}
const makeSut = (): SutTypes => {
  const findProductBySkuRepositoryStub = makeFindProductBySkuRepository()
  const sut = new AddProductUseCase(findProductBySkuRepositoryStub)
  return { sut, findProductBySkuRepositoryStub }
}

describe('AddProduct UseCase', () => {
  test('should call findProductBysku with correct param', async () => {
    const { sut, findProductBySkuRepositoryStub } = makeSut()
    const findBySkuSpy = jest.spyOn(findProductBySkuRepositoryStub, 'findBySku')
    await sut.execute(makeFakeAddProductRequest())

    expect(findBySkuSpy).toHaveBeenCalledWith(1)
  })
})
