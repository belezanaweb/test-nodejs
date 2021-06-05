const products = require("./data/products.json");

exports.getBySKU = async (SKU) => {
    const produto = products.find(produto => produto.sku == SKU)
    return produto
}

exports.deleteBySKU = async (SKU) => {
    const produto = await this.getBySKU(SKU)
    const index = products.indexOf(produto)
    if (index > -1) {
        products.splice(index, 1)
        return true
    }
    return false
}

exports.updateBySKU = async (SKU, product) => {
    const produto = await this.getBySKU(SKU)
    if (produto) {
        const index = products.indexOf(produto)
        products.splice(index, 1, product)
        return true
    }
    return false
}

exports.create = async (product) => {
    const { sku } = product;
    if (!sku) {
        return { 'message': 'SKU não informado', 'status': false }
    }
    const isExist = await this.getBySKU(sku)
    if (isExist) {
        return { 'message': 'SKU informado já existe', 'status': false }
    }
    products.push(product)
    return { 'message': 'Produto criado com sucesso!', 'status': true }
}