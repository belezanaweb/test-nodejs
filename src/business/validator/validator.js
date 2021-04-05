const validatorjs = require('validatorjs')

module.exports = class Validator {
  async do(data, rules) {
    const validation = new validatorjs(data, rules);
    if (validation.fails()) {
      throw {
        status: 400,
        message: validation.errors.all(),
      };
    }
  }
}
