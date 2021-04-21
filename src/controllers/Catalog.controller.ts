import { IControllerBase } from '../interfaces/controllerBase.interface'
import { Request, Response } from 'express'
import Catalog from '../models/Catalog.model'
import { IProduct } from '../interfaces/product.interface'

export class CatalogController implements IControllerBase <IProduct> {

    static async get(req: Request, res: Response, next: Function) {
        try {

            const { sku } = req.params

            const product = await Catalog.findBySkuFormatted(parseInt(sku))
            
            if(!product) {
                return next({
                    status: 404,
                    message: 'Produto não encontrado'
                })
            }

            return next({
                status: 200,
                body: {
                    product
                }
            })
        } catch (err) {
            return next({
                errMessage: err.message,
                stack: err.stack,
                status: 500,
                message: 'Erro ao resgatar produto'
            })
        }
    }

    static async create(req: Request, res: Response, next: Function) {
        try {
            const { sku } = req.body

            const alreadyExists = await Catalog.findBySkuFormatted(sku)

            if (alreadyExists) {
                return next({
                    status: 400,
                    message: 'Dois produtos são considerados iguais se os seus skus forem iguais'
                })
            }

            const product = new Catalog(req.body)
            const result = await product.save()

            return next({
                status: 201,
                body: {
                    product: result
                }
            })
        } catch (err) {
            return next({
                errMessage: err.message,
                stack: err.stack,
                status: 500,
                message: 'Erro ao criar produto'
            })
        }
    }

    static async update(req: Request, res: Response, next: Function) {
        try {
            const { sku } = req.params

            const oldProduct = await Catalog.findBySkuFull(parseInt(sku))

            if(!oldProduct) {
                return next({
                    status: 404,
                    message: 'Produto não encontrado'
                })
            }

            await Catalog.removeWarehouseByProduct(parseInt(sku))

            const newProduct = new Catalog({...req.body, sku})

            const updatedProduct = await newProduct.updateProduct()

            return next({
                status: 200,
                body: {
                    product: updatedProduct
                }
            })
        } catch (err) {
            return next({
                errMessage: err.message,
                stack: err.stack,
                status: 500,
                message: 'Erro ao atualizar produto'
            })
        }
    }

    static async remove(req: Request, res: Response, next: Function) {
        try {
            const { sku } = req.params

            const oldProduct = await Catalog.findBySkuFull(parseInt(sku))

            if(!oldProduct) {
                return next({
                    status: 404,
                    message: 'Produto não encontrado'
                })
            }
            
            await Catalog.removeBySku(parseInt(sku))

            next({
                status: 204
            })
        } catch (err) {
            return next({
                errMessage: err.message,
                stack: err.stack,
                status: 500,
                message: 'Erro ao remover produto'
            })
        }
    }
}