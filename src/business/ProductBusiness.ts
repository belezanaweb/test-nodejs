import { Product } from '../model/Product'
import { Inventory } from '../model/Invetory';
import { ProductDataBase } from '../data/ProductDataBase';
import { Warehouse } from '../model/Warehouse';
import { InvetoryInterface } from '../interfaces/InvetoryInterface';
import { WarehouseInterface } from '../interfaces/WarehouseInterface';
import { ConflictError, InvalidParameterError, NotFoundError, GenericError} from '../errors'

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDataBase
    ) {}

    public createProduct(sku: number, name: string, inventory: InvetoryInterface): void {

        if (!sku || !name || !inventory) {
            throw new InvalidParameterError("Missing Input")
        }

        if (this.hasProductBySku(sku)) {
            throw new ConflictError("The product already exists.")
        }

        this.productDataBase.createProduct(
            new Product(
                sku,
                name,
                new Inventory(this.convertWarehousesInterfaceToWarehousesModel(inventory.warehouses))
            )
        )
    }

    private convertWarehousesInterfaceToWarehousesModel(warehouses: WarehouseInterface[]): Warehouse[] {

        return warehouses.map((warehouse=>
            new Warehouse(warehouse.locality, warehouse.quantity, warehouse.type)  
        ))
    }

    private hasProductBySku(sku: number): boolean {
        const product = this.productDataBase.findBySku(sku)

        return !!product;
    }

    public editProduct(sku: number, name: string, inventory: Inventory): void {

        if (!sku || !name || !inventory) {
            throw new InvalidParameterError("Missing Input")
        }

        if (!this.hasProductBySku(sku)) {
            throw new NotFoundError("Product Not Found")
        }
        
        this.productDataBase.editProduct(sku, new Product(sku, name, inventory))
    }

    public recuperationProduct(sku: number): Product {
        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new NotFoundError("Product Not Found")
        }

        product.setMarketable();

        return product;
    }

    public deleteProduct(sku: number): void {

        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new NotFoundError("Product Not Found")
        }

        this.productDataBase.deleteProduct(sku)
    }
}