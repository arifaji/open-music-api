const _ = require('lodash');
const bcrypt = require('bcrypt');
const UserDao = require('../dao/UserDao');
const InvariantError = require('../exceptions/InvariantError');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../util/tokenManager');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class AuthenticationService {
  static async authenticate(payload) {
    const valid = validate(validationSchema.LOGIN_USER, payload);
    const { value } = valid;

    const user = await UserDao.findUserByUsername(value.username);
    if (!user) {
      throw new InvariantError('Incorrect Username / Password...');
    }
    console.log(value.password, user.password);
    const match = await bcrypt.compare(value.password, user.password);
    console.log(match);

    if (!match) {
      throw new InvariantError('Incorrect Username / Password...');
    }
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    return { accessToken, refreshToken };
  }
}

module.exports = AuthenticationService;
