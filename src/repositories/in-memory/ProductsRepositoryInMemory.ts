
import { Product } from "../../model/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";


class ProductsRepositoryInMemory implements IProductsRepository {
    products: Product[];

    
    delete(sku: number): void {
        const product = new Product();

        Object.assign(product, {
            sku            
        });

        this.products.push(product);


        const index = this.products.findIndex((product) => product.sku === Number(sku));

        this.products.splice(index,1);


    }


    findByName(sku: number): Product {

        const product = this.products.find((product) => product.sku === sku);

        return product;
    }

    list(sku: number): Product {

        const product = this.products.find((product) => product.sku === sku);

        return product;
    }

    create( sku: number, name: string): void {
        const product = new Product();

        Object.assign(product, {
            sku, 
            name
        });

        this.products.push(product);

    }

    edit( sku: number, name: string): void{
        const product = new Product();

        Object.assign(product, {
            sku, 
            name
        });

        this.products.push(product);
    }

}

export { ProductsRepositoryInMemory };