const knex = require("../../database");

module.exports = {
    async checkSku(sku) 
    {
        let SkuCounter = await knex('products')
                                    .where('sku', sku)
                                    .count();

        let countSku = SkuCounter[0]['count'];
        
        return countSku > 0;
    },
}