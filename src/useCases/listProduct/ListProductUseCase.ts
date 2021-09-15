import { AppError } from "../../errors/AppError";
import { InventoryProduct } from "../../model/InventoryProduct";
import { IProductsRepository } from "../../repositories/IProductsRepository";



class ListProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    execute(sku: number): InventoryProduct {

        const product  = this.productsRepository.list(sku);
              
        
        if(!product) {
              throw new AppError("Product not already exists!");
        };

        const inventoryProduct = new InventoryProduct();
        
        inventoryProduct.inventory = [];
        
        const total = product.warehouses.reduce((acumulado, p) => acumulado + p.quantity, 0);
        
        inventoryProduct.isMarketable = total > 0;
        
        Object.assign(inventoryProduct, {
        sku : product.sku,
        name : product.name,
        quantity: total
                
        });

        product.warehouses.forEach(element => {

            inventoryProduct.inventory.push(element);
                            
        });

        return inventoryProduct;
    
    };



      

      

    

};




export { ListProductUseCase }