const urlService = require('../services/url.service');
const redirectService = require('../services/redirect.service');
const requestService = require('../services/request.service');
const logger = require('../logger');

class UrlController {
  async shortenUrl(req, res) {
    try {
      if (!urlService.checkValidity(req.body.url)) {
        return res.send({
          data: null,
          error: `Passed string '${req.body.url}' is not a valid URL.`
        });
      }

      const data = await urlService.shortenUrl(req.body.url);
      res.send({ data, error: null });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }

  async getOriginalUrl(req, res) {
    try {
      const url = await redirectService.getByShortened(req.params.shortened);

      if (url) {
        await requestService.saveRequest(url.id, req.socket.remoteAddress);
        return res.send({ data: url.original, error: null });
      }
      return res.send({ data: null, error: `Shortened URL '${req.params.shortened}' does not exist.` });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }
}

module.exports = new UrlController();
