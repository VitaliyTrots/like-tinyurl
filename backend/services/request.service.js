const { Request } = require('../models');

class RequestService {
  async saveRequest(urlId, ip) {
    try {
      return Request.create({ urlId, ip });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = new RequestService();
