import { IDbDeleteProductById } from '@/data/protocols/db-delete-product-protocol'
import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { DeleteProductById } from '@/data/use-cases/delete-product-by-id'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { datatype } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: DeleteProductById
  productRepoStub: MockProxy<IDbFindProductById & IDbDeleteProductById>
}

const makeSut = (): ISutTypes => {
  const productRepoStub = mock<IDbFindProductById & IDbDeleteProductById>()
  productRepoStub.findById.mockResolvedValue(JSON.stringify(makeFakeProductModel()))
  productRepoStub.deleteById.mockResolvedValue(undefined)

  const sut = new DeleteProductById(productRepoStub)
  return { sut, productRepoStub }
}

describe('DeleteProductById', () => {
  let fakeSku: number
  beforeEach(() => {
    fakeSku = datatype.number()
  })

  test('Deve chamar o "productRepo.findById()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.deleteById(fakeSku)
    expect(productRepoStub.findById).toHaveBeenCalledWith(fakeSku)
    expect(productRepoStub.findById).toHaveBeenCalledTimes(1)
  })

  test('Deve lançar uma exceção com o erro "GenericBussinessError" caso o "productRepo.findById()" não retorne dados.', async () => {
    const { sut, productRepoStub } = makeSut()
    productRepoStub.findById.mockResolvedValueOnce(undefined)
    const promise = sut.deleteById(fakeSku)
    await expect(promise).rejects.toThrow(new GenericBussinessError(`Não foi localizado um Produto com o Código SKU ${fakeSku} na Base de Dados.`))
  })

  test('Deve chamar o "productRepo.deleteById()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.deleteById(fakeSku)
    expect(productRepoStub.deleteById).toHaveBeenCalledWith(fakeSku)
    expect(productRepoStub.deleteById).toHaveBeenCalledTimes(1)
  })
})
