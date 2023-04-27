import { ProductEntity } from "../entities/product.entity";

export class ProductRepository {
    private products: ProductEntity[] = []
 
    public async createProduct(data: ProductEntity) {
        this.products.push(data)
        
        return data
    }

    public async updateProduct(data: ProductEntity) {
        return this.products
            .filter(product => product.sku === data.sku)
            .map(object => Object.assign(object, data))     
    }

    public async findProduct(sku: number) {
        return this.products
            .filter(product => {
                return product.sku == sku
            })
            .map(item => {
                const total = item.inventory.warehouses.reduce((total, item) => {
                    total += item.quantity
                    return total
                }, 0)
                return {
                    sku: item.sku, 
                    name: item.name,
                    inventory: {quantity: total, ...item.inventory  },
                    isMarketable: total > 0 ? true : false
                }
            })  
    }

    public async existsProduct(sku: number) {
        return this.products.filter((product) => product.sku === sku)
    }

    public async deleteProduct(sku: number) {
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].sku == sku){
                this.products.splice(i,1)
            } 
        }
    }    
}