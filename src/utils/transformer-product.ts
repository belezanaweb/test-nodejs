import Product from '../models/Product';

const transformProduct = (product: Product) => {
    const warehouses = product.inventory.warehouses
    let quantity = 0;
    for(let warehouse of warehouses) {
        quantity = quantity+warehouse.quantity;
    } 
    product.inventory.quantity = quantity;
    product.isMarketable =  product.inventory.quantity > 0 ? true : false; 
    return product;
}

export  { transformProduct };
