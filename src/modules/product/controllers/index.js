const products = []
const controllers = {}

controllers.post = async ({ error, payload }) => {
    const index = indexBySku(payload)
    if (index >= 0) throw error.buildError(400, 'Sku already exists')
    const data = calculate(payload)
    products.push(data)
    return data
}

controllers.put = async ({ error, params, payload }) => {
    const index = indexBySku(params)
    if (index < 0) throw error.buildError(404, 'Not found')
    const data = calculate(payload)
    products[index] = data
    return data
}

controllers.getBySku = async ({ error, params }) => {
    const sku = skuFromParam(params)
    let data = products.find(el => el.sku === sku)
    if (!data) throw error.buildError(404, 'Not found')
    data = calculate(data)
    return data
}

controllers.del = async ({ error, params }) => {
    const index = indexBySku(params)
    if (index < 0) throw error.buildError(404, 'Not found')
    products.splice(index, 1)
    return null
}

const skuFromParam = (param) => {
    let sku = 0
    if (param && param.sku) {
        sku = parseInt(param.sku)
    }
    return sku
}

const indexBySku = (param) => {
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

module.exports = controllers