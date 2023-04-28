const { Router } = require('express');
const Status = require('http-status');

module.exports = ({ createProductOperation }) => ({
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const product = await createProductOperation.execute(body);
      return res.status(Status.OK).json(product);
    } catch (error) {
      next(error);
    }
  },

  get router() {
    return Router().post('/', this.create);
  }
});
