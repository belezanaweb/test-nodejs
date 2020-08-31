const request = require('supertest');
const app = require('../../src/app');

let products;

beforeEach(() => {
    products = [
        {
            "sku": 11111,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            "inventory": {
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 12,
                        "type": "ECOMMERCE"
                    }
                ]
            }
        },
        {
            "sku": 22222,
            "name": "Lipidium - Máscara de Reconstrução 100g",
            "inventory": {
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 0,
                        "type": "ECOMMERCE"
                    }
                ]
            }
        }
    ];
    jest.setTimeout(50000);    
  });

describe('createProduct', () => {        
    it('should create product whith valid input', async () => {
        const response = await request(app)
            .post('/product')
            .send(products[0]);

        expect(response.status).toBe(200);
    });

    it('should not be possible to register a product already registered', async () => { 
        await request(app)
            .post('/product')
            .send(products[0]);
        
        const responsePost = await request(app)
            .post('/product')
            .send(products[0]);

        expect(responsePost.status).toBe(400);
    });    

    it('should not be possible to create a product with an empty object', async () => {
        await request(app)
            .post('/product')
            .send({
               sku: '',
               name: '',
               inventory: ''
            });        
            expect(400);
    });
});
describe('getProduct', () => {
    it('it must be possible to recover a product by sku', async () => {
        await request(app)
            .post('/product')
            .send(products[0]);

        const response = await request(app)
            .get(`/product/${products[0].sku}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    test('the response must not be undefined', async () => {
        await request(app)
            .post('/product')
            .send(products[0]);

        const response = await request(app)
            .get(`/product/${products[0].sku}`);
        
        expect(response.body).toBeDefined();
    });

    it('must return the exact object that has the requested sku', async () => {
        await request(app)
            .post('/product')
            .send(products[0]);

        const response = await request(app)
            .get(`/product/${products[0].sku}`);

        expect(response.body).toMatchObject([{'isMarketable': true, "product": {"inventory": {"warehouses": [{"locality": "SP", "quantity": 12, "type": "ECOMMERCE"}]}, "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g", "sku": 11111}, "totalQuantity": 12}]);
    });

    it('the isMarketable property must be true if the totalQuantity > 0', async () => {
        await request(app)
            .post('/product')
            .send(products[0]);

        const response = await request(app)
            .get(`/product/${products[0].sku}`);

        expect(response.body).toMatchObject([{'isMarketable': true}])
    });

    it('the isMarketable property must be false if the totalQuantity = 0', async () => {
        await request(app)
            .post('/product')
            .send(products[1]);

        const response = await request(app)
            .get(`/product/${products[1].sku}`);

        expect(response.body).toMatchObject([{'isMarketable': false}]);
    });

    it('must return the value of totalQuantity != 0', async () => {
        await request(app)
            .post('/product')
            .send(products[0]);

        const response = await request(app)
            .get(`/product/${products[0].sku}`);

        expect(response.body).toMatchObject([{'totalQuantity': 12}])
    });

    it('must return the value of totalQuantity === 0', async () => {
        await request(app)
            .post('/product')
            .send(products[1]);

        const response = await request(app)
            .get(`/product/${products[1].sku}`);

        expect(response.body).toMatchObject([{'totalQuantity': 0}]);
    });
});
describe('updateProduct', () => {    
    it('should be possible to edit a product by sku', async () => {        
       const updatedProduct = {            
           sku: products[0].sku,
           name: 'Creme de tratamento',
           inventory: products[0].inventory           
       };
       
       const response = await request(app)
           .put(`/product/${products[0].sku}`)
           .send(updatedProduct);
           expect(200);
   });

   it('should not be possible to update a product that does not exist', async () => {
       await request(app)
           .put('/product/19383478493');          
           expect(400);        
   });
});
describe('deleteProduct', () => {
    it('it must be possible to delete a product by sku', async () => {
        const product = await request(app)
            .post('/product')
            .send(products[0]);

        await request(app)
            .delete(`/product/${products[0].sku}`)
            
        const responseAll = await request(app)
            .get('/product');

        expect(200);
        expect(responseAll.body).not.toMatchObject([{ sku: product.body.sku }]);        
    });

    it('should not be possible to delete a product that does not exist', async () => {
        await request(app)
            .delete('/product/8484743739829010')
            expect(400);        
    });
});