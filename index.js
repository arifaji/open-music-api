const Hapi = require('@hapi/hapi');
const config = require('./src/config');
const logger = require('./src/util/logger');
const router = require('./src/router');
const { sequelize } = require('./src/db/index');
const ClientError = require('./src/exceptions/ClientError');

require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Register the plugins
  await server.register(router);
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      logger.debug(response.statusCode);
      return newResponse;
    }
    if (response instanceof Error) {
      logger.debug(response.message);
    }
    return response.continue || response;
  });

  await server.start();
  logger.info(`Server berjalan pada ${server.info.uri} ${process.env.ENV}`);
  try {
    await sequelize.authenticate();
    logger.info('Database connected');
  } catch (error) {
    logger.info('Unable to connect to the database : ', error);
  }
};

init();
