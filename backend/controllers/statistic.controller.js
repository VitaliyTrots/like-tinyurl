const statisticService = require('../services/statistic.service');
const urlService = require('../services/url.service');
const logger = require('../logger');
const defaultPeriodInMs = 24 * 60 * 60 * 1000;

class StatisticController {
  async getStatisticByPeriod(req, res) {
    try {
      const endDate = req.query.endDate
        ? + new Date(`${req.query.endDate}T23:59:59.999`)
        : Date.now();
      const startDate = req.query.startDate
        ? + new Date(req.query.startDate)
        : endDate - defaultPeriodInMs;
      const data = await statisticService.getStatisticByPeriod(startDate, endDate);
      res.send({ data, error: null });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }

  async getStatisticForOriginalUrlByDays(req, res) {
    try {
      const urls = await urlService.getAllByOriginal(req.params.original);
      if (!urls.length) {
        return res.send({ data: null, error: `Requested URL '${req.params.original}' does not exist.` });
      }

      const data = await statisticService.getStatisticForOriginalUrlByDays(
        urls.map(url => url.id)
      );
      res.send({ data, error: null });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }

  async getStatisticForIp(req, res) {
    try {
      const endDate = req.query.endDate
        ? + new Date(`${req.query.endDate}T23:59:59.999`)
        : Date.now();
      const startDate = req.query.startDate
        ? + new Date(req.query.startDate)
        : endDate - defaultPeriodInMs;
      const data = await statisticService.getStatisticForIp(req.params.ip, startDate, endDate);
      res.send({ data, error: null });
    } catch (err) {
      logger.error(err.stack || err);
      res.status(err.status || 400).send({ data: null, error: err.message || err.toString() });
    }
  }
};

module.exports = new StatisticController();
