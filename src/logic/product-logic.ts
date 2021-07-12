import Container from "typedi";
import { ProductBody, ProductResponse } from "../controller/dtos";
import { ProductResponseFactory } from "../controller/factory";
import { ProductRepository } from "../repository/product-repository";
import { HttpError, Logger } from "../utils";

export class ProductLogic {

    private repository: ProductRepository;

    constructor() {
        this.repository = Container.get(ProductRepository);
    }

    public createProduct(body: ProductBody){
        const model = this.repository.findBySku(body.sku);
        if(model) throw new HttpError(412, 'SKU already exists.');
         
        this.repository.save(body);
        Logger.info(`Product [sku: ${body.sku}] created.`);
    }

    public updateProduct(body: ProductBody){
        const model = this.repository.findBySku(body.sku);
        if(!model) throw new HttpError(412, 'SKU not found.');

        this.repository.update(body);
        Logger.info(`Product [sku: ${body.sku}] updated.`);
    }

    public findProduct(sku: number): ProductResponse{
        const model = this.repository.findBySku(sku);
        if(!model) return;

        return ProductResponseFactory.create(model);
    }

    public deleteProduct(sku: number){
        const model = this.repository.findBySku(sku);
        if(!model) throw new HttpError(412, 'SKU not found.');

        this.repository.delete(sku);
        Logger.info(`Product [sku: ${sku}] deleted.`);
    }
}