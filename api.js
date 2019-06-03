'use strict';

const Hapi = require('@hapi/hapi');

const productRoutes = require('./src/routes/product');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route(productRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);

    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit();
});

if (require.main === module){
    init();
} else {
    module.exports = init;
}
