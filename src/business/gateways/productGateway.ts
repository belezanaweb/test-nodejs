import { Product, Inventory } from "../entities/product";

export interface ProductGateway {
    createProduct(product: Product): Promise<void>;
    getProductBySKU(sku: number): Promise<Product | undefined>;
    updateProduct(
        sku: number,
        name: string,
        inventory: Inventory): Promise<void>;
    deleteProduct(sku: number): Promise<void>
    
}