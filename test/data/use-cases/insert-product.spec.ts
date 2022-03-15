import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { InsertProduct } from '@/data/use-cases/insert-product'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { NsInsertProduct } from '@/domain/protocols/insert-product-protocol'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { address, commerce, datatype, random } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: InsertProduct
  productRepoStub: MockProxy<IDbFindProductById & IDbInsertProduct>
  calculateProductAttribStub: MockProxy<ICalculateProductAttributes>
}

const makeSut = (): ISutTypes => {
  const productRepoStub = mock<IDbFindProductById & IDbInsertProduct>()
  productRepoStub.findById.mockResolvedValue(undefined)
  productRepoStub.insert.mockResolvedValue(JSON.stringify(makeFakeProductModel()))

  const calculateProductAttribStub = mock<ICalculateProductAttributes>()
  calculateProductAttribStub.calcTotalQuantity.mockResolvedValue(datatype.number())
  calculateProductAttribStub.calcIsMarketable.mockResolvedValue(datatype.boolean())

  const sut = new InsertProduct(productRepoStub, calculateProductAttribStub)
  return { sut, productRepoStub, calculateProductAttribStub }
}

describe('InsertProduct', () => {
  let fakeParams: NsInsertProduct.Input
  beforeEach(() => {
    fakeParams = {
      sku: datatype.number(),
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

  test('Deve chamar o "productRepo.findById()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.insert(fakeParams)
    expect(productRepoStub.findById).toHaveBeenCalledWith(fakeParams.sku)
    expect(productRepoStub.findById).toHaveBeenCalledTimes(1)
  })

  test('Deve lançar uma exceção com o erro "GenericBussinessError" caso o "productRepo.findById()" retorne dados.', async () => {
    const { sut, productRepoStub } = makeSut()
    productRepoStub.findById.mockResolvedValueOnce(JSON.stringify(makeFakeProductModel()))
    const promise = sut.insert(fakeParams)
    await expect(promise).rejects.toThrow(new GenericBussinessError(`Já existe um Produto com o Código SKU ${fakeParams.sku} cadastrado na Base de Dados.`))
  })

  test('Deve chamar o "productRepo.insert()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.insert(fakeParams)
    expect(productRepoStub.insert).toHaveBeenCalledWith(fakeParams)
    expect(productRepoStub.insert).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o "calculateProductAttrib.calcTotalQuantity()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeParams)
    await sut.insert(fakeParams)
    // expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o "calculateProductAttrib.calcIsMarketable()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeParams)
    await sut.insert(fakeParams)
    // expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledTimes(1)
  })
})
