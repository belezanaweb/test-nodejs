var express = require('../config/express')();
var request = require('supertest')(express);

describe('#Produtos',function(){
  it('#Listagem dos produtos',function(done){
    request.get('/produtos')
    .set('Accept','application/json') //define cabeçalho
    .expect('Content-Type',/json/) //o que espera
    .expect(200,done) //o que espera
  });  
  
  it('#Cadastro de novo produto',function(done){
    request.post('/produtos')
    .send({
      sku: '123456789',name: 'Teste',inventory: {"warehouses":[{"locality":"SP","quantity":12,"type":"ECOMMERCE"},{"locality":"MOEMA","quantity":3,"type":"PHYSICAL_STORE"}]}
    }) //o que quer enviar
    .set('Accept','application/json') 
    .expect('Content-Type',/json/)
    .expect(200,done)
  })

  it('#Edição de um produto',function(done){
    request.post('/produtos/editar')
    .send({
      sku: '123456789',name: 'Teste2',inventory: {"warehouses":[{"locality":"SP","quantity":12,"type":"ECOMMERCE"},{"locality":"MOEMA","quantity":3,"type":"PHYSICAL_STORE"}]}
    })
    .set('Accept','application/json') //define cabeçalho
    .expect('Content-Type',/json/)
    .expect(200,done)
  })

  it('#Deletar um produto',function(done){
    request.post('/produto/deletar')
    .send({sku: '987654'})
    .set('Accept','application/json') //define cabeçalho
    .expect('Content-Type',/json/)
    .expect(200,done)
  })

});