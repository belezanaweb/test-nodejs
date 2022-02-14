const checksIsProduct = require('../utils/checksIsProduct');
const products = require('../mock/products')

module.exports = {

    async index(request, response) {
        const { sku } = request.params;
  
        const product = products.find((product) => product.sku == sku);
      
        const result  = checksIsProduct(product)
      
        response.status(200).json(result)
    },

    async store(request, response) {
        const { sku } = request.body;

        const productAlreadyExists = products.some((product) => product.sku === sku);
        
        if(productAlreadyExists) {
          response.status(400).send({error: `Product already exists!`})
        }
      
        products.push(request.body)
      
        response.status(201).json(request.body);
    },

    async update(request, response) {
        const { sku } = request.params;

        const index = products.findIndex((product) => product.sku == sku);

        products[index] = request.body

        return response.status(200).send(request.body)
    },

    async destroy(request, response) {
        const { sku } = request.params;

        const index = products.findIndex((product) => product.sku == sku)
        const productDeleted = products[index]

        products.splice(index, 1)

        return response.status(200).json({message: "Product deleted with success", productDeleted: productDeleted});
    },
};
