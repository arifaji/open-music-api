const ClientError = require('../exceptions/ClientError');

const errorHandler = (h, error) => {
  let statusCode = 503;
  let message = 'Internal Server Error...';
  if (error instanceof ClientError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  const response = h.response({
    status: 'fail',
    message,
  });
  response.code(statusCode);
  return response;
};

module.exports = errorHandler;
