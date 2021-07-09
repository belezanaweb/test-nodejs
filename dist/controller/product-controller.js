"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const typedi_1 = __importDefault(require("typedi"));
const logic_1 = require("../logic");
const utils_1 = require("../utils");
class ProductController {
    constructor() {
        this.logic = typedi_1.default.get(logic_1.ProductLogic);
    }
    postProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                this.logic.createProduct(body);
                res.status(201).send();
            }
            catch (err) {
                utils_1.Logger.error('ProductController::postProduct', err);
                next(err);
            }
        });
    }
    putProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                this.logic.updateProduct(body);
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sku = Number(req.query.sku);
                const product = this.logic.findProduct(sku);
                if (product) {
                    res.status(200).send(product);
                }
                else {
                    res.status(204).send();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sku = Number(req.query.sku);
                this.logic.deleteProduct(sku);
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product-controller.js.map