const _ = require('lodash');
const UserDao = require('../dao/UserDao');
const InvariantError = require('../exceptions/InvariantError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class UserService {
  static async createUser(payload) {
    const valid = validate(validationSchema.INSERT_USER, payload);
    const { value } = valid;
    const existingUsername = await UserDao.findUserByUsername(value.username);
    if (existingUsername) {
      throw new InvariantError('Username already exist...');
    }
    const user = await UserDao.insertUser(value);
    return _.pick(user, ['id']);
  }
}

module.exports = UserService;
