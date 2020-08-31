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

    it('', async () => {
        const response = await request(app)
            .post('/product')
            .send({
               sku: '',
               name: '',
               inventory: ''
            });        
            expect(400);
    });
});