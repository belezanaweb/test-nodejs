import dotenv from 'dotenv';
import { resolve } from 'path';

const path = (env: string): string => {
  switch (env) {
    case 'test':
      return `${resolve(__dirname, '..', '.env.test')}`;
    case 'development':
      return `${resolve(__dirname, '..', '.env.development')}`;
    case 'docker-compose':
      return `${resolve(__dirname, '..', '.env.docker')}`;
    default:
      return `${resolve(__dirname, '..', '.env')}`;
  }
};

dotenv.config({ path: path(process.env.NODE_ENV as string) });

export const PORT: string = process.env.PORT as string;
export const MONGODB_URI: string = process.env.MONGODB_URI as string;
