import { server } from '@config/index';

import logger from '@middlewares/logger';

import express from './app';

express.app.listen(server.port, () => {
  logger.info('Server running', { port: server.port, mode: server.env });
});
