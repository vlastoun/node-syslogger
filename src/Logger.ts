import * as winston from 'winston';
import * as syslog from 'winston-syslog';

class Logger {
  private options: syslog.SyslogTransportOptions;
  private logger: winston.LoggerInstance;
  private loggerOptions: winston.LoggerOptions;
  private transports: winston.TransportInstance[] = [];
  private logLevel: string;
  private format(inputObject: any): string {
    return JSON.stringify(inputObject);
  }
  /**
   *
   * @param appName application name
   * @param path default: /dev/log
   * @param level {string} debug|info|notice|warning|error|crit|alert|emerg;
   * @param protocol {string} unix
   */
  constructor(
    appName: string = 'syslogger',
    path: string = '/dev/log',
    level: string = 'debug',
    protocol: string = 'unix'
  ) {
    this.options = {
      protocol,
      path,
      app_name: appName,
    };

    this.logLevel = process.env.DEBUG_LEVEL || level;

    this.transports.push(new syslog.Syslog(this.options));

    if (process.env.NODE_ENV === 'development') {
      this.transports.push(new winston.transports.Console());
    }

    this.loggerOptions = {
      level: this.logLevel,
      levels: winston.config.syslog.levels,
      transports: this.transports,
    };

    this.logger = new winston.Logger(this.loggerOptions);
  }
  setFormat(fn: (inputObject: any) => string) {
    this.format = fn;
  }

  log(level: string, message: string, object?: any) {
    const formattedMessage = object
      ? `${this.format(object)}${message}`
      : message;

    this.logger.log(level, formattedMessage);
  }

  emerg(message: string, object?: any) {
    this.log('emerg', message, object);
  }
  alert(message: string, object?: any) {
    this.log('alert', message, object);
  }
  crit(message: string, object?: any) {
    this.log('crit', message, object);
  }
  error(message: string, object?: any) {
    this.log('error', message, object);
  }
  warning(message: string, object?: any) {
    this.log('warning', message, object);
  }
  notice(message: string, object?: any) {
    this.log('notice', message, object);
  }
  info(message: string, object?: any) {
    this.log('info', message, object);
  }
  debug(message: string, object?: any) {
    this.log('debug', message, object);
  }

  parseObject(message: string, object: any) {
    return `${this.format(object)}${message}`;
  }
}

export default Logger;
