"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryService = void 0;
const common_1 = require("@nestjs/common");
let InMemoryService = class InMemoryService {
    constructor() {
        this.localData = [];
    }
    cleanDB() {
        this.localData = [];
    }
    create(object) {
        this.localData.push(object);
        return object;
    }
    editProductBySku(sku, object) {
        const existingProduct = this.getProductBySku(sku);
        existingProduct.name = object.name;
        existingProduct.inventory = object.inventory;
        return existingProduct;
    }
    getProducts() {
        return this.localData;
    }
    getProductBySku(sku) {
        return this.localData.find((product) => product.sku === sku);
    }
    deleteProductBySku(sku) {
        this.localData = this.localData.filter((product) => product.sku !== sku);
    }
};
InMemoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryService);
exports.InMemoryService = InMemoryService;
//# sourceMappingURL=in-memory.service.js.map