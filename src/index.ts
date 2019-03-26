import { default as server } from './server';

/**
 * Responsável pela inicialização da aplicação
 */
async function start () {
    await server.app.listen({ port: process.env.PORT , host: process.env.HOST});
    console.log(`Running at http://${process.env.HOST}:${process.env.PORT}`);
}
start();
