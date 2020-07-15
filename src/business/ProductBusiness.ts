import { Product } from '../model/Product'
import { Inventory } from '../model/Invetory';
import { ProductDataBase } from '../data/ProductDataBase';
import { ConflictError } from '../errors/ConflictError';
import { InvalidParameterError } from '../errors/InvalidParameterError';
import { NotFoundError } from '../errors/NotFoundError';
import { GenericError } from '../errors/GenericError';

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDataBase
    ) {}

    public createProduct(sku: number, name: string, inventory: Inventory): void {

        if (!sku || !name || !inventory) {
            throw new InvalidParameterError("Missing Input")
        }

        if (this.hasProductBySku(sku)) {
            throw new ConflictError("The product already exists.")
        }

        this.productDataBase.createProduct(new Product(sku, name, inventory))
    }

    private hasProductBySku(sku: number): boolean {
        const product = this.productDataBase.findBySku(sku)

        return product ? true : false;
    }

    public editProduct(skuParams: number, sku: number, name: string, inventory: Inventory): void {

        if (!sku || !name || !inventory) {
            throw new InvalidParameterError("Missing Input")
        }

        if (skuParams !== sku) {
            throw new GenericError("The informed sku does not match the product sku")
        }

        if (!this.hasProductBySku(skuParams)) {
            throw new NotFoundError("Product Not Found")
        }
        
        this.productDataBase.editProduct(skuParams, new Product(skuParams, name, inventory))
    }
}