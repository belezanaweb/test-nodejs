import { ProductModel } from '../../../domain/models/product'
import { EditProductDTO, IEditProductUseCase } from '../../../domain/use-cases/edit-product'
import { IFindProductBySkuRepository } from '../../../repositories/find-product-by-sku'
import { IUpdateProductRepository, UpdateProductDTO } from '../../../repositories/update-product'
import { EditProductUseCase } from './edit-product-use-case'

const makeFindProductBySkuRepository = (): IFindProductBySkuRepository => {
  class FindProductBySkuRepositoryStub implements IFindProductBySkuRepository {
    async findBySku (sku: number): Promise<ProductModel> {
      return new Promise(resolve => resolve({
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
      }))
    }
  }
  return new FindProductBySkuRepositoryStub()
}

const makeUpdateProductRepository = (): IUpdateProductRepository => {
  class UpdateProductRepositoryStub implements IUpdateProductRepository {
    async update (productDTO: UpdateProductDTO): Promise<ProductModel> {
      return new Promise(resolve => resolve(makeFakeEditedProduct()))
    }
  }
  return new UpdateProductRepositoryStub()
}

const makeFakeEditProductRequest = (): EditProductDTO => ({
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

const makeFakeEditedProduct = (): ProductModel => ({
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
  sut: IEditProductUseCase
  findProductBySkuRepositoryStub: IFindProductBySkuRepository
  updateProductRepositoryStub: IUpdateProductRepository
}
const makeSut = (): SutTypes => {
  const findProductBySkuRepositoryStub = makeFindProductBySkuRepository()
  const updateProductRepositoryStub = makeUpdateProductRepository()
  const sut = new EditProductUseCase(findProductBySkuRepositoryStub,updateProductRepositoryStub)
  return { sut, findProductBySkuRepositoryStub,updateProductRepositoryStub }
}

describe('EditProduct UseCase', () => {
  test('should be able to edit a product passing valid sku and payload', async () => {
    const { sut } = makeSut()

    const editedProduct = await sut.execute(makeFakeEditProductRequest())

    expect(editedProduct.isRight()).toBeTruthy()
    expect(editedProduct.value).toEqual(makeFakeEditedProduct())
  })
})
