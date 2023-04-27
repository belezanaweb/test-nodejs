export type inventoryType = {
    warehouses: warehouseType[]
}

export type warehouseType = {
    locality: string,
    quantity: number,
    type: string
}