const knex = require("../../database");
const helpers = require("../helpers/productsHelpers")
const SkuReferenceError = require("../ProductsException/SkuReferenceError");
const NullRequestOrParamsError = require("../ProductsException/NullRequestOrParamsError");


module.exports = {
    async execute(req, res) {
        try {

            let paramsToDel = req.params;

            if(paramsToDel == {}) {
                throw new productError.NullRequestOrParamsError();
            }

            let skuToDel = paramsToDel.sku;

            let existsSku = await helpers.checkSku(skuToDel);

            if(!existsSku) {
                throw new SkuReferenceError(`Sku '${skuToDel}' not found, use route POST '/product' to create.`);
            }

            await knex('warehouses')
                .where({'product_sku': skuToDel})
                .del()

            await knex('products')
                .where({'sku': skuToDel})
                .del()
            
            return res
                .status(200)
                .send(`Product '${skuToDel}' deleted sucessfully.`);
        } catch(error) {
            if(error instanceof SkuReferenceError) {
                return res.status(400).send(error.message);
            } else if(error instanceof NullRequestOrParamsError) {
                return res
                        .status(400)
                        .send("Parameter's empty, please re-check your request.");
            }
            else {
                return res.status(500).send("Sorry, it's not you, it's me");
            }
        }
    }
}