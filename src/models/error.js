module.exports = class Error {
  constructor(message) {
    this.erros = [
      {
        msg: message,
      },
    ];
  }
};
