"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const syslog = require("winston-syslog");
class Logger {
  /**
   *
   * @param appName application name
   * @param protocol {string} unix
   * @param level {string} debug|info|notice|warning|error|crit|alert|emerg;
   */
  constructor(
    appName = "syslogger",
    path = "/dev/log",
    protocol = "unix",
    level = "debug"
  ) {
    this.transports = [];
    this.options = {
      protocol,
      path,
      app_name: appName
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
  format(inputObject) {
    return JSON.stringify(inputObject);
  }
  setFormat(fn) {
    this.format = fn;
  }
  log(level, message, object) {
    const formattedMessage = object
      ? `${this.format(object)}${message}`
      : message;
    this.logger.log(level, formattedMessage);
  }
  emerg(message, object) {
    this.log("emerg", message, object);
  }
  alert(message, object) {
    this.log("alert", message, object);
  }
  crit(message, object) {
    this.log("crit", message, object);
  }
  error(message, object) {
    this.log("error", message, object);
  }
  warning(message, object) {
    this.log("warning", message, object);
  }
  notice(message, object) {
    this.log("notice", message, object);
  }
  info(message, object) {
    this.log("info", message, object);
  }
  debug(message, object) {
    this.log("debug", message, object);
  }
  parseObject(message, object) {
    return `${this.format(object)}${message}`;
  }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map
