const _ = require('lodash');
const UserDao = require('../dao/UserDao');
const PlaylistDao = require('../dao/PlaylistDao');
const CollaborationDao = require('../dao/CollaborationDao');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const { validate } = require('../validator/validator');
const { validationSchema } = require('../util/enums');

class CollaborationService {
  static async createCollaboration(credentialId, payload) {
    const { value } = validate(validationSchema.COLLABORATION, payload);
    const { playlistId, userId } = value;
    await CollaborationService.validatePlaylist(credentialId, playlistId);
    await CollaborationService.validateExistingUser(userId);
    const collaboration = await CollaborationDao.insertCollaboration({
      ...value,
    });
    return _.pick(collaboration, ['id']);
  }

  static async deleteCollaboration(credentialId, payload) {
    const { value } = validate(validationSchema.COLLABORATION, payload);
    const { playlistId, userId } = value;
    await CollaborationService.validatePlaylist(credentialId, playlistId);
    await CollaborationService.validateExistingUser(userId);
    await CollaborationDao.deleteCollaborationByPlaylistAndUser({
      ...value,
    });
    return 'Success Delete User from Collaboration...';
  }

  static async validatePlaylist(credentialId, playlistId) {
    const playlist = await PlaylistDao.getPlaylistById(playlistId);
    if (!playlist) {
      throw new NotFoundError('Playlist not found...');
    }
    if (playlist.userId !== credentialId) {
      throw new AuthorizationError('Forbidden...');
    }
  }

  static async validateExistingUser(userId) {
    const user = await UserDao.findUserById(userId);
    if (!user) {
      throw new NotFoundError('User Not Found...');
    }
  }
}

module.exports = CollaborationService;
