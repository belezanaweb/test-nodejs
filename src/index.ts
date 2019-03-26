import { default as server } from './server';

/**
 * Responsável pela inicialização da aplicação
 */
async function start () {
    await server.app.listen({ port: process.env.PORT || 3000 }, ( ) =>{
        console.log('Server initialize');
    });
}
start();
