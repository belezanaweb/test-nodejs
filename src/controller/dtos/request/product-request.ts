export interface ProductBody {
    sku: number;
    name: string;
    inventory: {
        warehouses: [{
            locality: string;
            quantity: number;
            type: string;
        }];
    }
}