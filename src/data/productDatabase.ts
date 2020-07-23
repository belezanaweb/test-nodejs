import { BaseDatabase } from "./baseDatabase";
import { ProductGateway } from "../business/gateways/productGateway";
import { Product, Inventory } from "../business/entities/product";

export class ProductDatabase extends BaseDatabase implements ProductGateway {
    private productsList: Product[] = []

    public async createProduct(product: Product): Promise<void> {
        this.productsList.push(product)
    }

    public async getProductBySKU(sku: number): Promise<Product | undefined> {
        const product = this.productsList.find(product =>
            product.getSku() === sku)
        if (!product) {
            return undefined;
        }
        return product
    }

    public async updateProduct(
        sku: number,
        name: string,
        inventory: Inventory): Promise<void> {
        this.productsList.forEach( product => {
            if(product.getSku() === sku){
               product.setName(name),
               product.setInventory(inventory) 
            }
        })
    }

    public async deleteProduct(sku: number): Promise<void>{
        const product = this.productsList.slice(sku, 1)
    }

}

export const produtcDatabase = new ProductDatabase()