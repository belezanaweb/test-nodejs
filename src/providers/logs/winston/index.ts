import { createLogger, format, transports, Logger } from 'winston';
import { ILog } from '../ilog';

export class WinstonLog implements ILog {
  public static log: Logger;

  constructor() {
    const { combine, splat, timestamp, printf } = format;
    const myFormat = printf(
      ({ level, message, currentTimestamp, ...metadata }) => {
        return `[${level}] : ${message} `;
      },
    );
    if (!WinstonLog.log) {
      WinstonLog.log = createLogger({
        format: combine(format.colorize(), splat(), timestamp(), myFormat),
        transports: [new transports.Console()],
      });
    }
  }

  /**
   * Info
   * @param message
   */
  info(message: string) {
    WinstonLog.log.info(message);
  }

  /**
   * Info
   * @param message
   */
  error(message: string) {
    WinstonLog.log.error(message);
  }

  /**
   * Warning
   * @param message
   */
  warn(message: string) {
    WinstonLog.log.error(message);
  }
}
