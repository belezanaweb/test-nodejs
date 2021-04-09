"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var TypeWarehouse;
(function (TypeWarehouse) {
    TypeWarehouse["ECOMMERCE"] = "ECOMMERCE";
    TypeWarehouse["PHYSICAL_STORE"] = "PHYSICAL_STORE";
})(TypeWarehouse || (TypeWarehouse = {}));
class Product {
    constructor(sku, name, inventory, warehouses, locality, quantity, type, isMarketable) {
        this.sku = sku;
        this.name = name;
        this.inventory = inventory;
        this.warehouses = warehouses;
        this.locality = locality;
        this.quantity = quantity;
        this.type = type;
        this.isMarketable = isMarketable;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map