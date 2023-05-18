import * as dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'mongodb://admin:admin@localhost:27017/belezanaweb?authSource=admin',
};
