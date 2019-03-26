import app from './server';

/**
 * Responsável pela inicialização da aplicação
 */
async function start () {
    await app.listen({ port: process.env.PORT , host: process.env.HOST});
    console.log(`Running at http://${process.env.HOST}:${process.env.PORT}`);
}
start();
