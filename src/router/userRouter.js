const UserController = require('../controller/UserController');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: UserController.createUser,
  },
];
