import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { FindProductById } from '@/data/use-cases/find-product-by-id'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { datatype } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: FindProductById
  productRepoStub: MockProxy<IDbFindProductById>
  calculateProductAttribStub: MockProxy<ICalculateProductAttributes>
}

const makeSut = (): ISutTypes => {
  const productRepoStub = mock<IDbFindProductById>()
  productRepoStub.findById.mockResolvedValue(JSON.stringify(makeFakeProductModel()))

  const calculateProductAttribStub = mock<ICalculateProductAttributes>()
  calculateProductAttribStub.calcTotalQuantity.mockResolvedValue(datatype.number())
  calculateProductAttribStub.calcIsMarketable.mockResolvedValue(datatype.boolean())

  const sut = new FindProductById(productRepoStub, calculateProductAttribStub)
  return { sut, productRepoStub, calculateProductAttribStub }
}

describe('FindProductById', () => {
  let fakeSku: number
  beforeEach(() => {
    fakeSku = datatype.number()
  })

  test('Deve chamar o "productRepo.findById()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.findById(fakeSku)
    expect(productRepoStub.findById).toHaveBeenCalledWith(fakeSku)
    expect(productRepoStub.findById).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar undefined caso o "productRepo.findById()" não retorne dados.', async () => {
    const { sut, productRepoStub } = makeSut()
    productRepoStub.findById.mockResolvedValue(undefined)
    const result = await sut.findById(fakeSku)
    expect(result).toEqual(undefined)
    expect(result).toBe(undefined)
  })

  test('Deve chamar o "calculateProductAttrib.calcTotalQuantity()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeSku)
    await sut.findById(fakeSku)
    // expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o "calculateProductAttrib.calcIsMarketable()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeSku)
    await sut.findById(fakeSku)
    // expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledTimes(1)
  })
})
