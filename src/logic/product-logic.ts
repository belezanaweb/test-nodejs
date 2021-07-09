import Container from "typedi";
import { ProductBody } from "../controller/dtos";
import { ProductRepository } from "../repository/product-repository";

export class ProductLogic {

    private repository: ProductRepository;

    constructor() {
        this.repository = Container.get(ProductRepository);
    }

    public createProduct(body: ProductBody){
        this.repository.save(body);
    }

    public updateProduct(body: ProductBody){
        this.repository.update(body);
    }

    public findProduct(sku: number){
        const model = this.repository.findBySku(sku);

        let inventoryQuantity = 0;
        model.inventory.warehouses.forEach(w => {
            inventoryQuantity += w.quantity
        });

        let response = {
            sku: model.sku,
            name: model.name,
            inventory: {
                quantity: inventoryQuantity,
                warehouses: model.inventory.warehouses
            },
            isMarketable: inventoryQuantity
        }

        return response;
    }

    public deleteProduct(sku: number){
        this.repository.delete(sku);
    }
}