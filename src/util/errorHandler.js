const ClientError = require('../exceptions/ClientError');

const errorHandler = (h, error) => {
  let status = 'error';
  let statusCode = 500;
  let message = 'Internal Server Error...';
  if (error instanceof ClientError) {
    status = 'fail';
    statusCode = error.statusCode;
    message = error.message;
  }
  const response = h.response({
    status,
    message,
  });
  response.code(statusCode);
  return response;
};

module.exports = errorHandler;
