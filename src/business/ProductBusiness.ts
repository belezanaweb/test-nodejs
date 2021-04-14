import { Product } from '../model/Product'
import { Inventory } from '../model/Inventory'
import { ProductDb } from '../db/ProductDb'
import { Warehouse } from '../model/Warehouse'
import { InvetoryInterface } from '../interface/Inventory'
import { WarehouseInterface } from '../interface/Warehouse'

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDb
    ) { }

    public createProduct(sku: number, name: string, inventory: InvetoryInterface): void {

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

        return !!product;
    }

    public getProduct(sku: number): Product {
        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new Error("")
        }

        product.setMarketable()

        return product;
    }
}