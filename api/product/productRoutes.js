const productController = require("./productController");

module.exports = router => {
  /**
   * get all
   */
  router.route("/product").get(productController.getProducts);

  /**
   * get an specific
   */
  router.route("/product/:sku").get(productController.getProduct);

  /**
   * add
   */
  router.route("/product").post(productController.addProduct);

  /**
   * edit
   */
  router.route("/product/:sku").put(productController.editProduct);

  /**
   * delete
   */
  router.route("/product/:sku").delete(productController.deleteProduct);
};
