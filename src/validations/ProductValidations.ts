const validateFields = require('validate-fields')();

class ProductsValidation {

  private request : object;
  public error : any;
  private rules = {
    name: String,
    inventory: JSON
  };

  constructor(request: object) {
    this.request  = request;
  }

  validate() {
    if (validateFields(this.rules, this.request)) {
        this.error = false;
    } else {
        this.error = validateFields.lastError;
    }
    return false;
  }

  getError() {
      return {
        success : false,
        data: {
            error : this.error
        }
      };
  }
}

export default ProductsValidation;