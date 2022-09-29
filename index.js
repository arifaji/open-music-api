const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const config = require('./src/config');
const logger = require('./src/util/logger');
const router = require('./src/router');
const { authenticateDb } = require('./src/db/index');
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

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register(router);

  server.ext('onPreResponse', (request, h) => {
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
  await authenticateDb();
};

init();
