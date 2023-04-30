import dotenv from 'dotenv';
import fs from 'fs';

import { Envs } from './types';

if (fs.existsSync('.env') && process.env.APP_ENVIROMENT !== 'test') {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({path: '.env'});
}

export function requiredEnvVar(varName: string): string | never {
  console.error(`Required environment variable "${varName}" is missing.`);

  process.exit(1);
}

export const AppConfig: Envs = {
  APPLICATION_NAME: process.env.APPLICATION_NAME || requiredEnvVar('APPLICATION_NAME'),
  APP_ENVIROMENT: process.env.APP_ENVIROMENT || 'development',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || requiredEnvVar('DATABASE_URL'),
}
