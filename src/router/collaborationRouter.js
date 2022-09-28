const CollaborationController = require('../controller/CollaborationController');

module.exports = [
  {
    method: 'POST',
    path: '/collaborations',
    handler: CollaborationController.createCollaboration,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: CollaborationController.deleteCollaboration,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];
