const res = require('../util/response');
const AuthenticationService = require('../service/AuthService');

class SongController {
  static async postAuth(request, h) {
    const { payload } = request;
    const token = await AuthenticationService.authenticate(payload);
    return res.ok({ h, data: token });
  }
}

module.exports = SongController;
