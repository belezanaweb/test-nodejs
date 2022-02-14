module.exports = function checksExistsProduct(request, response, next) {
    const { sku } = request.params;
    const product = products.find((item) => item.sku == sku)
  
    if(!product) {
      return response.status(404).send({error: "Product not found"});
    }
  
    next();
  
  }