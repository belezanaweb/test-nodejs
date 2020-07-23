import { ProductGateway } from "../../gateways/productGateway";
import { Inventory } from "../../entities/product";
import { NotFound } from "../../Error/NotFound";

export class UpdateProductUC {
    constructor(
        private productGateway: ProductGateway,
        ){}

    public async execute(input: UpdateProductUCInput): Promise<UpdateProductUCOutput>{
        const product = await this.productGateway.getProductBySKU(input.sku);
        
        if(!product){
            throw new NotFound;
        }
        
        await this.productGateway.updateProduct(input.sku, input.name, input.inventory)

        return {
            message: `Product updated Successfully!`
        }
    }
}

export interface UpdateProductUCInput {
    sku: number;
    name: string;
    inventory: Inventory;
}

export interface UpdateProductUCOutput {
    message: string;
}