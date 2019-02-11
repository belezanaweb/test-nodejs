const express = require('express');
const router = express.Router();
const _ = require('lodash');

const appStorage = require('localStorage');

router.get('/',   (req, res) => {

    try {
        if(!req.query.sku)
        {
            res.status(400).send({'error' : 'Sku cannot be empty.'});
            return;
        }
        let _sku = req.query.sku;
        let product =  getOne(_sku);
        if(!product)
        {
            res.status(400).send({'error' : 'Cannot find product.'});
    
        }
        else{
            res.send(product);
        }
    }
    catch(err)
    {
        res.status(400).send({ 'error' : 'Error to get product.'});
    }
 
 });
 

 let getOne = (_sku) => {

    let filteredProducts = JSON.parse(appStorage.getItem(_sku));
     if(filteredProducts)
     {
        let quantityTotal = 0;
 
         if(filteredProducts.inventory && filteredProducts.inventory.warehouses) // if not exists inventory or warehouses, quantityTotal is 0
         {
             quantityTotal = _.sumBy(filteredProducts.inventory.warehouses, 'quantity');

         }
         filteredProducts.inventory.quantity = quantityTotal;
         filteredProducts.isMarketable = quantityTotal > 0; //isMarketable if quantityTotal is greater then 0
     }
     return filteredProducts;
 
 };
 
 
 router.post('/', (req, res) => {
    try {

        var product = req.body;//
        var errors = [];
        if(!product)
        {
            res.status(400)({'error' : 'Product is empty'});
        }
        else {
            req.checkBody('sku', 'Sku need to be Int').isInt();
            req.checkBody('name', 'Name is required').notEmpty();
            
            errors = req.validationErrors();
            if(errors && errors.length > 0){
                res.status(400).send({'error': errors});
                return;
            }
            else if (getOne(product.sku))
            {
                errors = 'Product already exists.';
            }
            else{
                let _sku = parseInt(product.sku);
                appStorage.setItem(_sku, JSON.stringify(product));
                res.send('Product iserted!');
            }            
        }
    }
    catch(err)
    {
        res.status(400).send({ 'error' : 'Error to insert product.'});
    }
 });
 
 router.put('/', (req, res) => {
     try {
        var product = req.body;//
        var errors = [];
        if(!product)
        {
            res.status(400).send({'error' : 'Product is empty'});
        }
        else {
            req.checkBody('sku', 'Sku need to be Int').isInt();
            req.checkBody('name', 'Name is required').notEmpty();
    
            errors = req.validationErrors();
    
            if(errors && errors.length > 0){
                res.status(400).send({'error': errors});
                return;
            }
            else if (!getOne(product.sku))
            {
                res.status(400).send({'error' : 'Product not exists'});
                return;
            }
            else{
                let _sku = parseInt(product.sku);
                appStorage.setItem(_sku, JSON.stringify(product));
                res.send('Product updated!');
            }        
        }
    }
    catch(err)
    {
        res.status(400).send({ 'error' : 'Error to update product.'});
    }
 });
 
 
 router.delete('/', (req, res) => {
 
    try {
        if(!req.query || !req.query.sku)
        {
            res.status(400).send({'error' : 'Sku cannot be empty.'});
        }
        else if (!getOne(req.query.sku))
        {
            res.status(400).send({'error' : 'Product not exists.'});
        }
        else
        {
            let _sku = req.query.sku;
            appStorage.removeItem(_sku);     
            res.send('Product deleted.');
        }
    }
    catch(err)
    {
        res.status(400).send({ 'error' : 'Error to delete product.'});
    }
 
 });

module.exports = app => app.use('/product', router);