"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLogic = void 0;
const typedi_1 = __importDefault(require("typedi"));
const factory_1 = require("../controller/factory");
const product_repository_1 = require("../repository/product-repository");
const utils_1 = require("../utils");
class ProductLogic {
    constructor() {
        this.repository = typedi_1.default.get(product_repository_1.ProductRepository);
    }
    createProduct(body) {
        const model = this.repository.findBySku(body.sku);
        if (model)
            throw new utils_1.HttpError(412, 'SKU already exists.');
        this.repository.save(body);
        utils_1.Logger.info(`Product [sku: ${body.sku}] created.`);
    }
    updateProduct(body) {
        const model = this.repository.findBySku(body.sku);
        if (!model)
            throw new utils_1.HttpError(412, 'SKU not found.');
        this.repository.update(body);
        utils_1.Logger.info(`Product [sku: ${body.sku}] updated.`);
    }
    findProduct(sku) {
        const model = this.repository.findBySku(sku);
        if (!model)
            return;
        return factory_1.ProductResponseFactory.create(model);
    }
    deleteProduct(sku) {
        const model = this.repository.findBySku(sku);
        if (!model)
            throw new utils_1.HttpError(412, 'SKU not found.');
        this.repository.delete(sku);
        utils_1.Logger.info(`Product [sku: ${sku}] deleted.`);
    }
}
exports.ProductLogic = ProductLogic;
//# sourceMappingURL=product-logic.js.map