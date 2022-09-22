const Hapi = require('@hapi/hapi');
const config = require('./src/config');
const logger = require('./src/util/logger');
const router = require('./src/router');
const { sequelize } = require('./src/db/index');

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
