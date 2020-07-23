import { ProductGateway } from "../../gateways/productGateway";
import { NotFound } from "../../Error/NotFound";

export class DeleteProductUC{
    constructor(
        private productGateway: ProductGateway,
    ){}

    public async execute(input: DeleteProductUCInput): Promise<DeleteProductUCOutput>{
        const product = await this.productGateway.getProductBySKU(input.sku);

        if(!product){
            throw new NotFound; 
        }

        await this.productGateway.deleteProduct(input.sku)

        return {
            message: `Product ${input.sku} Deleted Successfully!`
        }

    }
}

export interface DeleteProductUCInput{
    sku: number;
}

export interface DeleteProductUCOutput{
    message: string;
}