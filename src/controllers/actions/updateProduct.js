const knex = require("../../database");
const helpers = require("../helpers/productsHelpers")
const SkuReferenceError = require("../ProductsException/SkuReferenceError");
const NullRequestOrParamsError = require("../ProductsException/NullRequestOrParamsError");


module.exports = {
    async execute(req, res) {
        try {
            let productToUpdate = req.body;

            //failsafe 
            if(productToUpdate == {} || productToUpdate == null){
                throw new NullRequestOrParamsError();
            }

            let sku = productToUpdate.sku;

            let existsSku = await helpers.checkSku(sku);
            
            if(!existsSku) {
                throw new SkuReferenceError(`Product '${sku}' not found to update, use route GET '/product' to create a new one.`);
            }
            
            let waresToUp = productToUpdate.inventory.warehouses;

            // not a fully update and not a good a idea in a long term
            // kind of a 'pick your poison' situation
            
            await knex('warehouses')
                    .where({'product_sku': sku})
                    .del()
            
            for(var i=0; i<waresToUp.length; i++){
                await knex('warehouses').insert({
                        locality: waresToUp[i].locality,
                        quantity: waresToUp[i].quantity,
                        type: waresToUp[i].type,
                        product_sku: sku
                    });
            };


            await knex('products')
                        .where({'sku': sku})
                        .first()
                        .update({
                            'name': productToUpdate.name,
                        });
            return res
                .status(200)
                .send(`Product '${sku}' updated sucessfully.`);
        } catch(error) {
            if(error instanceof SkuReferenceError) {
                return res.status(400).send(error.message);
            } else if(error instanceof NullRequestOrParamsError) {
                return res.status(400).send("Body is empty, please re-check your request.");
            } else {
                return res.status(500).send("Sorry, it's not you, it's me");
            }
        }
    }
}