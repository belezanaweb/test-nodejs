import { Product } from '../model/Product'
import { Inventory } from '../model/Invetory';
import { ProductDataBase } from '../data/ProductDataBase';
import { ConflictError } from '../errors/ConflictError';
import { InvalidParameterError } from '../errors/InvalidParameterError';

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDataBase
    ) {}

    public createProduct(sku: number, name: string, inventory: Inventory): void {

        if (!sku || !name || !inventory) {
            throw new InvalidParameterError("Missing Input")
        }

        const productFound = this.productDataBase.findBySku(sku)

        if (productFound) {
            throw new ConflictError("The product already exists.")
        }

        this.productDataBase.createProduct(new Product(sku, name, inventory))
    }
}