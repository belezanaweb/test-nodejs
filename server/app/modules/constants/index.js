const devConfig = absoluteRequire('configs/dev.json');
const prodConfig = absoluteRequire('configs/prod.json');

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
