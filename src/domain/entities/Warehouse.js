const { attributes } = require('structure');

const types = {
  required_string: {
    type: String,
    required: true
  },
  required_number: {
    type: String,
    required: true
  }
};

const Warehouse = attributes({
  locality: { ...types.required_string },
  quantity: Number,
  type: { ...types.required_number }
})(class Warehouse {});

module.exports = Warehouse;
