const knex = require("../../database");
const helpers = require("../helpers/productsHelpers")
const SkuReferenceError = require("../ProductsException/SkuReferenceError");
const NullRequestOrParamsError = require("../ProductsException/NullRequestOrParamsError");


module.exports = {
    async execute(req, res) {
        try {
            let skuToGet = req.params;

            if(skuToGet == {}) {
                throw new productError.SkuReferenceError();
            }

            let existsSku = await helpers.checkSku(skuToGet.sku);

            if(!existsSku) {
                throw new SkuReferenceError(`Product '${skuToGet.sku}' not found.`);
            }

            let productToGet = await knex('products')
                                        .where({'sku': skuToGet.sku})
                                        .first()

            let totalQuantity = 0;
            let allWareHouses = [];

            await knex.raw(`select * from warehouses 
                            where product_sku = ${productToGet.sku}
                            `)
                    .then((ware) => 
                    {
                        totalQuantity += ware.rows.map(w => w.quantity).reduce((x, y) => x + y, 0);
                        allWareHouses.push(ware.rows);
                    })
                    

            let result = { 
                    "sku": productToGet.sku,
                    "name": productToGet.name,
                    "inventory":
                        {
                            "quantity": totalQuantity, 
                            "warehouses": allWareHouses
                        },
                    "isMarketable": totalQuantity > 0
                }

            return res.status(200).json(result);
        } catch(error) {
            if(error instanceof SkuReferenceError) {
                return res.status(400).send(error.message);
            } else if(error instanceof NullRequestOrParamsError) {
                return res.status(400).send("Parameter's empty, please re-check your request.");
            } else {
                return res.status(500).send("Sorry, it's not you, it's me");
            }
        }
    }
}