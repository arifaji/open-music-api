const res = require('../util/response');
const AuthenticationService = require('../service/AuthService');

class AuthController {
  static async postAuth(request, h) {
    const { payload } = request;
    const token = await AuthenticationService.authenticate(payload);
    return res.created({ h, data: token });
  }

  static async refresh(request, h) {
    const { payload } = request;
    const accessToken = await AuthenticationService.refresh(payload);
    return res.ok({ h, data: { accessToken } });
  }

  static async delete(request, h) {
    const { payload } = request;
    const message = await AuthenticationService.delete(payload);
    return res.ok({ h, message });
  }
}

module.exports = AuthController;
