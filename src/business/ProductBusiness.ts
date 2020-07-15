import { Product } from '../model/Product'
import { Inventory } from '../model/Invetory';
import { ProductDataBase } from '../data/ProductDataBase';
import { ConflictError } from '../errors/ConflictError';
import { InvalidParameterError } from '../errors/InvalidParameterError';
import { NotFoundError } from '../errors/NotFoundError';
import { GenericError } from '../errors/GenericError';
import { Warehouse } from '../model/Warehouse';
import { InvetoryInterface } from '../interfaces/InvetoryInterface';
import { WarehouseInterface } from '../interfaces/WarehouseInterface';

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
        const warehousesModel: Warehouse[] = []

        warehouses.forEach((warehouse) => {
            warehousesModel.push(new Warehouse(warehouse.locality, warehouse.quantity, warehouse.type))
        })

        return warehousesModel;
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

    public recuperationProduct(sku: number): Product {
        const product = this.productDataBase.findBySku(sku)

        if (!product) {
            throw new NotFoundError("Product Not Found")
        }

        product.getInventory().calculateQuantity();
        product.setIsMarketable();

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