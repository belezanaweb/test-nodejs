const logger = absoluteRequire('modules/winston');

module.exports = (req, res, next) => {
	logger.info(`REQUESTING API: URL ${req.url}`);
	next();
};
