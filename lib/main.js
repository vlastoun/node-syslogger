require("source-map-support/register");
module.exports = /******/ (function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {}; // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {}
      /******/
    }); // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ); // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true; // Return the exports of the module
    /******/
    /******/ /******/ return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules; // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter
        /******/
      });
      /******/
    }
    /******/
  }; // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = "/"; // Load entry module and return exports
  /******/
  /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);

      /***/
    },
    /* 1 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      exports.__esModule = true;
      var Logger_1 = __webpack_require__(2);
      exports["default"] = Logger_1["default"];

      /***/
    },
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
      "use strict";

      exports.__esModule = true;
      var winston = __webpack_require__(3);
      var syslog = __webpack_require__(4);
      var Logger = /** @class */ (function() {
        /**
         *
         * @param appName application name
         * @param protocol {string} unix
         * @param level {string} debug|info|notice|warning|error|crit|alert|emerg;
         */
        function Logger(appName, path, protocol, level) {
          if (appName === void 0) {
            appName = "syslogger";
          }
          if (path === void 0) {
            path = "/dev/log";
          }
          if (protocol === void 0) {
            protocol = "unix";
          }
          if (level === void 0) {
            level = "debug";
          }
          this.transports = [];
          this.options = {
            protocol: protocol,
            path: path,
            app_name: appName
          };
          this.transports.push(new syslog.Syslog(this.options));
          if (false) {
            this.transports.push(new winston.transports.Console());
          }
          this.loggerOptions = {
            level: level,
            levels: winston.config.syslog.levels,
            transports: this.transports
          };
          this.logger = new winston.Logger(this.loggerOptions);
        }
        Logger.prototype.format = function(inputObject) {
          return JSON.stringify(inputObject);
        };
        Logger.prototype.setFormat = function(fn) {
          this.format = fn;
        };
        Logger.prototype.log = function(level, message, object) {
          var formattedMessage = object
            ? "" + this.format(object) + message
            : message;
          this.logger.log(level, formattedMessage);
        };
        Logger.prototype.emerg = function(message, object) {
          this.log("emerg", message, object);
        };
        Logger.prototype.alert = function(message, object) {
          this.log("alert", message, object);
        };
        Logger.prototype.crit = function(message, object) {
          this.log("crit", message, object);
        };
        Logger.prototype.error = function(message, object) {
          this.log("error", message, object);
        };
        Logger.prototype.warning = function(message, object) {
          this.log("warning", message, object);
        };
        Logger.prototype.notice = function(message, object) {
          this.log("notice", message, object);
        };
        Logger.prototype.info = function(message, object) {
          this.log("info", message, object);
        };
        Logger.prototype.debug = function(message, object) {
          this.log("debug", message, object);
        };
        Logger.prototype.parseObject = function(message, object) {
          return "" + this.format(object) + message;
        };
        return Logger;
      })();
      exports["default"] = Logger;

      /***/
    },
    /* 3 */
    /***/ function(module, exports) {
      module.exports = require("winston");

      /***/
    },
    /* 4 */
    /***/ function(module, exports) {
      module.exports = require("winston-syslog");

      /***/
    }
    /******/
  ]
);
//# sourceMappingURL=main.map
