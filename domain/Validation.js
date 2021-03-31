const Validator = require('validatorjs');

exports.createProduct = async (reqData) => {
  if (!reqData) {
    return { field: 'all', message: 'Invalid data, check your data.' };
  }

  const rules = {
    sku: 'required',
    name: 'required',
  };

  const validation = new Validator(reqData, rules, { required: 'Incorrect request, check mandatory fields' });

  if (validation.fails()) {
    // Se a validação falhar, cria uma exceção para direcionar o fluxo de execução para o catch.
    const errors = Object.entries(validation.errors.all());

    for (const error of errors) {
      return { field: error[0], message: error[1].toString() };
    }
  }
  return false;
};
