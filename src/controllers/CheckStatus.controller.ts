import { IControllerBase } from 'interfaces/controllerBase.interface'
import { Request, Response } from 'express'
import Catalog from '../models/Catalog.model'
import { IProduct } from 'interfaces/product.interface'

export class CheckStatusController implements IControllerBase <IProduct> {
    static async get(req: Request, res: Response, next: Function) {
        try {
            const whereConfig = { 
                where: '1 = ?', 
                whereParams: '1', 
                fields: '1', 
                table: 'product'
            }
            await Catalog.findOne(whereConfig)

            next({
                status: 200,
                body: {
                    message: 'Ok'
                }
            })
        } catch (err) {
            next({
                errMessage: err.message,
                stack: err.stack,
                status: 503,
                message: 'Serviço indisponível'
            })
        }
    }
}