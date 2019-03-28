module.exports = app => {
    app.route('/products')
        .post(app.src.controllers.productController.create)
        .put(app.src.controllers.productController.update)
        .delete(app.src.controllers.productController.remove)
        .get(app.src.controllers.productController.get)
}