
const skuFromParam = (param) => {
    let sku = 0
    if (param && param.sku) {
        sku = parseInt(param.sku)
    }
    return sku
}

const indexBySku = (param, products) => {
    const sku = skuFromParam(param)
    return products.findIndex(el => el.sku === sku)
}

const calculate = (data) => {
    data.inventory = data.inventory || {}
    let quantity = 0
    if (data && data.inventory && data.inventory.warehouses && data.inventory.warehouses.length) {
        quantity = data.inventory.warehouses.reduce((acm, vl) => acm.quantity + vl.quantity)
    }
    data.inventory.quantity = quantity
    data.isMarketable = quantity > 0
    return data
}

module.exports = {
    skuFromParam,
    indexBySku,
    calculate
}