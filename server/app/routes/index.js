const productRoute = absoluteRequire('routes/product');
const winstonMiddleware = absoluteRequire('middlewares/winston');

module.exports = (app) => {
	app.use(winstonMiddleware);
	app.use(productRoute);
};
