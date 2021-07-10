"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typedi_1 = require("typedi");
const product_controller_1 = require("../controller/product-controller");
const utils_1 = require("../utils");
const product_schema_1 = require("./schemas/product-schema");
class ProductRouter {
    constructor() {
        this.router = express_1.default.Router();
        const controller = typedi_1.Container.get(product_controller_1.ProductController);
        this.router.post('/products', utils_1.ValidationUtils.validate(product_schema_1.ProductSchema.POST_PRODUCT), (req, res, next) => controller.postProduct(req, res, next));
        this.router.put('/products/:sku', utils_1.ValidationUtils.validate(product_schema_1.ProductSchema.PUT_PRODUCT), (req, res, next) => controller.putProduct(req, res, next));
        this.router.get('/products/:sku', utils_1.ValidationUtils.validate(product_schema_1.ProductSchema.GET_PRODUCT), (req, res, next) => controller.getProduct(req, res, next));
        this.router.delete('/products/:sku', utils_1.ValidationUtils.validate(product_schema_1.ProductSchema.DELETE_PRODUCT), (req, res, next) => controller.deleteProduct(req, res, next));
    }
}
exports.default = new ProductRouter().router;
//# sourceMappingURL=product-router.js.map