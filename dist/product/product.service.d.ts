import { InMemoryService } from '../inMemory/in-memory.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductSchema, EditProductSchema } from './schemas';
export declare class ProductService {
    private readonly inMemoryService;
    constructor(inMemoryService: InMemoryService);
    private countQuantityProduct;
    private calculateValuesProduct;
    private findOrFail;
    private failIfFind;
    createProduct(schema: CreateProductSchema): ProductEntity;
    updateBySku(sku: number, schema: EditProductSchema): ProductEntity;
    findAll(): ProductEntity[];
    findOneBySku(sku: number): ProductEntity;
    deleteBySku(sku: number): void;
}
