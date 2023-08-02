import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import fsa from 'fs-extra';

const logDirectory = './src/logger/logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const maxAge = 14 * 24 * 60 * 60 * 1000;
const now = Date.now();

fsa.emptyDirSync(logDirectory);

fsa.readdirSync(logDirectory).forEach((file) => {
  const filePath = path.join(logDirectory, file);
  const stat = fsa.statSync(filePath);

  if (stat.isFile() && now - stat.mtimeMs > maxAge) {
    fsa.utimesSync(filePath, now, now);
    fsa.unlinkSync(filePath);
  } else if (stat.isDirectory() && now - stat.mtimeMs > maxAge) {
    fsa.removeSync(filePath);
  }
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
  transports: [
    new DailyRotateFile({
      level: 'error',
      filename: `${logDirectory}/error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      level: 'info',
      filename: `${logDirectory}/info-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}
