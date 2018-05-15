declare class Logger {
  private options;
  private logger;
  private loggerOptions;
  private transports;
  private format(inputObject);
  /**
   *
   * @param appName application name
   * @param protocol {string} unix
   * @param level {string} debug|info|notice|warning|error|crit|alert|emerg;
   */
  constructor(
    appName?: string,
    path?: string,
    protocol?: string,
    level?: string
  );
  setFormat(fn: (inputObject: any) => string): void;
  log(level: string, message: string, object?: any): void;
  emerg(message: string, object?: any): void;
  alert(message: string, object?: any): void;
  crit(message: string, object?: any): void;
  error(message: string, object?: any): void;
  warning(message: string, object?: any): void;
  notice(message: string, object?: any): void;
  info(message: string, object?: any): void;
  debug(message: string, object?: any): void;
  parseObject(message: string, object: any): string;
}
export default Logger;
