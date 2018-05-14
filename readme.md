# node-syslogger

This is wrapper around winston-syslog to to simplify logging initial settings;

```bash
export NODE_ENV=development # to enable to export to console
```

```javascript
import Logger from 'node-syslogger';
const logger = new Logger('i am logging to syslog', '/dev/log');

logger.error('message to display', { message: 'custom object' }); //first param is required string second is mandatory
logger.error('error message blabla');

// definovani formatovaci funkce
function parserFunction(request) {
    if (request.username === undefined) {
        request.username = 'unknown';
    }
    return `[${request.ipAdress}]-${request.username}-`;
}

logger.setFormat(parserFunction);

const request = {
    ipAdress: '192.168.2.150',
    usename: 'Johny Saucer',
};

logger.error('user logged', request); // [192.168.2.150]-Johny Saucer-user logged
```
