module.exports = (app, test) => {
  const controller = require("../controller/products")({ test: test });

  app.route("/api/v1/produtos").get(controller.getProducts);
  app.route("/api/v1/produto/:locality/:id").get(controller.getProduct);

  app.route("/api/v1/novo").post(controller.newProduct);
  app.route("/api/v1/editar").post(controller.editProduct);
  app.route("/api/v1/deletar/:id").get(controller.deleteProduct);
};
