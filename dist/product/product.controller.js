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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const schemas_1 = require("./schemas");
const sku_schema_1 = require("./schemas/sku.schema");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(createSchema) {
        return this.productService.createProduct(createSchema);
    }
    editProductBySku(params, editSchema) {
        return this.productService.updateBySku(params.sku, editSchema);
    }
    getProducts() {
        return this.productService.findAll();
    }
    getProductBySku(params) {
        return this.productService.findOneBySku(params.sku);
    }
    deleteProductBySku(params) {
        return this.productService.deleteBySku(params.sku);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schemas_1.CreateProductSchema]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)(':sku'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sku_schema_1.SkuSchema,
        schemas_1.EditProductSchema]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "editProductBySku", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(':sku'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sku_schema_1.SkuSchema]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductBySku", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':sku'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sku_schema_1.SkuSchema]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProductBySku", null);
ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map