const AuthController = require('../controller/AuthController');

module.exports = [
  {
    method: 'POST',
    path: '/authentications',
    handler: AuthController.postAuth,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: AuthController.refresh,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: AuthController.delete,
  },
];
