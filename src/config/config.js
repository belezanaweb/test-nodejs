module.exports = () => {
  return require('./env/' + (process.env.NODE_ENV || 'development') + '.js');
};
