const redirectService = require('../services/redirect.service');
const requestService = require('../services/request.service');
const logger = require('../logger');

class UrlController {
  async getShortenedUrl(req, res) {
    try {
      const url = await redirectService.getByShortened(req.params.shortened);

      if (url) {
        await requestService.saveRequest(url.id, req.socket.remoteAddress);
        return res.redirect(url.original);
      }
      return res.send({ data: null, error: `Shortened URL '${req.params.shortened}' does not exist.` });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }
};

module.exports = new UrlController();
