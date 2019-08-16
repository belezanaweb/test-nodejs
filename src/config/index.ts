const { NODE_ENV, PORT, LOG_LEVEL, DB_COL_PRODUCT } = process.env;

export default {
  env: NODE_ENV || 'development',
  isProd: NODE_ENV === 'production',
  port: parseInt(PORT, 10) || 3000,
  logLevel: LOG_LEVEL || 'debug',
  collections: {
    product: DB_COL_PRODUCT || 'product',
  },
};
