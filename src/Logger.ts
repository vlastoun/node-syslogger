import * as winston from "winston";
import * as syslog from "winston-syslog";

class Logger {
  private options: syslog.SyslogTransportOptions;
  private logger: winston.LoggerInstance;
  private loggerOptions: winston.LoggerOptions;
  private transports: winston.TransportInstance[] = [];

  private format(inputObject: any): string {
    return JSON.stringify(inputObject);
  }

  /**
   *
   * @param appName application name
   * @param protocol {string} unix
   * @param level {string} debug|info|notice|warning|error|crit|alert|emerg;
   */
  constructor(
    appName: string = "syslogger",
    protocol: string = "unix",
    level: string = "debug"
  ) {
    this.options = {
      protocol,
      app_name: appName,
      path: "/dev/log"
    };

    this.transports.push(new syslog.Syslog(this.options));

    if (process.env.NODE_ENV === "development") {
      this.transports.push(new winston.transports.Console());
    }

    this.loggerOptions = {
      level,
      levels: winston.config.syslog.levels,
      transports: this.transports
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
    this.logger.log("emerg", message, object);
  }
  alert(message: string, object?: any) {
    this.logger.log("alert", message, object);
  }
  crit(message: string, object?: any) {
    this.logger.log("crit", message, object);
  }
  error(message: string, object?: any) {
    this.logger.log("error", message, object);
  }
  warning(message: string, object?: any) {
    this.logger.log("warning", message, object);
  }
  notice(message: string, object?: any) {
    this.logger.log("notice", message, object);
  }
  info(message: string, object?: any) {
    this.logger.log("info", message, object);
  }
  debug(message: string, object?: any) {
    this.logger.log("debug", message, object);
  }

  parseObject(message: string, object: any) {
    return `${this.format(object)}${message}`;
  }
}

export default Logger;
