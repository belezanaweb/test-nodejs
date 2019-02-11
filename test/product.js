var chai = require('chai');
var server = require('../src/index');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Product', function(){


    let sku = 123456
    let product = {
        "sku": 123456,
        "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
        "inventory": {
            "warehouses": [
                {
                    "locality": "SP",
                    "quantity": 12,
                    "type": "ECOMMERCE"
                },
                {
                    "locality": "MOEMA",
                    "quantity": 3,
                    "type": "PHYSICAL_STORE"
                }
            ]
        }
    };


    it('New Product', function(done){

        chai.request(server)
        .post('/product')
        .send(product)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })       

    });


    it('Get Product', function(done){

        chai.request(server)
        .get('/product/?sku=' + sku)
        .end(function (err, res){
            res.should.have.status('200');
            res.body.should.have.property('sku');
            done();
        })

    });


    it('Update Product', function(done){

        chai.request(server)
        .put('/product')
        .send(product)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })

    });

    it('Delete Product', function(done){
        chai.request(server)
        .delete('/product/?sku=' + sku)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })
    });
});