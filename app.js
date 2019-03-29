const express = require('express');
const app = express();
const port = 7000;
const product = require('./src/productManager.js');

app.use(express.json());

app.get('/get/:sku', function(req, res){
    var sku = parseInt(req.params.sku);
    var response = product.getProduct(sku)
    console.log(response)
    res.json(response)
});

app.post('/create', function(req, res){
    var newProduct = req.body;
    var response = product.createProduct(newProduct);
    console.log(response);
    res.json(response);
});

app.post('/edit', function(req, res){
    var editedProduct = req.body;
    var response = product.editProduct(editedProduct);
    console.log(response);
    res.json(response)
});

app.get('/delete/:sku', function(req, res){
    var sku = parseInt(req.params.sku);
    var response = product.deleteProduct(sku);
    console.log(response);
    res.json(response)

});

app.get('/check_stock', function(req, res){
    var response = product.allStock();
    console.log(response);
    res.json(response)
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})