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

            let existsSku = await helpers.checkSku(productToUpdate.sku);
            
            if(!existsSku) {
                throw new SkuReferenceError(`Product '${productToUpdate.sku}' not found to update, use route GET '/product' to create a new one.`);
            }
            
            let warehouseToUpdate = productToUpdate.inventory.warehouses;

            for(var i=0; i<warehouseToUpdate.length; i++)
            {
                await knex.raw(`select * from warehouses 
                                where product_sku = ${productToUpdate.sku}
                                and type = `)
                            .then((ware) => 
                            {
                                ware.update({'quantity': wareToUp.quantity})
                            });
            }

            await knex('products')
                        .where({'sku': productToUpdate.sku})
                        .first()
                        .update({
                            'name': productToUpdate.name,
                        });
            return res
                .status(200)
                .send(`Product '${productToUpdate.sku}' updated sucessfully.`);
        } catch(error) {
            if(error instanceof SkuReferenceError) {
                return res.status(400).send(error.message);
            } else if(error instanceof NullRequestOrParamsError) {
                return res.status(400).send(error.message);
            } else {
                return res.status(500).send("Sorry, it's not you, it's me");
            }
        }
    }
}