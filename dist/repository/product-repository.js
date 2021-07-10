"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor() {
        this.data = [
            {
                sku: 43264,
                name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
                inventory: {
                    warehouses: [
                        {
                            locality: "SP",
                            quantity: 12,
                            type: "ECOMMERCE"
                        },
                        {
                            locality: "MOEMA",
                            quantity: 3,
                            type: "PHYSICAL_STORE"
                        }
                    ]
                }
            }
        ];
    }
    save(model) {
        this.data.push(model);
    }
    update(model) {
        const index = this.data.findIndex(d => d.sku === model.sku);
        this.data.splice(index, 1, model);
    }
    findBySku(sku) {
        return this.data.find(d => d.sku === sku);
    }
    delete(sku) {
        const index = this.data.findIndex(d => d.sku === sku);
        this.data.splice(index, 1);
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product-repository.js.map