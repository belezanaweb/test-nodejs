export interface ProductResponse {
    sku: number;
    name: string;
    inventory: {
        quantity: number;
        warehouses: WarehouseResponse[];
    },
    isMarketable: boolean;
}

export interface WarehouseResponse {
    locality: string;
    quantity: number;
    type: string;
}