import { Either, right } from '../../../core/either'
import { ProductAlreadyExistsError } from '../../../domain/errors/product-already-exists'
import { AddProduct, AddProductDTO, CreatedProduct } from '../../../domain/use-cases/add-product'
import { AddProductController } from './add-product-controller'

describe('AddProduct Controller', () => {
  test('should call AddProductUseCase with correct params', async () => {
    class AddProductUseCaseStub implements AddProduct {
      async execute ({ sku, name, warehouses }: AddProductDTO): Promise<Either<ProductAlreadyExistsError, CreatedProduct>> {
        return new Promise(resolve => resolve(right({} as CreatedProduct)))
      }
    }
    const addProductUseCaseStub = new AddProductUseCaseStub()
    const sut = new AddProductController(addProductUseCaseStub)
    const executeSpy = jest.spyOn(addProductUseCaseStub, 'execute')
    await sut.handle({
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

    expect(executeSpy).toHaveBeenCalledWith({
      sku: 1,
      name: 'any_name',
      warehouses: [{
        locality: 'ANY_LOCALITY',
        quantity: 1,
        type: 'ANY_TYPE'
      }]
    })
  })
})
