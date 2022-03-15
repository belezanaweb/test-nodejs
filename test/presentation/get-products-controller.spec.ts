import { IFindProducts } from '@/domain/protocols/find-product-protocol'
import { GetProductsController } from '@/presentation/controllers/get-products-controller'
import { IHttpRequest } from '@/presentation/protocols'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { datatype, random } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: GetProductsController
  findProductsStub: MockProxy<IFindProducts>
}

const makeSut = (): ISutTypes => {
  const findProductsStub = mock<IFindProducts>()
  findProductsStub.findAll.mockResolvedValue(random.arrayElements([makeFakeProductModel()], datatype.number({ min: 1, max: 3 })))

  const sut = new GetProductsController(findProductsStub)
  return { sut, findProductsStub }
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  pathParams: undefined,
  queryParams: undefined,
  body: undefined
})

describe('GetProductsController', () => {
  let fakeHttpReq: IHttpRequest
  beforeEach(() => {
    fakeHttpReq = makeFakeHttpRequest()
  })

  test('Deve chamar o "findProducts.findAll()" com os parametros corretos.', async () => {
    const { sut, findProductsStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(findProductsStub.findAll).toHaveBeenCalledWith()
    expect(findProductsStub.findAll).toHaveBeenCalledTimes(1)
  })
})
