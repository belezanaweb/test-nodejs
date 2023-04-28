const { Router } = require('express');
const Status = require('http-status');

module.exports = () => ({
  sample: async (req, res, next) => {
    try {
      return res.status(Status.OK).end();
    } catch (error) {
      next(error);
    }
  },

  get router() {
    return Router().post('/', this.sample);
  }
});
