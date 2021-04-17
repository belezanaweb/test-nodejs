import { getNamespace } from 'continuation-local-storage';
import winston from 'winston';

const options = {
  console: {
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    prettyPrint: true,
    colorize: process.stdout.isTTY,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});

const formatMessage = (message: string) => {
  // É aqui que resgatamos o id da requisição que será armazenado em um storage
  const namespace = getNamespace('request');
  const id = namespace && namespace.get('id');
  return id ? `[${id}] ${message}` : message;
};

/**
 * aqui devolvemos os níveis do log
 * formatando a mensagem com o id da requisição caso exista
 */
export default {
  log: (message: string): winston.Logger => logger.info(message),
  info: (message: string, obj?: any): winston.Logger =>
    logger.info(formatMessage(message), obj),
  error: (message: string, obj?: any): winston.Logger =>
    logger.error(formatMessage(message), obj),
  warn: (message: string, obj?: any): winston.Logger =>
    logger.warn(formatMessage(message), obj),
  debug: (message: string, obj?: any): winston.Logger =>
    logger.debug(formatMessage(message), obj),
  silly: (message: string, obj?: any): winston.Logger =>
    logger.silly(formatMessage(message), obj),
};
