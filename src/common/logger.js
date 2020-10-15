const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf, simple } = format;

const myFormat = printf(({ message, timestamp: ts }) => {
  return `${ts}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: simple()
    })
  );
}

module.exports = logger;
