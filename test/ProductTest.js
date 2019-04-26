/*
 * @story [Criação de produto]
 */
const assert = require('assert');
const ProductBusiness = require('../src/business/ProductBusiness');
const ProductModel = require('../src/model/ProductModel');
let productBusiness = null;


describe('CRUD de Produto', function () {
    beforeEach(function () {
        productBusiness = new ProductBusiness();
    });
    

    /* -----------------------------------------------------------------------------
    * @scene [Criação de produto]
    * @description: Criação de produto onde o payload será o json 
    * informado acima(exceto as propriedades isMarketable e inventory.quantity)
    ----------------------------------------------------------------------------- */
    describe('Criação de Produto', function () {
        it('Deveria gravar produto na base, com todos os dados', function (done) {
            const productModel = new ProductModel();
            productBusiness.add( productModel );
            assert.equal(productBusiness.get(productModel),productModel);
            done();
        });
    });

    /* -----------------------------------------------------------------------------
    * @scene [Edição de produto por sku]
    * @description: 
    ----------------------------------------------------------------------------- */
    describe('Edição de Produto', function () {
        it('Deveria editar produto da base, com todos os campos preenchidos', function (done) {
            const productModel = new ProductModel();
            productBusiness.add(productModel);
            productBusiness.edit(productModel);
            assert.equal(productBusiness.get(productModel), productModel);
            done();
        });
    });

    /* -----------------------------------------------------------------------------
    * @scene [Deleção de produto por sku]
    * @description:
    ----------------------------------------------------------------------------- */
    describe('Deleção de Produto', function () {
        it('Deveria deletar um produto que consta na base', function (done) {
            const productModel = new ProductModel();
            productBusiness.add(productModel);
            productBusiness.delete(productModel);
            assert.equal(productBusiness.get(productModel), null);
            done();
        });
    });
});