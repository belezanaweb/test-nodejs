import { list, find, create, update, destroy } from '../../services/ProductService';

export default async app => {
  app.route('/product')
    .get(list)
    .post(create)

  app.route('/product/:sku')
    .get(find)
    .put(update)
    .delete(destroy)
}
