import { IDeleteProductById } from '@/domain/protocols/delete-product-protocol'
import { DeleteProductByIdController } from '@/presentation/controllers/delete-product-by-id-controller'
import { badRequest } from '@/presentation/http/http-status'
import { IHttpRequest, IValidation } from '@/presentation/protocols'
import { datatype } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: DeleteProductByIdController
  validationStub: MockProxy<IValidation>
  deleteProductByIdStub: MockProxy<IDeleteProductById>
}

const makeSut = (): ISutTypes => {
  const validationStub = mock<IValidation>()
  validationStub.validate.mockReturnValue(undefined)

  const deleteProductByIdStub = mock<IDeleteProductById>()
  deleteProductByIdStub.deleteById.mockResolvedValue(undefined)

  const sut = new DeleteProductByIdController(validationStub, deleteProductByIdStub)
  return { sut, validationStub, deleteProductByIdStub }
}

const makeFakeHttpRequest = (): IHttpRequest => ({
  pathParams: { productId: datatype.number() },
  queryParams: undefined,
  body: undefined
})

describe('DeleteProductByIdController', () => {
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

  test('Deve chamar o "deleteProductById.deleteById()" com os parametros corretos.', async () => {
    const { sut, deleteProductByIdStub } = makeSut()
    await sut.handle(fakeHttpReq)
    expect(deleteProductByIdStub.deleteById).toHaveBeenCalledWith(fakeHttpReq.pathParams.productId)
    expect(deleteProductByIdStub.deleteById).toHaveBeenCalledTimes(1)
  })
})
