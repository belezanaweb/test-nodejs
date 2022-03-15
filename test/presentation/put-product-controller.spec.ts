import { IUpdateProductById } from '@/domain/protocols/update-product-protocol'
import { PutProductController } from '@/presentation/controllers/put-product-controller'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/http/http-status'
import { IHttpRequest, IValidation } from '@/presentation/protocols'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { address, commerce, datatype, random } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: PutProductController
  validationStub: MockProxy<IValidation>
  validationInventoryStub: MockProxy<IValidation>
  validationWarehouseStub: MockProxy<IValidation>
  updateProductByIdStub: MockProxy<IUpdateProductById>
}

const makeSut = (): ISutTypes => {
  const validationStub = mock<IValidation>()
  validationStub.validate.mockReturnValue(undefined)

  const validationInventoryStub = mock<IValidation>()
  validationInventoryStub.validate.mockReturnValue(undefined)

  const validationWarehouseStub = mock<IValidation>()
  validationWarehouseStub.validate.mockReturnValue(undefined)

  const updateProductByIdStub = mock<IUpdateProductById>()
  updateProductByIdStub.updateById.mockResolvedValue(makeFakeProductModel())

  const sut = new PutProductController(validationStub, validationInventoryStub, validationWarehouseStub, updateProductByIdStub)
  return { sut, validationStub, validationInventoryStub, validationWarehouseStub, updateProductByIdStub }
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  pathParams: { productId: datatype.number() },
  queryParams: undefined,
  body: {
    name: commerce.productName(),
    inventory: {
      warehouses: random.arrayElements([
        {
          locality: address.cityName(),
          quantity: datatype.number(),
          type: random.arrayElement(['PHYSICAL_STORE', 'ECOMMERCE'])
        }
      ], datatype.number({ min: 1, max: 3 }))
    }
  }
})

describe('PutProductController', () => {
  let fakeHttpReq: IHttpRequest
  beforeEach(() => {
    fakeHttpReq = makeFakeHttpRequest()
  })

  test('Deve chamar o "validation.validate()" com os parametros corretos.', async () => {
    const { sut, validationStub } = makeSut()
    const toValidate = { ...fakeHttpReq.pathParams, ...fakeHttpReq.body }
    await sut.handle(fakeHttpReq)
    expect(validationStub.validate).toHaveBeenCalledWith(toValidate)
    expect(validationStub.validate).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar 400-badRequest caso o "validation.validate()" retorne algum erro.', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.validate.mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(fakeHttpReq)
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  test('Deve chamar o "validationInventory.validate()" com os parametros corretos.', async () => {
    const { sut, validationInventoryStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(validationInventoryStub.validate).toHaveBeenCalledWith(fakeHttpReq.body.inventory)
    expect(validationInventoryStub.validate).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar 400-badRequest caso o "validationInventory.validate()" retorne algum erro.', async () => {
    const { sut, validationInventoryStub } = makeSut()
    validationInventoryStub.validate.mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(fakeHttpReq)
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  test('Deve retornar 400-badRequest caso o array de "warehouses" no body esteja vazio.', async () => {
    const { sut } = makeSut()
    fakeHttpReq.body.inventory.warehouses = []
    const httpResponse = await sut.handle(fakeHttpReq)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('inventory.warehouses[]')))
  })

  test('Deve chamar o "validationWarehouse.validate()" com os parametros corretos.', async () => {
    const { sut, validationWarehouseStub } = makeSut()
    await sut.handle(fakeHttpReq)
    for (const item of fakeHttpReq.body.inventory.warehouses) {
      expect(validationWarehouseStub.validate).toHaveBeenCalledWith(item)
    }
    expect(validationWarehouseStub.validate).toHaveBeenCalledTimes(fakeHttpReq.body.inventory.warehouses.length)
  })

  test('Deve retornar 400-badRequest caso o "validationWarehouseStub.validate()" retorne algum erro.', async () => {
    const { sut, validationWarehouseStub } = makeSut()
    validationWarehouseStub.validate.mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(fakeHttpReq)
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  test('Deve chamar o "updateProductById.updateById()" com os parametros corretos.', async () => {
    const { sut, updateProductByIdStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(updateProductByIdStub.updateById).toHaveBeenCalledWith({
      sku: fakeHttpReq.pathParams.productId,
      name: fakeHttpReq.body.name,
      inventory: {
        warehouses: fakeHttpReq.body.inventory.warehouses
      }
    })
    expect(updateProductByIdStub.updateById).toHaveBeenCalledTimes(1)
  })
})
