const logger = require('../logger.js');

export default function errorHandler(err, req, res, next) {
  console.log('Error', err);
  logger.error(err.stack);
  res.status(err.status || 500).json({
    message: err.code,
    status: err.status || 500,
  });
}
