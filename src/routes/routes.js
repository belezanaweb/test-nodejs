import {Router} from 'express' ;
const routes = new Router();

routes.get('/', (request, response) => {
  return response.json({message: 'Hello'})
});

export default routes;