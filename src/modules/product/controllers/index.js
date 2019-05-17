const { skuFromParam, indexBySku,calculate } = require('modules/product/helpers/product-parse')
const products = []
const controllers = {}

controllers.post = async ({ error, payload }) => {
    const index = indexBySku(payload, products)
    if (index >= 0) throw error.buildError(400, 'Sku already exists')
    const data = calculate(payload)
    products.push(data)
    return data
}

controllers.put = async ({ error, params, payload }) => {
    const index = indexBySku(params, products)
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
    const index = indexBySku(params, products)
    if (index < 0) throw error.buildError(404, 'Not found')
    products.splice(index, 1)
    return null
}

module.exports = controllers