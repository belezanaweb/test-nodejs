import { Product } from "../model/Product";

interface IProductsRepository {
   
    create(sku: number, name: string, ware_houses: []): void;
    
    findByName(sku: number): Product;
    
    list(sku: number): Product;

    delete(sku: number): void;

    edit(sku: number, name: string, ware_houses: []): void;
} 

export { IProductsRepository }