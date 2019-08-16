import { createLogger, format, transports } from 'winston';

import config from '../config';

const { combine, colorize, json, label, simple, timestamp, printf } = format;

const logger = createLogger({
  level: config.logLevel,
  format: combine(
    colorize(),
    json(),
    label({ label: 'server' }),
    simple(),
    timestamp(),
    printf(({ level, message, label, timestamp }): string => {
      return `[${label}:${level}] ${message} (${timestamp})`;
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;
