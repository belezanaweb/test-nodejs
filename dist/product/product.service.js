"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const in_memory_service_1 = require("../inMemory/in-memory.service");
let ProductService = class ProductService {
    constructor(inMemoryService) {
        this.inMemoryService = inMemoryService;
    }
    countQuantityProduct(warehouses) {
        if (!warehouses || warehouses.length === 0)
            return 0;
        return warehouses.reduce((total, local) => total + local.quantity, 0);
    }
    calculateValuesProduct(object) {
        const totalQuantity = this.countQuantityProduct(object.inventory.warehouses);
        const result = Object.assign(Object.assign({}, object), { inventory: Object.assign(Object.assign({}, object.inventory), { quantity: totalQuantity }), isMarketable: totalQuantity > 0 });
        return result;
    }
    findOrFail(sku) {
        const existingProduct = this.inMemoryService
            .getProducts()
            .find((product) => product.sku === sku);
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        return existingProduct;
    }
    failIfFind(sku) {
        const existingProduct = this.inMemoryService
            .getProducts()
            .find((product) => product.sku === sku);
        if (existingProduct) {
            throw new common_1.ForbiddenException('Product already exists');
        }
    }
    createProduct(schema) {
        this.failIfFind(schema.sku);
        const newProduct = this.inMemoryService.create(schema);
        return this.calculateValuesProduct(newProduct);
    }
    updateBySku(sku, schema) {
        this.findOrFail(sku);
        const changedProduct = this.inMemoryService.editProductBySku(sku, schema);
        return this.calculateValuesProduct(changedProduct);
    }
    findAll() {
        const allProducts = this.inMemoryService.getProducts();
        return allProducts.map((product) => this.calculateValuesProduct(product));
    }
    findOneBySku(sku) {
        this.findOrFail(sku);
        const foundedProduct = this.inMemoryService.getProductBySku(sku);
        return this.calculateValuesProduct(foundedProduct);
    }
    deleteBySku(sku) {
        this.findOrFail(sku);
        return this.inMemoryService.deleteProductBySku(sku);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_service_1.InMemoryService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map