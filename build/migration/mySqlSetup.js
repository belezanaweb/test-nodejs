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
exports.MySqlSetup = void 0;
const BaseDatabase_1 = __importDefault(require("../src/data/BaseDatabase"));
class MySqlSetup extends BaseDatabase_1.default {
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BaseDatabase_1.default.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase_1.default.PRODUCT_TABLE} (
                sku INT(5) PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL
            )
        `);
                yield BaseDatabase_1.default.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase_1.default.WAREHOUSE_TABLE} (
                id INT(11) PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                locality VARCHAR(255) NOT NULL,
                type ENUM("ECOMMERCE","PHYSICAL_STORE") NOT NULL
            )
        `);
                yield BaseDatabase_1.default.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${BaseDatabase_1.default.RELATIONAL_TABLE} (
                product_sku INT(5) NOT NULL,
                warehouse_id INT(11) NOT NULL,
                quantity INT(3) NOT NULL,
                FOREIGN KEY (product_sku) REFERENCES ${BaseDatabase_1.default.PRODUCT_TABLE}(sku),
                FOREIGN KEY (warehouse_id) REFERENCES ${BaseDatabase_1.default.WAREHOUSE_TABLE}(id)
            )
        `);
                console.log("MySql setup completed!");
                BaseDatabase_1.default.destroyConnection();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.MySqlSetup = MySqlSetup;
new MySqlSetup().createTable();
//# sourceMappingURL=mySqlSetup.js.map