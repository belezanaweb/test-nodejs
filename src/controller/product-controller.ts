import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { ProductLogic } from "../logic";
import { Logger, HttpError } from "../utils";
import { ProductBody } from "./dtos";

export class ProductController {

    private logic: ProductLogic;

    constructor() {
        this.logic = Container.get(ProductLogic);
    }

    public async postProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const body: ProductBody = req.body;

            this.logic.createProduct(body);

            res.status(201).send();
        } catch (err) {
            Logger.error('ProductController::postProduct', err);
            next(err);
        }
    }

    public async putProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const sku = Number(req.params.sku);
            const body: ProductBody = req.body;

            if(sku !== body.sku){
                throw new HttpError(400, 'Parameter sku does not match field sku in request body.');
            }

            this.logic.updateProduct(body);

            res.status(200).send();
        } catch (err) {
            Logger.error('ProductController::putProduct', err);
            next(err);
        }
    }

    public async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const sku = Number(req.params.sku);

            const product = this.logic.findProduct(sku);

            if (product) {
                res.status(200).send(product);
            } else {
                res.status(204).send();
            }
        } catch (err) {
            Logger.error('ProductController::getProduct', err);
            next(err);
        }
    }

    public async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const sku = Number(req.params.sku);

            this.logic.deleteProduct(sku);

            res.status(200).send();
        } catch (err) {
            Logger.error('ProductController::deleteProduct', err);
            next(err);
        }
    }
}