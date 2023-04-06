const { Url } = require('../models');

class RedirectService {
  async getByShortened(shortened) {
    try {
      return Url.findOne({
        where: { shortened }
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = new RedirectService();
