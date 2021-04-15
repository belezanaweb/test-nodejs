"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controller/ProductController"));
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/post", ProductController_1.default.createProduct);
exports.productRouter.put("/:id", ProductController_1.default.editProductBySku);
exports.productRouter.delete("/:id", ProductController_1.default.delProductBySku);
//# sourceMappingURL=ProductRouter.js.map