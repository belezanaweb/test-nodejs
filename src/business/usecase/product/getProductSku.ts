import { ProductGateway } from "../../gateways/productGateway";
import { Inventory } from "../../entities/product";
import { NotFound } from "../../Error/NotFound";

export class GetProductBySkuUC {
    constructor(
        private productGateway: ProductGateway,
    ) { }
    async execute(input: GetProductUCInput): Promise<GetProductOutput> {
        const product = await this.productGateway.getProductBySKU(input.sku);

        if(!product){
            throw new NotFound
        }
                
        return {
            sku: product.getSku(),
            name: product.getName(),
            inventory: product.getInventory(),
            isMarketable: product.getIsMarketable(),
        }
    };
}
  
export interface GetProductUCInput {
    sku: number;
}

export interface GetProductOutput {
    sku: number;
    name: string;
    inventory: Inventory;
    isMarketable: boolean;
}
