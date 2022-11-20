const redis = require('redis');
const logger = require('./logger');

const tools = {};

const clientRedis = redis.createClient({
  socket: {
    host: process.env.REDIS_SERVER,
  },
});

clientRedis.on('error', (error) => logger.error(`Error : ${error}`));
clientRedis
  .on('connect', () => {
    logger.info('Redis connected');
  })
  .on('error', (error) => {
    logger.error(error);
  });

tools.clientRedis = clientRedis;
tools.connectRedis = async () => {
  try {
    await clientRedis.connect();
  } catch (error) {
    logger.info('Unable to connect to the redis : ', error);
  }
};

module.exports = tools;
