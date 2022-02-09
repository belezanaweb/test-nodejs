import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IDbUpdateProductById } from '@/data/protocols/db-update-product-protocol'
import { UpdateProductById } from '@/data/use-cases/update-product'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { ICalculateProductAttributes } from '@/domain/protocols/calculate-product-attributes-protocol'
import { NsUpdateProduct } from '@/domain/protocols/update-product-protocol'
import { makeFakeProductModel } from '@test/domain/models/mocks/product-model-mock'
import { address, commerce, datatype, random } from 'faker/locale/pt_BR'
import { mock, MockProxy } from 'jest-mock-extended'

interface ISutTypes {
  sut: UpdateProductById
  productRepoStub: MockProxy<IDbFindProductById & IDbUpdateProductById>
  calculateProductAttribStub: MockProxy<ICalculateProductAttributes>
}

const makeSut = (): ISutTypes => {
  const productRepoStub = mock<IDbFindProductById & IDbUpdateProductById>()
  productRepoStub.findById.mockResolvedValue(JSON.stringify(makeFakeProductModel()))
  productRepoStub.updateById.mockResolvedValue(JSON.stringify(makeFakeProductModel()))

  const calculateProductAttribStub = mock<ICalculateProductAttributes>()
  calculateProductAttribStub.calcTotalQuantity.mockResolvedValue(datatype.number())
  calculateProductAttribStub.calcIsMarketable.mockResolvedValue(datatype.boolean())

  const sut = new UpdateProductById(productRepoStub, calculateProductAttribStub)
  return { sut, productRepoStub, calculateProductAttribStub }
}

describe('UpdateProductById', () => {
  let fakeParams: NsUpdateProduct.Input
  beforeEach(() => {
    fakeParams = {
      oldSku: datatype.number(),
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
    await sut.updateById(fakeParams)
    expect(productRepoStub.findById).toHaveBeenCalledWith(fakeParams.oldSku)
    expect(productRepoStub.findById).toHaveBeenCalledTimes(1)
  })

  test('Deve lançar uma exceção com o erro "GenericBussinessError" caso o "productRepo.findById()" não retorne dados.', async () => {
    const { sut, productRepoStub } = makeSut()
    productRepoStub.findById.mockResolvedValueOnce(undefined)
    const promise = sut.updateById(fakeParams)
    await expect(promise).rejects.toThrow(new GenericBussinessError(`Não foi localizado um Produto com o Código SKU ${fakeParams.oldSku} na Base de Dados.`))
  })

  test('Deve chamar o "productRepo.updateById()" com os parametros corretos.', async () => {
    const { sut, productRepoStub } = makeSut()
    await sut.updateById(fakeParams)
    expect(productRepoStub.updateById).toHaveBeenCalledWith(fakeParams)
    expect(productRepoStub.updateById).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o "calculateProductAttrib.calcTotalQuantity()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeParams)
    await sut.updateById(fakeParams)
    // expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcTotalQuantity).toHaveBeenCalledTimes(1)
  })

  test('Deve chamar o "calculateProductAttrib.calcIsMarketable()" com os parametros corretos.', async () => {
    const { sut, calculateProductAttribStub } = makeSut()
    // const product = await productRepoStub.findById(fakeParams)
    await sut.updateById(fakeParams)
    // expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledWith(JSON.parse(product ?? '{}'))
    expect(calculateProductAttribStub.calcIsMarketable).toHaveBeenCalledTimes(1)
  })
})
