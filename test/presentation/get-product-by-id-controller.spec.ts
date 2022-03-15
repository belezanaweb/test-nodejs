import { IFindProductById } from '@/domain/protocols/find-product-protocol'
import { GetProductByIdController } from '@/presentation/controllers/get-product-by-id-controller'
import { badRequest } from '@/presentation/http/http-status'
import { IHttpRequest, IValidation } from '@/presentation/protocols'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { datatype } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: GetProductByIdController
  validationStub: MockProxy<IValidation>
  findProductByIdStub: MockProxy<IFindProductById>
}

const makeSut = (): ISutTypes => {
  const validationStub = mock<IValidation>()
  validationStub.validate.mockReturnValue(undefined)

  const findProductByIdStub = mock<IFindProductById>()
  findProductByIdStub.findById.mockResolvedValue(makeFakeProductModel())

  const sut = new GetProductByIdController(validationStub, findProductByIdStub)
  return { sut, validationStub, findProductByIdStub }
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  pathParams: { productId: datatype.number() },
  queryParams: undefined,
  body: undefined
})

describe('GetProductByIdController', () => {
  let fakeHttpReq: IHttpRequest
  beforeEach(() => {
    fakeHttpReq = makeFakeHttpRequest()
  })

  test('Deve chamar o "validation.validate()" com os parametros corretos.', async () => {
    const { sut, validationStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(validationStub.validate).toHaveBeenCalledWith(fakeHttpReq.pathParams)
    expect(validationStub.validate).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar 400-badRequest caso o "validation.validate()" retorne algum erro.', async () => {
    const { sut, validationStub } = makeSut()
    validationStub.validate.mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(fakeHttpReq)
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })

  test('Deve chamar o "findProductById.findById()" com os parametros corretos.', async () => {
    const { sut, findProductByIdStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(findProductByIdStub.findById).toHaveBeenCalledWith(fakeHttpReq.pathParams.productId)
    expect(findProductByIdStub.findById).toHaveBeenCalledTimes(1)
  })
})
