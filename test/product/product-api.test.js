const app = require('integrations/express')
app.use('/api/product', require('modules/product'))

const request = require('supertest')
const { expect } = require('chai')

const payload = {
    sku: 123,
    name: 'L\'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g',
    inventory: {
        warehouses: [
            {
                locality: 'SP',
                quantity: 12,
                type: 'ECOMMERCE'
            },
            {
                locality: 'MOEMA',
                quantity: 3,
                type: 'PHYSICAL_STORE'
            }
        ]
    }
}
const skuNotExists = 1234


describe('product-api', () => {
    it('POST correct object', (done) => {
        request(app)
            .post('/api/product')
            .send(payload)
            .expect(201)
            .end((err, res) => {
                const { body } = res
                expect(body).to.not.be.null
                expect(body.inventory.quantity).to.equal(15)
                expect(body.isMarketable).to.equal(true)

                if (err) return done(err);
                done();
            });
    })

    it('POST sku exists', (done) => {
        request(app)
            .post('/api/product')
            .send(payload)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    })

    it('GET sku exists', (done) => {
        request(app)
            .get(`/api/product/${payload.sku}`)
            .expect(200)
            .end((err, res) => {
                const { body } = res
                expect(body).to.not.be.null
                expect(body.inventory.quantity).to.equal(15)
                expect(body.isMarketable).to.equal(true)

                if (err) return done(err);
                done();
            });
    })

    it('GET sku not exists', (done) => {
        request(app)
            .get(`/api/product/${skuNotExists}`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    })

    it('PUT zero quantity', (done) => {
        payload.inventory.warehouses[0].quantity = 0
        payload.inventory.warehouses[1].quantity = 0

        request(app)
            .put(`/api/product/${payload.sku}`)
            .send(payload)
            .expect(200)
            .end((err, res) => {
                const { body } = res
                expect(body).to.not.be.null
                expect(body.inventory.quantity).to.equal(0)
                expect(body.isMarketable).to.equal(false)

                if (err) return done(err);
                done();
            });
    })

    it('PUT correct object', (done) => {
        payload.inventory.warehouses[0].quantity = 10
        payload.inventory.warehouses[1].quantity = 8

        request(app)
            .put(`/api/product/${payload.sku}`)
            .send(payload)
            .expect(200)
            .end((err, res) => {
                const { body } = res
                expect(body).to.not.be.null
                expect(body.inventory.quantity).to.equal(18)
                expect(body.isMarketable).to.equal(true)

                if (err) return done(err);
                done();
            });
    })

    it('DEL exists sku', (done) => {
        request(app)
            .delete(`/api/product/${payload.sku}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                request(app)
                    .get(`/api/product/${skuNotExists}`)
                    .expect(404)
                    .end((err, res) => {
                        if (err) return done(err);
                        done();
                    });
            });
    })

    it('DEL incorrect sku', (done) => {
        request(app)
            .delete(`/api/product/${skuNotExists}`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    })

});