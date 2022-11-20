const { clientRedis } = require('../util/redis');

class CacheService {
  static async set(key, value) {
    await clientRedis.set(key, value, 'EX', 60 * 30);
  }

  static async get(key) {
    const result = await clientRedis.get(key);

    if (result === null) throw new Error('Cache tidak ditemukan');

    return result;
  }

  static delete(key) {
    return clientRedis.del(key);
  }
}

module.exports = CacheService;
