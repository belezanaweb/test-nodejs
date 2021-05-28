const faker = require("faker");

class ProductMock {
    constructor(x) {
        this.sku = faker.datatype.number();
        this.name = faker.lorem.sentence();
        this.inventory = inventoryArr(x);
    }

    inventoryArr = (x) => {
        const result = [];
        for(var i = 0; i<=x; i++) {
            result.push({
                "locality": faker.address.city(),
                "quantity": faker.datatype.number(),
                "type": faker.lorem.word()
            })
        }
        return result;
    }
}

module.exports = ProductMock;