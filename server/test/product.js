global.absoluteRequire = name => require(`${__dirname}/../app/${name}`);

const constants = absoluteRequire('modules/constants');
const logger = absoluteRequire('modules/winston');

describe('PRODUCT \n', () => {
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
});
