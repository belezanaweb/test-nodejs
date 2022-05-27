import request from 'supertest';

import app from '../app';

describe('Product', () => {
    it('should be able to create a new product', async () => {
        const response = await request(app).post('/products').send({	  
            "sku": 123456901,
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
        });

        expect(response.body).toMatchObject({
            "sku": 123456901,
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
                ],
                "quantity": 15
            },
            "isMarketable": true
        })
    });

    it('Should return error when trying to create product with SKU that already exists', async () => {
        const response = await request(app).post('/products').send({	  
            "sku": 123456901,
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
        });

        expect(response.body).toMatchObject({
            "error": "A product with this SKU already exists"
        })
    });

    it('should return status 400 if payload is wrong', async () => {
        const response = await request(app).post('/products').send({	  
            "sku": 123456901,
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
        });

        expect(response.statusCode).toBe(400);

        expect(response.body).toMatchObject({
            "errors": [
                "name is a required field"
            ]
        })
    });

    it('should be able to update product', async () => {
        const response = await request(app).put('/products/123456901').send({	 
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
        });

        expect(response.body).toMatchObject({
            "sku": 123456901,
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
                ],
                "quantity": 15
            },
            "isMarketable": true
        })
    });

    it('Should update isMarketable field', async () => {
        const response = await request(app).put('/products/123456901').send({	 
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            "inventory": {
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 0,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 0,
                        "type": "PHYSICAL_STORE"
                    }
                ]
            }
        });

        expect(response.body).toMatchObject({
            "sku": 123456901,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            "inventory": {
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 0,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 0,
                        "type": "PHYSICAL_STORE"
                    }
                ],
                "quantity": 0
            },
            "isMarketable": false
        })
    });


    it('Should return error if product to be updated does not exist', async () => {
        const response = await request(app).put('/products/12345690100').send({	 
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
        });

        expect(response.body).toMatchObject({
            "error": "Product not found"
        })
    });

    it('Should return the searched product', async () => {
        const response = await request(app).get('/products/123456901');

        expect(response.body).toMatchObject({
            "sku": 123456901,
            "name": "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
            "inventory": {
                "warehouses": [
                    {
                        "locality": "SP",
                        "quantity": 0,
                        "type": "ECOMMERCE"
                    },
                    {
                        "locality": "MOEMA",
                        "quantity": 0,
                        "type": "PHYSICAL_STORE"
                    }
                ],
                "quantity": 0
            },
            "isMarketable": false
        });
    });

    it('Should return error if product searched via GET does not exist', async () => {
        const response = await request(app).get('/products/12345690100');

        expect(response.body).toMatchObject({
            "error": "Product not found"
        });
    });

    it('Should delete product', async () => {
        const response = await request(app).delete('/products/123456901');
        expect(response.statusCode).toBe(204);
    });

    it('should return error if product to be deleted does not exist', async () => {
        const response = await request(app).delete('/products/12345690100');

        expect(response.body).toMatchObject({
            "error": "Product not found"
        });
    });

});