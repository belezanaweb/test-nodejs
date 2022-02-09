import { IDbFindProducts } from '@/data/protocols/db-find-product-protocol'
import { FindProducts } from '@/data/use-cases/find-products'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { datatype, random } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: FindProducts
  productRepoStub: MockProxy<IDbFindProducts>
  calculateProductAttribStub: MockProxy<ICalculateProductAttributes>
}

const makeSut = (): ISutTypes => {
  const arrayFakeProductModel = random.arrayElements([makeFakeProductModel()], datatype.number({ min: 1, max: 3 }))

  const productRepoStub = mock<IDbFindProducts>()
  productRepoStub.findAll.mockResolvedValue(arrayFakeProductModel.map(item => { return JSON.stringify(item) }))

  const calculateProductAttribStub = mock<ICalculateProductAttributes>()
  calculateProductAttribStub.calcTotalQuantity.mockResolvedValue(22)
  calculateProductAttribStub.calcIsMarketable.mockResolvedValue(true)

  const sut = new FindProducts(productRepoStub, calculateProductAttribStub)
  return { sut, productRepoStub, calculateProductAttribStub }
}

describe('FindProducts', () => {
  test('Deve chamar o "productRepo.findAll()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.findAll()
    expect(productRepoStub.findAll).toHaveBeenCalledWith()
    expect(productRepoStub.findAll).toHaveBeenCalledTimes(1)
  })

  test('Deve retornar undefined caso o "productRepo.findAll()" não retorne dados.', async () => {
    const { sut, productRepoStub } = makeSut()
    productRepoStub.findAll.mockResolvedValue(undefined)
    const result = await sut.findAll()
    expect(result).toEqual(undefined)
    expect(result).toBe(undefined)
  })

  test('Deve chamar o "calculateProductAttrib.calcTotalQuantity()" com os parametros corretos.', async () => {
    const { sut, productRepoStub, calculateProductAttribStub } = makeSut()
    const products = await productRepoStub.findAll() ?? []
    await sut.findAll()
    expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledTimes(products?.length ?? 0)
  })

  test('Deve chamar o "calculateProductAttrib.calcIsMarketable()" com os parametros corretos.', async () => {
    const { sut, productRepoStub, calculateProductAttribStub } = makeSut()
    const products = await productRepoStub.findAll() ?? []
    await sut.findAll()
    expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledTimes(products?.length ?? 0)
  })
})
