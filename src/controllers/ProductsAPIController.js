const actionCreate = require("./actions/createProduct");
const actionGet = require("./actions/getProduct");
const actionDel = require("./actions/deleteProduct");
const actionUpdate = require("./actions/updateProduct");

class ProductsAPIController {
    createBySku = (req, res) => {
        return actionCreate.execute(req, res);
    }
    
    getBySku = (req, res) => {
        return actionGet.execute(req, res);
    }

    updateBySku = (req, res) => {
        return actionUpdate.execute(req, res);
    }

    deleteBySku = (req, res) => {
        return actionDel.execute(req, res);
    }
}

module.exports = new ProductsAPIController();