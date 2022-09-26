const AuthController = require('../controller/AuthController');

module.exports = [
  {
    method: 'POST',
    path: '/authentications',
    handler: AuthController.postAuth,
  },
];
