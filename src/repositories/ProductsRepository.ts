import { Product } from "../model/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";

class ProductsRepository implements IProductsRepository {

    private products: Product[];
    private static INSTANCE: ProductsRepository;

    private constructor(){
        this.products = [];
        
    }

    public static getInstance(): ProductsRepository{
        if(!ProductsRepository.INSTANCE){
            ProductsRepository.INSTANCE = new ProductsRepository();
        }

        return ProductsRepository.INSTANCE;
    }


    create(sku: number, name: string, ware_houses: []): void {
        const product = new Product();
        product.warehouses = [];
                     
        Object.assign(product, {
            sku,
            name,
        });

        ware_houses.forEach(element => {

            product.warehouses.push(element);
                            
        });
            
        this.products.push(product);
    };


    findByName(sku: number): Product {
        const product = this.products.find((product) => product.sku === sku);

       
        return product;

    }
    
    list(sku: number): Product {

        const product = this.products.find((product) => product.sku === sku);

       
        return product;
    }

    delete(sku: number): void {
        
        const index = this.products.findIndex((product) => product.sku === Number(sku));

        this.products.splice(index,1);
        
    }

    edit(sku: number, name: string, ware_houses: []): void {
        const product = new Product();
        product.warehouses = [];
                     
        Object.assign(product, {
            sku,
            name,
        });

        ware_houses.forEach(element => {

            product.warehouses.push(element);
                            
        });
            
        this.products.push(product);
    };


   

}

export { ProductsRepository }