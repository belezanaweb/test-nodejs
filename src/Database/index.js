const products = require('./data/products.json')
// const products = {}

exports.getAll = async () => {
  const foundProducts = products
  return foundProducts
}

exports.getBySKU = async (SKU) => {
  const foundProduct = products.find(product => product.sku === parseInt(SKU))
  if (!foundProduct) {
    return {
      message: `SKU ${SKU} não encontrado`,
      status: 404
    }
  }
  foundProduct.inventory.quantity = foundProduct.inventory.warehouses.reduce((a, b) => a + b.quantity, 0)
  foundProduct.isMarketable = foundProduct.inventory.quantity > 0
  return { data: foundProduct, status: 200 }
}

exports.create = async (product) => {
  const { sku } = product
  if (!sku) {
    return {
      message: 'SKU não informado',
      status: 404
    }
  }
  const foundSKU = await this.getBySKU(sku)
  if (foundSKU.status === 200) {
    return { message: `SKU ${ sku } já existe`, status: 404 }
  }
  products.push(product)
  return { message: `SKU ${ sku } criado com sucesso!`, status: 201 }
}

exports.update = async (SKU, product) => {
  const { sku } = product
  if (sku !== parseInt(SKU)) {
    return { message: `SKU ${ SKU } informado é diferente do SKU ${ sku } que está tentando atualizar`, status: 404 }
  }
  if (!sku || !parseInt(SKU)) {
    return { message: 'SKU não informado', status: 404 }
  }
  const foundSKU = await this.getBySKU(parseInt(SKU))
  if (foundSKU.status === 404) {
    return { message: foundSKU.message, status: foundSKU.status }
  }
  const index = products.indexOf(foundSKU.data)
  products.splice(index, 1, product)
  return { message: `SKU ${ sku } atualizado com sucesso!`, status: 200 }
}

exports.delete = async (SKU) => {
  const foundSKU = await this.getBySKU(parseInt(SKU))
  const index = products.indexOf(foundSKU)
  if (foundSKU.status === 404) {
    return { message: foundSKU.message, status: foundSKU.status }
  }
  products.splice(index, 1)
  return { message: `SKU ${ SKU } removido com sucesso!`, status: 204 }
}
