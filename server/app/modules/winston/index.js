const winston = require('winston');
const constants = absoluteRequire('modules/constants');

module.exports = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: constants.WINSTON.LOGFILE,
			timestamp: true
		})
	],
	format: winston.format.combine(
		winston.format.colorize({ all: true }),
		winston.format.simple()
	)
});
