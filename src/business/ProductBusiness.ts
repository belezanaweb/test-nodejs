import ProductDatabase from "../data/ProductDatabase";

export class ProductBusiness {

    public async createProduct(name:string) {
        try {
            await ProductDatabase.createProduct(name)

            return { message: "Successfull product created" };
        }
        catch (error) {
            console.log(error)
        }
    }

    public async editProductBySku(sku:number, id:number, quantity:number) {
        try {
            await ProductDatabase.editProductBySku(sku, id, quantity)

            return { message: "Successfull product edited" };
        }
        catch (error) {
            console.log(error)
        }
    }

    public async delProductBySku(sku:number) {
        try {
            await ProductDatabase.delProductBySku(sku)

            return { message: "Successfull product deleted" };
        }
        catch (error) {
            console.log(error)
        }
    }

    public async getProductBySku(sku:number) {
        try {
            const resultDB = await ProductDatabase.getProductBySku(sku)

            let finalResult = [];
            
            for (let i = 0; i < resultDB.length; i++) {
               let sameName = false;

                for (let j = 0; j < i; j++) {
                    if (finalResult[j] && resultDB[i].product_sku === finalResult[j].sku) {
                        finalResult[j].inventory.warehouses.push({
                            locality: resultDB[i].locality,
                            quantity: resultDB[i].quantity,
                            type: resultDB[i].type
                    })

                    sameName = true;
                    break;
                    }
                }
               
                if (!sameName) {
                    // console.log(resultDB)
                    let total: number = 0
                    for (let k=0; k < resultDB.length; k++){
                        total = total + resultDB[k].quantity
                    }
                    let market: boolean = false
                    if (total>0) {
                        market = true
                    }
                    finalResult.push({
                        sku: resultDB[i].product_sku,
                        name: resultDB[i].name,
                        inventory: {
                            quantity: total,
                            warehouses:[{
                                locality: resultDB[i].locality,
                                quantity: resultDB[i].quantity,
                                type: resultDB[i].type
                            }]
                        },
                        isMarketable: market
                    })
                }
            }

            const result = finalResult
            return { result: result[0] };
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default new ProductBusiness()