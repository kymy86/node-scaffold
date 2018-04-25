import winston from 'winston'
import path from 'path'
import fs from 'fs'
import config from './environments'
import winstonDailyRotate from 'winston-daily-rotate-file'

const tsFormat = () => (new Date()).toLocaleTimeString()
const logDir = path.normalize(__dirname + '/../logs')
winston.emitErrs = true

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = new (winston.Logger)({
  transports: [
    new winstonDailyRotate ({
      level: 'development' === config.env ? 'debug' : 'info',
      filename: `${logDir}/%DATE%-app.log`,
      timestamp: tsFormat,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new (winston.transports.Console) ({
      level: 'development' === config.env ? 'debug' : 'info',
      timestamp: tsFormat,
      colorize: true
    })
  ],
  exitOnError: false
})

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

export default logger