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
exports.ProductDatabase = void 0;
const BaseDatabase_1 = __importDefault(require("./BaseDatabase"));
const BaseDatabase_2 = __importDefault(require("./BaseDatabase"));
class ProductDatabase extends BaseDatabase_1.default {
    createProduct(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection.raw(`
                INSERT INTO ${BaseDatabase_2.default.PRODUCT_TABLE} (name)
                VALUES (
                    "${name}"
                )
            `);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.ProductDatabase = ProductDatabase;
exports.default = new ProductDatabase();
//# sourceMappingURL=ProductDatabase.js.map