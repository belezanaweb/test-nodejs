import { CreateProductSchema } from '../product/schemas/create-product.schema';
import { EditProductSchema } from '../product/schemas/edit-product.schema';
export declare class InMemoryService {
    localData: CreateProductSchema[];
    constructor();
    cleanDB(): void;
    create(object: CreateProductSchema): CreateProductSchema;
    editProductBySku(sku: number, object: EditProductSchema): CreateProductSchema;
    getProducts(): CreateProductSchema[];
    getProductBySku(sku: number): CreateProductSchema;
    deleteProductBySku(sku: number): void;
}
