import { ProductModel } from "./models";

export class ProductRepository {

    private data: ProductModel[] = [
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
    ]

    public save(model: ProductModel): void {
        this.data.push(model);
    }

    public update(model: ProductModel): void {
        const index = this.data.findIndex(d => d.sku === model.sku);
        this.data.splice(index, 1, model);
    }

    public findBySku(sku: number): ProductModel {
        return this.data.find(d => d.sku === sku);
    }

    public delete(sku: number): void {
        const index = this.data.findIndex(d => d.sku === sku);
        this.data.splice(index, 1);
    }
}