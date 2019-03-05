const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('Testes da api de Produtos', () => {

  let produto1 = {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
      warehouses: [
        {
          locality: "SP",
          quantity: 12,
          type: "ECOMMERCE"
        },
        {
          locality: "MOEMA",
          quantity: 3,
          type: "PHYSICAL_STORE"
        }
      ]
    }
  };
  let produto2 = {
    sku: 43266,
    name: "Seda - Anti Frizz",
    inventory: {
      warehouses: []
    }
  }

  before((done) => {
    api.post('/produto')
      .set('Content-Type', 'application/json')
      .send(produto2)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .end((err, res) => {
        done();
      });
  });

  it('Criar produto: Retornar status HTTP 201 para criação de produto', (done) => {
    api.post('/produto')
      .set('Content-Type', 'application/json')
      .send(produto1)
      .expect('Content-Type', 'application/json')
      .expect(201)
      .end((err, res) => {
        done();
      })
  });

  it('Criar produto: Retornar status HTTP 400 para produto já criado', (done) => {
    api.post('/produto')
      .set('Content-Type', 'application/json')
      .send(produto1)
      .expect('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        done();
      })
  });

  it('Buscar produto: Retornar status HTTP 200 para produto encontrado', (done) => {
    api.get('/produto/43264')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('sku');
        expect(res.body.sku).to.not.equal(null);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('L\'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g');
        expect(res.body).to.have.property('inventory');
        expect(res.body.inventory).to.not.equal(null);
        expect(res.body.inventory).to.have.property('warehouses');
        expect(res.body.inventory.warehouses).to.not.equal(null);
        done();
      });
  });

  it('Buscar produto: Retornar status HTTP 404 para produto não encontrado', (done) => {
    api.get('/produto/1')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  it('Deletar produto: Retornar status HTTP 200 para produto excluído com sucesso', (done) => {
    api.delete('/produto/43264')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('Deletar produto: Retornar status HTTP 404 para produto não encontrado', (done) => {
    api.delete('/produto/1')
    .set('Accept', 'application/json')
    .expect(404, done);
  });

  it('Editar produto: Retornar status HTTP 200 para produto editado com sucesso', (done) => {
    let produtoEditado = {...produto2};
    produtoEditado.inventory.warehouses.push(
      {
        locality: "SP",
        quantity: 12,
        type: "ECOMMERCE"
      }
    );
    api.put('/produto')
      .set('Accept', 'application/json')
      .send(produtoEditado)
      .expect(200, done);
  });

  it('Editar produto: Retornar status HTTP 400 edição de produto não encontrado', (done) => {
    let produtoEditado = {...produto2};
    produtoEditado.sku = 1;
    api.put('/produto')
      .set('Accept', 'application/json')
      .send(produtoEditado)
      .expect(400, done);
  });

});
