import { ProductInputDTO } from "../controller/model/Product"
import { WarehouseInterface } from "../controller/model/Warehouse"
import { ProductDatabase } from "../database/ProductDatabase"
import { Inventory } from "./entities/Inventory"
import { Product } from "./entities/Product"
import { Warehouse } from "./entities/Warehouse"
import { CustomError } from "./error/CustomError"

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
                quantity: input.inventory.quantity || 0,
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
            
            product.setInventoryQuantity()
            product.setIsMarketable()
            
            return product

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

    public updateProduct = async (
        input: ProductInputDTO,
    ): Promise<void> => {
        try {
            if (!input.sku || !input.inventory || !input.name) {
                throw new CustomError(422, "Missing properties")
            }

            const newInventory: Inventory = {
                quantity: input.inventory.quantity || 0,
                warehouses:  this.convertToModel(input.inventory.warehouses)    
            }

            const newProduct: Product = new Product(input.sku, input.name, newInventory)

            this.productDatabase.updateProduct(input.sku, newProduct)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }

    public deleteProduct = async(sku: number): Promise<void> => {
        try {
            if(!sku) {
                throw new CustomError(422, "Missing a sku")
            }

            this.productDatabase.deleteProduct(sku)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }

    }
}