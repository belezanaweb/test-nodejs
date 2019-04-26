/*
 * @story [Criação de produto]
 */
import { expect } from 'chai';
import { ProductBusiness } from "../src/business/ProductBusiness";
import { ProductModel } from "../src/model/ProductModel";
import { WareHouse } from "../src/model/WareHouseModel";
import { WareHouseTypes } from "../src/model/WareHouseTypesEnum";
import { BrasillianStates } from "../src/model/BrasillianStatesEnum";

let productBusiness = null;


describe('CRUD de Produto', function () {
    beforeEach(function () {
        productBusiness = new ProductBusiness();
        const sku = 43264;
        const name = "Produto de teste";
        const locality1 = BrasillianStates.SP;
        const quantity1 = 10;
        const type1 = WareHouseTypes.ECOMMERCE;
        const locality2 = BrasillianStates.RJ;
        const quantity2 = 5;
        const type2 = WareHouseTypes.ECOMMERCE;
        const inventory = {
            warehouses: [
                new WareHouse(locality1, quantity1, type1),
                new WareHouse(locality2, quantity2, type2)
            ]
        };
        const productModel = new ProductModel(sku, name, inventory);
        productBusiness.add(productModel);
    });

    /* -----------------------------------------------------------------------------
    * @scene [Criação de produto]
    * @description: Criação de produto onde o payload será o json 
    * informado acima(exceto as propriedades isMarketable e inventory.quantity)
    ----------------------------------------------------------------------------- */
    describe('Criação de Produto', function () {
        it('Deveria gravar produto na base, com todos os dados', function (done) {
            const productModel = new ProductModel(1234, "Test123");
            productBusiness.add( productModel );
            expect(productModel.sku).to.equal(productBusiness.get(productModel).sku);
            done();
        });
    });

    // /* -----------------------------------------------------------------------------
    // * @scene [Edição de produto por sku]
    // * @description: 
    // ----------------------------------------------------------------------------- */
    describe('Edição de Produto', function () {
        it('Deveria editar produto da base, com todos os campos preenchidos', function (done) {
            const productModel = new ProductModel(43264, "Test123");
            productBusiness.edit(productModel);
            expect("Test123").to.equal(productBusiness.get(productModel).name);
            done();
        });
    });

    // /* -----------------------------------------------------------------------------
    // * @scene [Deleção de produto por sku]
    // * @description:
    // ----------------------------------------------------------------------------- */
    describe('Deleção de Produto', function () {
        it('Deveria deletar um produto que consta na base', function (done) {
            const productModel = new ProductModel(43264, "");
            productBusiness.delete(productModel);
            expect(null).to.equal(productBusiness.get(productModel));
            done();
        });
    });
});