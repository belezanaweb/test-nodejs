import { CatalogController } from '../src/controllers/Catalog.controller'
import { Request } from 'express'
import { IProduct } from '../src/interfaces/product.interface'
import model from '../src/models/Model'

describe('Catalog Service', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Get Product', () => {

        it('Should not found product to get', async () => {
            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.get(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(404)
            expect(response.message).toEqual('Produto não encontrado')
        })

        it('Should return error when get product', async () => {
            jest.spyOn(model, 'findOne').mockImplementation(() => {
                throw new Error()
            })
            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.get(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(500)
            expect(response.message).toEqual('Erro ao resgatar produto')
        })

        it('Should get product', async () => {

            const expectedProductResponse = {
                name: 'Produto Legal',
                sku: 1234,
            }

            const expectedWarehouseResponse = [
                {
                    id: 1,
                    locality: 'Santos',
                    quantity: 1,
                    type: 1,
                    product_sku: 1234
                },
                {
                    id: 3,
                    locality: 'São Paulo',
                    quantity: 3,
                    type: 0,
                    product_sku: 1234
                }
            ]

            jest.spyOn(model, 'findOne').mockResolvedValue(expectedProductResponse)
            jest.spyOn(model, 'findMany').mockResolvedValue(expectedWarehouseResponse)

            const mockRequest = {
                params: {
                    sku: 1234
                }
            } as any as Request

            let response = {} as any

            await CatalogController.get(mockRequest, null, (res) => response = res)

            const { status, body } = response
            const { product }: { product: IProduct } = body

            expect(status).toBe(200)
            expect(product).toHaveProperty('name')
            expect(product).toHaveProperty('isMarketable')

            expect(product.inventory).toHaveProperty('quantity')
            expect(product.inventory).toHaveProperty('warehouse')

            const inventoryQuantity = product.inventory.warehouse.reduce((prev, warehouse) => {
                expect(warehouse).toHaveProperty('locality')
                expect(warehouse).toHaveProperty('quantity')
                expect(warehouse).toHaveProperty('type')
                return prev + warehouse.quantity
            }, 0)

            expect(inventoryQuantity).toBe(4)

            expect(product.isMarketable).toBeTruthy()
        })
    }),

    describe('Delete Product', () => {
        it('Should not found product to delete', async () => {
            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.remove(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(404)
            expect(response.message).toEqual('Produto não encontrado')
        })

        it('Should return error when remove product', async () => {
            jest.spyOn(model, 'findOne').mockImplementation(() => {
                throw new Error()
            })

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.remove(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(500)
            expect(response.message).toEqual('Erro ao remover produto')
        })

        it('Should delete product', async () => {
            const expectedProductResponse = {
                name: 'Produto Legal',
                sku: 1234,
            }

            jest.spyOn(model, 'findOne').mockResolvedValue(expectedProductResponse)

            jest.spyOn(model, 'delete').mockResolvedValue()

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.remove(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(204)
            expect(response.message).toBeUndefined()
        })
    })

    describe('Create Product', () => {
        it('Should not create product because it already exists', async () => {
            const expectedProductResponse = {
                name: 'Produto Legal',
                sku: 1234,
            }

            const expectedWarehouseResponse = [
                {
                    id: 1,
                    locality: 'Santos',
                    quantity: 1,
                    type: 1,
                    product_sku: 1234
                },
                {
                    id: 3,
                    locality: 'São Paulo',
                    quantity: 3,
                    type: 0,
                    product_sku: 1234
                }
            ]

            jest.spyOn(model, 'findOne').mockResolvedValue(expectedProductResponse)
            jest.spyOn(model, 'findMany').mockResolvedValue(expectedWarehouseResponse)
            const mockRequest = {
                body: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.create(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(400)
            expect(response.message).toEqual('Dois produtos são considerados iguais se os seus skus forem iguais')
        })

        it('Should not create product because it throws an error', async () => {
            jest.spyOn(model, 'findOne').mockImplementation(() => {
                throw new Error()
            })

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.create(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(500)
            expect(response.message).toEqual('Erro ao criar produto')
        })

        it('Should create product without inventory', async () => {
            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const productRequest = {
                sku: 4321,
                name: 'Produto novo'
            }

            jest.spyOn(model.prototype, 'insert').mockResolvedValueOnce({ name: productRequest.name, sku: productRequest.sku })

            const mockRequest = {
                body: productRequest
            } as any as Request

            let response = {} as any

            await CatalogController.create(mockRequest, null, (res) => response = res)

            const { body, status } = response
            const { product }: { product: IProduct } = body
            expect(status).toBe(201)
            expect(product.isMarketable).toBeFalsy()
            expect(product.name).toEqual(productRequest.name)
            expect(product.sku).toEqual(productRequest.sku)
        })

        it('Should create product without warehouses', async () => {

            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const productRequest = {
                sku: 4321,
                name: 'Produto novo',
                inventory: {
                    warehouses: []
                }
            }

            jest.spyOn(model.prototype, 'insert').mockResolvedValue({ name: productRequest.name, sku: productRequest.sku })

            const mockRequest = {
                body: productRequest
            } as any as Request

            let response = {} as any

            await CatalogController.create(mockRequest, null, (res) => response = res)

            const { body, status } = response
            const { product }: { product: IProduct } = body

            expect(status).toBe(201)
            expect(product.isMarketable).toBeFalsy()
            expect(product.name).toEqual(productRequest.name)
            expect(product.sku).toEqual(productRequest.sku)
        })

        it('Should create product with warehouses', async () => {

            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const productRequest = {
                sku: 4321,
                name: 'Produto novo',
                inventory: {
                    warehouses: [
                        {
                            locality: 'Santos',
                            quantity: 10,
                            type: 1
                        }
                    ]
                }
            }

            const expectedWarehouseResponse = {
                id: 1,
                locality: 'Santos',
                quantity: 10,
                type: 1,
                product_sku: 1234
            }

            jest.spyOn(model.prototype, 'insert').mockResolvedValueOnce({ name: productRequest.name, sku: productRequest.sku })
            jest.spyOn(model.prototype, 'insert').mockResolvedValueOnce(expectedWarehouseResponse)

            const mockRequest = {
                body: productRequest
            } as any as Request

            let response = {} as any

            await CatalogController.create(mockRequest, null, (res) => response = res)

            const { body, status } = response
            const { product }: { product: IProduct } = body

            expect(status).toBe(201)
            expect(product.isMarketable).toBeTruthy()
            expect(product.name).toEqual(productRequest.name)
            expect(product.sku).toEqual(productRequest.sku)
            expect(product.inventory.quantity).toEqual(expectedWarehouseResponse.quantity)
        })
    

    })

    describe('Update Product', () => {
        it('Should not update product because it does not exists', async () => {
            jest.spyOn(model, 'findOne').mockResolvedValue(false)

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.update(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(404)
            expect(response.message).toEqual('Produto não encontrado')
        })

        it('Should not update product because it throw a error', async () => {
            jest.spyOn(model, 'findOne').mockImplementation(() => {
                throw new Error()
            })

            const mockRequest = {
                params: {
                    sku: 123
                }
            } as any as Request

            let response = {} as any

            await CatalogController.update(mockRequest, null, (res) => response = res)

            expect(response.status).toBe(500)
            expect(response.message).toEqual('Erro ao atualizar produto')
        })

        it('Should update', async () => {
            const expectedProductResponse = {
                name: 'Produto Legal',
                sku: 1234,
            }
            jest.spyOn(model, 'findOne').mockResolvedValue(expectedProductResponse)

            const expectedWarehouseResponse = [
                {
                    id: 3,
                    locality: 'São Paulo',
                    quantity: 3,
                    type: 0,
                    product_sku: 1234
                }
            ]

            jest.spyOn(model, 'delete').mockResolvedValue()

            jest.spyOn(model.prototype, 'update').mockResolvedValue()

            jest.spyOn(model.prototype, 'insert').mockResolvedValue(expectedWarehouseResponse[0])

            const bodyRequest = {
                ...expectedProductResponse,
                inventory: {
                    warehouses: expectedWarehouseResponse
                }
            }

            const mockRequest = {
                params: {
                    sku: 123
                },
                body: bodyRequest
            } as any as Request

            let response = {} as any

            await CatalogController.update(mockRequest, null, (res) => response = res)

            const { body, status } = response
            const { product }: { product: IProduct } = body

            expect(status).toBe(200)
            expect(product.sku).toEqual(mockRequest.params.sku)
            expect(product.name).toEqual(expectedProductResponse.name)
            expect(product.inventory.quantity).toEqual(3)
            expect(product.isMarketable).toBeTruthy()
        })

    })
})