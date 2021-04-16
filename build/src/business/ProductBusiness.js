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
exports.ProductBusiness = void 0;
const ProductDatabase_1 = __importDefault(require("../data/ProductDatabase"));
class ProductBusiness {
    createProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductDatabase_1.default.createProduct(name);
                return { message: "Successfull product created" };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    editProductBySku(sku, id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductDatabase_1.default.editProductBySku(sku, id, quantity);
                return { message: "Successfull product edited" };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delProductBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ProductDatabase_1.default.delProductBySku(sku);
                return { message: "Successfull product deleted" };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProductBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultDB = yield ProductDatabase_1.default.getProductBySku(sku);
                let finalResult = [];
                for (let i = 0; i < resultDB.length; i++) {
                    let sameName = false;
                    for (let j = 0; j < i; j++) {
                        if (finalResult[j] && resultDB[i].product_sku === finalResult[j].sku) {
                            finalResult[j].inventory.warehouses.push({
                                locality: resultDB[i].locality,
                                quantity: resultDB[i].quantity,
                                type: resultDB[i].type
                            });
                            sameName = true;
                            break;
                        }
                    }
                    if (!sameName) {
                        let total = 0;
                        for (let k = 0; k < resultDB.length; k++) {
                            total = total + resultDB[k].quantity;
                        }
                        let market = false;
                        if (total > 0) {
                            market = true;
                        }
                        finalResult.push({
                            sku: resultDB[i].product_sku,
                            name: resultDB[i].name,
                            inventory: {
                                quantity: total,
                                warehouses: [{
                                        locality: resultDB[i].locality,
                                        quantity: resultDB[i].quantity,
                                        type: resultDB[i].type
                                    }]
                            },
                            isMarketable: market
                        });
                    }
                }
                const result = finalResult;
                return { result: result[0] };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ProductBusiness = ProductBusiness;
exports.default = new ProductBusiness();
//# sourceMappingURL=ProductBusiness.js.map