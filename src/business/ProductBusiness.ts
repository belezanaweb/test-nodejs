import { Product } from '../model/Product'
import { Inventory } from '../model/Inventory'
import { ProductDb } from '../db/ProductDb'
import { Warehouse } from '../model/Warehouse'
import { InventoryInterface } from '../interface/Inventory'
import { WarehouseInterface } from '../interface/Warehouse'
import { BasicError } from '../error/BasicError'

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDb
    ) { }

    public createProduct(sku: number, name: string, inventory: InventoryInterface): void {

        if (!sku || !name || !inventory) {
            throw new BasicError("Invalid input", 400)
        }

        const productFound = this.productDataBase.findBySku(sku)

        if (productFound) {
            throw new BasicError("A product with the same SKU already exists", 409)
        }

        this.productDataBase.createProduct(
            new Product(
                sku,
                name,
                new Inventory(this.warehousesInterfaceToModel(inventory.warehouses))
            )
        )
    }

    private warehousesInterfaceToModel(warehouses: WarehouseInterface[]): Warehouse[] {

        return warehouses.map((warehouse =>
            new Warehouse(warehouse.locality, warehouse.quantity, warehouse.type)
        ))
    }

    private hasProductBySku(sku: number): boolean {
        const product = this.productDataBase.findBySku(sku)

        return product ? true : false;
    }

    public editProduct(skuParams: number, sku: number, name: string, inventory: InventoryInterface): void {

        if (!sku || !name || !inventory) {
            throw new BasicError("Invalid input", 400)
        }

        if (!this.hasProductBySku(skuParams)) {
            throw new BasicError("Product not found", 404)
        }
        
        this.productDataBase.editProduct(
            skuParams, 
            new Product(
                skuParams, 
                name, 
                new Inventory(this.warehousesInterfaceToModel(inventory.warehouses))
            )
        )
    }

    public getProduct(sku: number): Product {
        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new BasicError("Product not found", 404)
        }

        product.setMarketable()

        return product;
    }

    public deleteProduct(sku: number): void {

        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new BasicError("Product Not Found", 404)
        }

        this.productDataBase.deleteProduct(sku)
    }
}