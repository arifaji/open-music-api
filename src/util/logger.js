const winston = require('winston');
const { isDev } = require('../config');

const timezoned = () =>
  new Date().toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
  });

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: timezoned,
  }),
  winston.format.printf(
    (info) => ` [${info.timestamp}] [${info.level}] ${info.message}`
  )
);

const logger = winston.createLogger({
  level: isDev ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format((value) => {
          const info = value;
          info.level = info.level.toUpperCase();
          return info;
        })(),
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
