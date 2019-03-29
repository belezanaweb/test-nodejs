const memory = require('../memory.json');
const inventory = require('./inventoryManager')

exports.getProduct = function getProduct(sku){
    console.log('Searching product...')
    var resp = {
        "success": "",
        "message": "",
        "payload":[]
    };
    memory.forEach(product => {
        if(product.sku == sku){
            resp.payload.push(product)
        }
    });

    if(resp.payload.length > 0){
        resp.success = true;
        resp.message = "Product found";
        var stock = inventory.checkInventory(resp.payload[0])
        resp.payload[0].inventory.quantity = stock
        resp.payload[0].isMarketable = inventory.isMarketable(stock)
        return resp

    } else {
        resp.success = false;
        resp.message = "Product not found";
        return resp

    }
}

exports.createProduct = function createProduct(newProduct){
    var resp = {
        "success": "",
        "message":""
    };

    if(!newProduct.hasOwnProperty("sku")){
        resp.success = false;
        resp.message = "SKU field missing from new product"
        return resp

    };

    var isUnique = true;
    memory.forEach(item =>{
        if(newProduct.sku == item.sku){
            isUnique = false;
        }
    })
    if(isUnique){
        try {
            memory.push(newProduct);
            resp.success = true;
            resp.message = "New product created with success" 
            return resp
        } catch(err){
            resp.success = false;
            resp.message = "Error creating new product in memory"
            return resp
        }
    } else {
        resp.success = false;
        resp.message = "A product with this SKU already exists in memory"
        return resp
    }
}

exports.editProduct = function editProduct(editedProduct){
    var resp = {
        "success": "",
        "message":""
    };
    if(!editedProduct.hasOwnProperty("sku")){
        resp.success = false;
        resp.message = "SKU field missing from edited product"
        return resp

    };
    var newSku = editedProduct.sku;
    var skuFound = false;
    memory.forEach(product =>{
        if(newSku == product.sku){
            product.sku = editedProduct.sku;
            product.name = editedProduct.name;
            product.inventory = editedProduct.inventory;
            product.isMarketable = editedProduct.isMarketable;
            skuFound = true;
        }
    })
    if(!skuFound){
        resp.success = false;
        resp.message = `Product with SKU ${newSku} not found`
        return resp
    }
    resp.success = true;
    resp.message = "Product updated with success"
    return resp
};

exports.deleteProduct = function deleteProduct(sku){
    var resp = {
        "success": "",
        "message":""
    };
    var skuFound = false;
    for(var i = 0; i < memory.length; i++){
        if(sku == memory[i].sku){
            memory.splice(i, 1);
            skuFound = true;
        }
    }
    if(!skuFound){
        resp.success = false;
        resp.message = `Product with SKU ${sku} not found`
        return resp;
    };

    resp.success = true;
    resp.message = `Product with SKU ${sku} successfully removed`;
    return resp
};

exports.allStock = function allStock(){
    return memory
}
