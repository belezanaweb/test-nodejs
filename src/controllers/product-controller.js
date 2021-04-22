const Utils = require('../utils/utils');
const ProductsData = require('../repositories/product-repository');

const NotFound = require('../utils/errors/NotFound');
const InvalidParameter = require('../utils/errors/InvalidParameter');
const InvalidFields = require('../utils/errors/InvalidFields');

class ProductsController {
    getAll() {
        return ProductsData.getAll();
    }

    getOne(sku) {
        let product;

        if(!sku)
            throw new InvalidParameter("sku");

        product = ProductsData.getBySku(sku);

        if(Utils.objIsEmpty(product)) {
            throw new NotFound("No product found");
        } else {
            let quantity = 0;
            
            product.inventory.warehouses.forEach(el => { quantity += el.quantity });

            product.inventory.quantity = quantity;
            product.isMarketable = quantity > 0;
        }

        return product;
    }

    create(new_product) {
        let result;
        let errors = this.validation(new_product);

        if(errors.length != 0) {
            throw new InvalidFields(errors);
        }

        result = ProductsData.create({
            sku: new_product.sku,
            name: new_product.name,
            inventory: {
                warehouses: new_product.inventory.warehouses
            }
        });

        if(Utils.objIsEmpty(result))
            throw new NotFound("No product found");

        return result;
    }

    delete(sku) {
        let result;
        if(!sku)
            throw new InvalidParameter("sku");

        result = ProductsData.delete(sku);

        if(Utils.objIsEmpty(result))
            throw new NotFound("No product found");

        return result;
    }

    update(sku, product) {
        let result;
        let errors = this.validation(product);

        if(!sku)
            throw new InvalidParameter("sku");

        if(errors.length != 0) {
            throw new InvalidFields(errors);
        }

        result = ProductsData.update(sku, {
            sku: product.sku,
            name: product.name,
            inventory: {
                warehouses: product.inventory.warehouses
            }
        });

        if(Utils.objIsEmpty(result))
            throw new NotFound("No product found");

        return result;
    }

    validation(data){
        let validations = [
            {
                field: 'sku',
                error: 'This field is required',
                validate: (value) => (value != undefined && value)
            },
            {
                field: 'name',
                error: 'This field is required',
                validate: (value) => (value != undefined && value)
            },
            {
                field: 'inventory',
                error: 'The warehouse\'s quantity is required',
                validate: (value) => {
                    let valid = true;
                    value.warehouses.forEach(el => {
                        if(el.quantity == undefined || !el.quantity)
                            valid = false;
                    });

                    return valid;
                }
            }
        ]
        
        return validations.filter(validate => {
            return !validate.validate( data[validate.field] );
        });
    }
}

module.exports = new ProductsController();