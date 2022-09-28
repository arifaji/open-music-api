const res = require('../util/response');
const CollaborationService = require('../service/CollaborationService');

class CollaborationController {
  static async createCollaboration(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;
    const collaboration = await CollaborationService.createCollaboration(
      credentialId,
      payload
    );
    return res.created({ h, data: { collaborationId: collaboration.id } });
  }

  static async deleteCollaboration(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { payload } = request;
    const message = await CollaborationService.deleteCollaboration(
      credentialId,
      payload
    );
    return res.ok({ h, message });
  }
}

module.exports = CollaborationController;
