const express = require('express');

const app = express();

app.use(express.json());

const products = [];

app.post('/product', (request, response) => {
    const {sku, name, inventory} = request.body;

    const productIndex = products.find(product => product.sku == sku);

    if(productIndex){
      return response.status(400).json({error: 'Product already exists!'});
    }

    const product = {
        sku,
        name,
        inventory
    }

    products.push(product);

    return response.json(product);
});

app.get('/product/:sku', (request, response) => {
    const { sku } = request.params;

    const product = products.find(product => product.sku == sku);

    if(!product) {
        return response.status(400).json({error: 'Product not found.'});
    }

    let quantity = 0;
    product.inventory.warehouses.forEach(warehouse => {
        quantity += warehouse.quantity;
    })

    const inventory = {
        quantity,
        warehouses: product.inventory.warehouses
    }

    const newProduct = {
        sku,
        name: product.name,
        inventory,
        isMarketable: quantity > 0 ? true : false
    }

    return response.json(newProduct);
});

app.put('/product/:sku', (request, response) => {
    const { sku } = request.params;
    const {name, inventory} = request.body;

    const productIndex = products.findIndex(product => product.sku == sku);

    if(productIndex < 0) {
      return response.status(400).json({error: 'Product not found'});
    }

    const product = {
      sku,
      name,
      inventory
    }

    products[productIndex] = product;

    return response.json(product);
});

app.delete("/product/:sku", (request, response) => {
    const { sku } = request.params;

    const productIndex = products.findIndex(product => product.sku == sku);

    if(productIndex < 0){
      return response.status(400).json({error: 'Product not found.'});
    }

    products.splice(productIndex, 1);

    return response.status(204).send();
  });

app.listen(3333, () => {
    console.log('Back-end started! 🦾 ');
});