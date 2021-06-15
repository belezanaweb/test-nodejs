import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as path from 'path';

dotenvExpand(
  dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  }),
);
