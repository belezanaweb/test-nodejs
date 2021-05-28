const ProductMock = require('./mockModel/productModelMock')

/*
* Note: it's not a reliable random generator,
* I'd receive a Field's Medal if I did it...
*/

class MockFactory {
    constructor(){
        this.BobTheMockBuilder();
    }

    BobTheMockBuilder() {
        let seed = Math.floor(Math.random() * 10);
        let productMock =  new ProductMock(seed);
        return {
            "sku": productMock.sku,
            "name": productMock.name,
            "inventory": productMock.inventoryArr(),
        }
    }
}

module.exports = new MockFactory();