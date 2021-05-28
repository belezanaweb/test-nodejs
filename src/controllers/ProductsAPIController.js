const actionCreate = require("./actions/createProduct");
const actionGet = require("./actions/getProduct");

class ProductsAPIController {
    createBySku = (req, res) => {
        return actionCreate.execute(req, res);
    }
    
    getBySku = (req, res) => {
        return actionGet.execute(req, res);
    }
}

module.exports = new ProductsAPIController();