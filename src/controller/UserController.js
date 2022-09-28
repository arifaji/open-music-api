const res = require('../util/response');
const UserService = require('../service/UserService');

class UserController {
  static async createUser(request, h) {
    const { payload } = request;
    const user = await UserService.createUser(payload);
    return res.created({ h, data: { userId: user.id } });
  }
}

module.exports = UserController;
