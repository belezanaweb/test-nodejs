const supertest = require('supertest');
let request = supertest('http://localhost:3001/api/v1/products');

describe('** POST **', () =>{
    it('devo inserir um novo produto', async ()=>{
        return request.post('/')
         .send({sku:2814,name:"DC SuperHeroes",inventory:{warehouses:[{locality:"Gotham",quantity:100,type:"Batman"},{locality:"Metropolis",quantity:10,type:"Superman"}]}})
          .then((res)=>{
            expect(res.status).toEqual(201);            
        });
    });
    it('não devo inserir um novo produto - produto ja existente', async ()=>{
        return request.post('/')
            .send({sku:2814,name:"DC SuperHeroes",inventory:{warehouses:[{locality:"Gotham",quantity:100,type:"Batman"},{locality:"Metropolis",quantity:10,type:"Superman"}]}})
            .then((res)=>{
                expect(res.status).toEqual(500);            
            });
        });
    it('não devo inserir um novo produto - payload errado', async ()=>{
    return request.post('/')
        .send({sku: 2814, name: "DC SuperHeroes"})
        .then((res)=>{
            expect(res.status).toEqual(400);            
        });
    });
});

describe('** GET **', ()=>{
    it('devo listar o produto pelo sku', async ()=>{
        return request.get('/43264')
            .then((res)=>{
                expect(res.status).toBe(200);
            });
    });
    it('não devo listar o produto pelo sku pois não existe', async ()=>{
        return request.get('/11111')
            .then((res)=>{
                expect(res.status).toBe(404);            
            });
    });
});

describe('** PUT **', ()=>{
    it('devo alterar um  produto', async ()=>{
        return request.put('/')
            .send({sku:2814,name:"DC SuperHeroes",inventory:{warehouses:[{locality:"Themiscyra",quantity:300,type:"Wonder Womam"},{locality:"Star City",quantity:100,type:"Green Arrow"},{locality:"Central City",quantity:50,type:"Flash"}]}})
            .then((res)=>{
                expect(res.status).toEqual(200);            
            });
        });
    
    it('não devo alterar um novo produto - produto não existe', async ()=>{
            return request.put('/')
                .send({sku:1111,name:"DC Vilains",inventory:{warehouses:[{locality:"Gotham",quantity:100,type:"Joker"}]}})
                .then((res)=>{
                    expect(res.status).toEqual(404);            
                });
            });
        it('não devo inserir um novo produto - payload errado', async ()=>{
        return request.post('/')
            .send({sku: 2814, name: "DC SuperHeroes"})
            .then((res)=>{
                expect(res.status).toEqual(400);            
            });
        });  
});

 describe('** DELETE **', ()=>{
    it('devo apagar o produto pelo sku', async ()=>{
        return request.delete('/2814')
            .then((res)=>{
                expect(res.status).toBe(200);            
            });
    });

    it('não devo apagar o produto pelo sku - não existe', async ()=>{
        return request.delete('/2814')
            .then((res)=>{
                expect(res.status).toBe(404);            
            });
    })
});