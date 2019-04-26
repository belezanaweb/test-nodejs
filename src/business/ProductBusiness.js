

class ProductBusiness{

    constructor(products){
        this.products = products || [];
    }

    add(product){
        return product;
    }

    edit(product){
        return product;
    }

    delete(product){
        return product;
    }

    get(product){
        return this.products[0];
    }

    getAll(){
        return this.products;
    }

}

module.exports = ProductBusiness;