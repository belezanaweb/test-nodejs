const Utils = require('../utils/utils');

const data_produtcts = [];

class ProductsData {
    getAll() {
        return data_produtcts;
    }

    getBySku(sku) {
        let product = data_produtcts.filter(product => {
            return product.sku == sku;
        });

        return product.length > 0 ? product[0] : {};
    }

    create(new_product) {
        let product = this.getBySku(new_product.sku);

        if (!Utils.objIsEmpty(product)) {
            return {};
        }

        data_produtcts.push(new_product);
        return new_product;
    }

    delete(sku) {
        let product = this.getBySku(sku);

        if (!Utils.objIsEmpty(product)) {
            return data_produtcts.pop(product);;
        }

        return {};
    }

    update(sku, product) {
        let product_deleted = this.delete(sku);

        if(!Utils.objIsEmpty(product_deleted)) {
            return this.create(product);
        }

        return {};
    }
}

module.exports = new ProductsData();
