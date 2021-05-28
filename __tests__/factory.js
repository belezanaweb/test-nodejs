const ProductMock = require('./mockModel/productModelMock')

class MockFactory {
    constructor(){
        this.BobTheMockBuilder();
    }

    BobTheMockBuilder() {
        let seed = Math.floor(Math.random() * 100);
        let productMock =  new ProductMock(seed);
        return {
            "sku": productMock.sku,
            "name": productMock.name,
            "inventory": productMock.inventoryArr(),
        }
    }
}

module.exports = new MockFactory();