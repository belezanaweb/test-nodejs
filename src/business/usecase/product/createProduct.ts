import { ProductGateway } from "../../gateways/productGateway"
import { Product, Inventory } from "../../entities/product";

export class CreateProductUC {
    constructor(private productGateway: ProductGateway) { }

    public async execute(input: CreateProductUCInput): Promise<CreateProductUCOutput> {

        const checkSku = await this.productGateway.getProductBySKU(input.sku);

        if (checkSku) {
            throw new Error("Existing sku");
        }

        const product = new Product(
            input.sku,
            input.name,
            input.inventory,
            input.isMarketable
        )

        await this.productGateway.createProduct(product)

        return {
            message: "Successfully Created"
        }
    }
}

export interface CreateProductUCInput {
    sku: number;
    name: string;
    inventory: Inventory;
    isMarketable: boolean;
}

export interface CreateProductUCOutput {
    message: string;
}