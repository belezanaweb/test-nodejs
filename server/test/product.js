global.absoluteRequire = name => require(`${__dirname}/../app/${name}`);
const uuidv1 = require('uuid/v1');

const constants = absoluteRequire('modules/constants');
const logger = absoluteRequire('modules/winston');
const product = {
	sku: uuidv1(),
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
			},
			{
				locality: 'MOEMA',
				quantity: 5,
				type: 'PHYSICAL_STORE'
			},
			{
				locality: 'MOEMA',
				quantity: 5,
				type: 'PHYSICAL_STORE'
			},
			{
				locality: 'MOEMA',
				quantity: 5,
				type: 'PHYSICAL_STORE'
			},
			{
				locality: 'MOEMA',
				quantity: 10,
				type: 'PHYSICAL_STORE'
			}
		]
	}
};

describe('PRODUCT \n', () => {
	it('ADD PRODUCT - Should return STATUS 200 | SUCCESS FIELD TRUE', (done) => {
		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.post(constants.ENDPOINTS.PRODUCT)
			.send(product)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);
				done();
			});
	});

	it('EDIT PRODUCT - Should return STATUS 200 | SUCCESS FIELD TRUE', (done) => {
		product.name = 'edited';

		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.put(constants.ENDPOINTS.PRODUCT)
			.send(product)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);
				done();
			});
	});

	it('TRY ADD PRODUCT - Should return STATUS 400 | SUCCESS FIELD FALSE', (done) => {
		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.post(constants.ENDPOINTS.PRODUCT)
			.send(product)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(400);
				res.body.should.have.property('success').eql(false);
				done();
			});
	});

	it('GET PRODUCTS - Should return STATUS 200 | RESULT FIELD []', (done) => {
		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.get(constants.ENDPOINTS.PRODUCT)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);

				done();
			});
	});

	it('GET PRODUCT BY SKU - Should return STATUS 200 | SUCCESS FIELD TRUE', (done) => {
		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.get(`${constants.ENDPOINTS.PRODUCT}/${product.sku}`)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);
				done();
			});
	});

	it('DELETE PRODUCT BY SKU - Should return STATUS 200 | SUCCESS FIELD TRUE', (done) => {
		request(`http://${constants.GENERAL.SERVER_HTTP_IP}:${constants.GENERAL.SERVER_HTTP_PORT}`)
			.delete(`${constants.ENDPOINTS.PRODUCT}/${product.sku}`)
			.end((err, res) => {
				logger.info(res.body);
				res.should.have.status(200);
				res.body.should.have.property('success').eql(true);
				done();
			});
	});
});
