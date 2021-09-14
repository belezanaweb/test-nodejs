export interface ILog {
  /**
   * Info
   * @param message
   */
  info(message: any): void;

  /**
   * Error
   * @param message
   */
  error(message: any): void;

  /**
   * Warning
   * @param message
   */
  warn(message: any): void;
}
