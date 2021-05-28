const knex = require("../../database");
const helpers = require("../helpers/productsHelpers")
const SkuReferenceError = require("../ProductsException/SkuReferenceError");
const NullRequestOrParamsError = require("../ProductsException/NullRequestOrParamsError");


module.exports = {
    async execute(req, res) {
        try{
            let productToBe = req.body;

            //failsafe
            if(productToBe == null){
                throw new NullRequestOrParamsError();
            }

            let existsSku = await helpers.checkSku(productToBe.sku);

            if(existsSku){
                throw new SkuReferenceError("Product already inserted. If you're trying to update, use route PUT '/product/update'");
            }

            let wares = productToBe.inventory.warehouses;

            await knex('products')
                        .insert({
                            sku: productToBe.sku,
                            name: productToBe.name,
                        });

            for(var i=0; i<wares.length; i++){
                await knex('warehouses').insert({
                        locality: wares[i].locality,
                        quantity: wares[i].quantity,
                        type: wares[i].type,
                        product_sku: productToBe.sku
                    });
            };

            return res
                .status(200)
                .send(`Product '${productToBe.sku}' sucessfully added.`);
        }
        catch(error){
            if(error instanceof SkuReferenceError){
                return res
                    .status(400)
                    .send(error.message);
            } else if(error instanceof NullRequestOrParamsError) {
                return res
                    .status(400)
                    .send("Body is empty, please re-check your request.");
            } else {
                return res.status(500);
            }
        }
    }
}