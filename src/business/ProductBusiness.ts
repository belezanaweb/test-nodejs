import { ProductDatabase } from "../database/ProductDatabase"
import { Inventory } from "../entities/Inventory"
import { Product, ProductInputDTO } from "../entities/Product"
import { Warehouse, WarehouseInterface } from "../entities/Warehouse"
import { CustomError } from "../error/CustomError"

export class ProductBusiness {
    constructor(
        private productDatabase: ProductDatabase
    ) {}

    private convertToModel(warehouses: WarehouseInterface[]) : Warehouse[] {
        return warehouses.map((warehouse: {locality: string, quantity: number, type: string}) =>
            new Warehouse(warehouse.locality, warehouse.quantity, Warehouse.stringToType(warehouse.type))
        )
    }

    public createProduct = async (
        input: ProductInputDTO,
    ): Promise<void> => {
        try {
            if (!input.sku || !input.name || !input.inventory) {
                throw new CustomError(422, "Missing properties")
            }

            const findSku: undefined | Product = this.productDatabase.getProductBySku(input.sku)

            if(findSku) {
                throw new CustomError(409, "There's already a product with this sku")
            }
            
            const newInventory: Inventory = {
                quantity: input.inventory.quantity,
                warehouses:  this.convertToModel(input.inventory.warehouses)    
            }

            const newProduct: Product = new Product(input.sku, input.name, newInventory)

            this.productDatabase.createProduct(newProduct)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

    public getProductBySku = async (sku: number) => {
        try {
            if (!sku) {
                throw new CustomError(422, "Missing a sku")
            }

            const product: undefined | Product = this.productDatabase.getProductBySku(sku)

            if(product === undefined) {
                throw new CustomError(404, "Product not found")
            }
            
           return product

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }
}