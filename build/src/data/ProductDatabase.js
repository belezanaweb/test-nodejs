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
    editProductBySku(sku, id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const warehouse = yield BaseDatabase_1.default.connection.raw(`
                SELECT * FROM ${BaseDatabase_2.default.RELATIONAL_TABLE}
                WHERE product_sku=${sku} AND warehouse_id=${id};
            `);
                if (warehouse[0].length === 0) {
                    yield BaseDatabase_1.default.connection.raw(`
                    INSERT INTO ${BaseDatabase_2.default.RELATIONAL_TABLE}
                    VALUES (
                        ${sku},
                        ${id},
                        ${quantity}
                    )
                `);
                }
                else {
                    yield BaseDatabase_1.default.connection.raw(`
                    UPDATE ${BaseDatabase_2.default.RELATIONAL_TABLE}
                    SET quantity=${quantity}
                    WHERE product_sku=${sku} AND warehouse_id=${id};
            `);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delProductBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection.raw(`
                DELETE FROM ${BaseDatabase_2.default.RELATIONAL_TABLE}
                WHERE product_sku=${sku};
            `);
                yield BaseDatabase_1.default.connection.raw(`
                DELETE FROM ${BaseDatabase_2.default.PRODUCT_TABLE}
                WHERE sku=${sku};
            `);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getProductBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield BaseDatabase_1.default.connection.raw(`
                SELECT * FROM ${BaseDatabase_2.default.RELATIONAL_TABLE} rel
                LEFT JOIN ${BaseDatabase_2.default.WAREHOUSE_TABLE} wh ON rel.warehouse_id = wh.id
                LEFT JOIN ${BaseDatabase_2.default.PRODUCT_TABLE} pr ON rel.product_sku = pr.sku
                WHERE product_sku=${sku};
            `);
                const newResult = yield BaseDatabase_1.default.connection.raw(`
                SELECT * FROM ${BaseDatabase_2.default.PRODUCT_TABLE}
                WHERE sku=${sku};
            `);
                if (result[0].length > 0) {
                    return (result[0]);
                }
                else {
                    return (newResult[0]);
                }
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