const logger = absoluteRequire('modules/winston');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const constants = absoluteRequire('modules/constants');
const expressRoutes = absoluteRequire('routes');

module.exports = (app) => {
	const server = http.createServer(app);
	const port = process.env.PORT || constants.GENERAL.SERVER_HTTP_PORT;

	app.use(compression());
	app.use(helmet());
	app.use(cors());
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	expressRoutes(app);

	// HTTP SERVER
	server.listen(port, constants.GENERAL.SERVER_HTTP_IP, () => {
		logger.info(`HTTP Server: Listering on ${constants.GENERAL.SERVER_HTTP_IP}:${port}`);
	});

	return server;
};
