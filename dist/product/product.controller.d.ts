import { ProductService } from './product.service';
import { CreateProductSchema, EditProductSchema } from './schemas';
import { SkuSchema } from './schemas/sku.schema';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createSchema: CreateProductSchema): import("./entities/product.entity").ProductEntity;
    editProductBySku(params: SkuSchema, editSchema: EditProductSchema): import("./entities/product.entity").ProductEntity;
    getProducts(): import("./entities/product.entity").ProductEntity[];
    getProductBySku(params: SkuSchema): import("./entities/product.entity").ProductEntity;
    deleteProductBySku(params: SkuSchema): void;
}
