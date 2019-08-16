import 'dotenv/config';
import 'reflect-metadata';

import config from './config';
import { Server } from './server';
import logger from './utils/logger';

async function main(): Promise<void> {
  try {
    await new Server().start(config.port);
    logger.info(`
    ------------
    Server Started!
    Http: http://localhost:${config.port}
    Health: http://localhost:${config.port}/health
    ------------
  `);
  } catch (err) {
    logger.error(err);
  }

  process.on('unhandledRejection', (reason: object): void => {
    logger.warn(reason);
  });

  process.on('uncaughtException', (err: Error): void => {
    logger.error(err);
    process.exit(1);
  });
}

main();
