import { IInventoryDB } from 'interfaces/inventory.interface'
import { IProduct } from 'interfaces/product.interface'
import { IWarehouse } from 'interfaces/warehouse.interface'
import { warehouseType } from '../enums/warehouse.type'

import Model from './Model'

export default class Catalog extends Model {
    public sku: number;
    public name: string;
    public inventory: IInventoryDB;

    protected static readonly _productDbFields: Array<String> = [
        'sku',
        'name'
    ];

    protected static readonly _warehouseDbFields: Array<String> = [
        'id',
        'locality',
        'quantity',
        'type',
        'product_sku'
    ];

    protected static readonly _productTableName = 'product';

    protected static readonly _warehouseTableName = 'warehouse';

    static get productTableName() { return this._productTableName };

    static get warehouseTableName() { return this._warehouseTableName };

    static get productDbFields() { return this._productDbFields };

    static get warehouseDbFields() { return this._warehouseDbFields };

    constructor(data: any) {
        super()

        this.sku = data.sku
        this.name = data.name

        if(data?.inventory?.warehouses){
            const warehouses = data.inventory.warehouses.map((warehouse: IWarehouse) => {
                return { 
                    locality: warehouse.locality,
                    quantity: warehouse.quantity,
                    type: warehouse.type,
                }
            })
            this.inventory = {
                warehouse: warehouses
            }
        }
    }

    public async save(): Promise<IProduct> {
        const createdProduct = await this.saveProduct()
        let warehouses = []

        if(this?.inventory?.warehouse)
            warehouses = await Promise.all(this.inventory.warehouse.map(async inv => this.saveWarehouse(inv)))

        return Catalog.build({...createdProduct, warehouses})
    }

    public async updateProduct(): Promise<IProduct> {
        const productUpdateConfig = {
            where: 'sku = ?', 
            whereParams: [this.sku],
            table: Catalog.productTableName, 
            values: { name: this.name }
        }
        await this.update(productUpdateConfig)

        let warehouses = []
        if(this?.inventory?.warehouse)
            warehouses = await Promise.all(this.inventory.warehouse.map(async inv => this.saveWarehouse(inv)))

        return Catalog.build({sku: this.sku, name: this.name, warehouses})
    }

    public async saveWarehouse(inventory): Promise<IWarehouse> {
        const type = warehouseType[inventory.type]
        const [id, ...fields] = Catalog.warehouseDbFields

        const insertConfigWarehouse = {
            data: {product_sku: this.sku, ...inventory, type},
            fields: fields,
            table: Catalog.warehouseTableName
        }

        return await this.insert(insertConfigWarehouse)
    }

    protected async saveProduct(): Promise<IProduct> {
        const insertConfigProduct = {
            data: {
                sku: this.sku,
                name: this.name
            },
            fields: Catalog.productDbFields,
            table: Catalog.productTableName
        }
   
        return this.insert(insertConfigProduct)
    }

    public static async removeBySku(sku: number): Promise<void> {
        const deleteWarehousesConfig = {
            where: 'product_sku = ?', 
            whereParams: [sku], 
            table: Catalog._warehouseTableName
        }
        await this.delete(deleteWarehousesConfig)

        const deleteProductConfig = {
            where: 'sku = ?', 
            whereParams: [sku], 
            table: Catalog._productTableName
        }
        await this.delete(deleteProductConfig)
    }

    public static build(data: any): IProduct {
        const invQuantity = data.warehouses.reduce((prev, cur) => {
            return prev + cur.quantity
        }, 0)

        const warehouses = data.warehouses.map((warehouse: IWarehouse) => {
            return { 
                locality: warehouse.locality,
                quantity: warehouse.quantity,
                type: warehouseType[warehouse.type],
            }
        })

        return {
            sku: data.sku,
            name: data.name,
            inventory: {
                quantity: invQuantity,
                warehouse: warehouses 
            },
            isMarketable: invQuantity ? true : false
        }
        
    }

    public static async findBySkuFormatted(sku: number) {
        const product = await this.findBySkuFull(sku)

        if(!product) return false

        return Catalog.build(product)
    }

    public static async findBySkuFull(sku: number) {

        const whereConfigProduct = {
            where: 'sku = ?', 
            whereParams: [sku],
            fields: this.productDbFields,
            table: this.productTableName
        }

        const product = await this.findOne(whereConfigProduct)

        if(!product?.sku) {
            return false
        }

        const whereConfigWarehouse = {
            where: 'product_sku = ?', 
            whereParams: [sku],
            fields: this.warehouseDbFields,
            table: this.warehouseTableName
        }

        const warehouses = await this.findMany(whereConfigWarehouse)
        return {...product, warehouses}

    }

    public static async removeWarehouseByProduct(sku: number): Promise<void> {
        const removeConfig = {
            where: 'product_sku = ?',
            whereParams: [sku],
            table: this.warehouseTableName
        }

        await this.delete(removeConfig)
    }
}