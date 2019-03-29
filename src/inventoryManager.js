const memory = require('../memory.json');

exports.checkInventory = function checkInventory(product){
    var data = product.inventory;
    var warehouses = data.warehouses
    var totalStock = 0
    warehouses.forEach(location =>{
        totalStock += location.quantity;
    })
    return totalStock

}

exports.isMarketable = function isMarketable(stock){
    if(stock > 0){
        return true;
    } else{
        return false;
    }

}
