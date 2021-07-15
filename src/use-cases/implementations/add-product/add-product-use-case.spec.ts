import { left } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { ProductModel } from '../../../domain/models/product'
import { AddProduct, AddProductDTO } from '../../../domain/use-cases/add-product'
import { CreateProductDTO, ICreateProductRepository } from '../../../repositories/create-product'
import { FindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { AddProductUseCase } from './add-product-use-case'

const makeFindProductBySkuRepository = (): FindProductBySkuRepository => {
  class FindProductBySkuRepositoryStub implements FindProductBySkuRepository {
    async findBySku (sku: number): Promise<ProductModel> {
      return new Promise(resolve => resolve(undefined))
    }
  }
  return new FindProductBySkuRepositoryStub()
}

const makeCreateProductRepository = (): ICreateProductRepository => {
  class CreateProductRepositoryStub implements ICreateProductRepository {
    async create (productDTO: CreateProductDTO): Promise<void> {
    }
  }
  return new CreateProductRepositoryStub()
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

const makeFakeCreateProductDTO = (): CreateProductDTO => ({
  sku: 1,
  name: 'any_name',
  inventory: {
    warehouses: [
      {
        locality: 'any_locality',
        quantity: 1,
        type: 'any_type'
      }
    ]
  }
})

type SutTypes = {
  sut: AddProduct
  createProductRepository: ICreateProductRepository
  findProductBySkuRepositoryStub: FindProductBySkuRepository
}
const makeSut = (): SutTypes => {
  const findProductBySkuRepositoryStub = makeFindProductBySkuRepository()
  const createProductRepository = makeCreateProductRepository()
  const sut = new AddProductUseCase(findProductBySkuRepositoryStub, createProductRepository)
  return { sut, findProductBySkuRepositoryStub, createProductRepository }
}

describe('AddProduct UseCase', () => {
  test('should call findProductBysku with correct param', async () => {
    const { sut, findProductBySkuRepositoryStub } = makeSut()
    const findBySkuSpy = jest.spyOn(findProductBySkuRepositoryStub, 'findBySku')
    await sut.execute(makeFakeAddProductRequest())

    expect(findBySkuSpy).toHaveBeenCalledWith(1)
  })

  test('should return left(ProductAlreadyExistsError) if findProductBysku is not undefined', async () => {
    const { sut, findProductBySkuRepositoryStub } = makeSut()
    jest.spyOn(findProductBySkuRepositoryStub, 'findBySku').mockReturnValueOnce(new Promise(resolve => resolve({ sku: 1 } as ProductModel)))
    const response = await sut.execute(makeFakeAddProductRequest())

    expect(response).toEqual(left(new ProductAlreadyExistsError()))
  })

  test('should call CreateProductRepository with correct params', async () => {
    const { sut, createProductRepository } = makeSut()
    const createSpy = jest.spyOn(createProductRepository, 'create')
    await sut.execute(makeFakeAddProductRequest())

    expect(createSpy).toHaveBeenCalledWith(makeFakeCreateProductDTO())
  })
})
