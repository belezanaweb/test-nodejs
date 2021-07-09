"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("./middleware/error-handler");
const product_router_1 = __importDefault(require("./router/product-router"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.setMiddlewaresBefore();
        this.setRoutes();
        this.setMiddlewaresAfter();
    }
    setRoutes() {
        this.app.use('/', product_router_1.default);
    }
    setMiddlewaresBefore() {
        this.app.use(express_1.default.json({ limit: '10mb' }));
    }
    setMiddlewaresAfter() {
        this.app.use(error_handler_1.ErrorHandler.handle);
    }
}
exports.default = new Application().app;
//# sourceMappingURL=app.js.map