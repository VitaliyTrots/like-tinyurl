const { Url, Request, sequelize, Sequelize: { Op } } = require('../models');

class StatisticService {
  async getStatisticByPeriod(startDate, endDate) {
    try {
      return Request.findAll({
        attributes: [
          [sequelize.fn('COUNT', 'createdAt'), 'count']
        ],
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
        group: ['url.id'],
        include: [
          {
            model: Url,
            as: 'url',
            attributes: ['original']
          }
        ],
        limit: 5,
        order: [['count', 'DESC']]
      });
    } catch (err) {
      throw err;
    }
  }

  async getStatisticForOriginalUrlByDays(urlIds) {
    try {
      return Request.findAll({
        attributes: [
          [sequelize.fn('DATE', sequelize.col('created_at')), 'day'],
          [sequelize.fn('COUNT', 'urlId'), 'count']
        ],
        where: {
          urlId: {
            [Op.in]: urlIds
          }
        },
        group: ['day'],
        limit: 50,
        order: [['day', 'DESC']],
      });
    } catch (err) {
      throw err;
    }
  }

  async getStatisticForIp(ip, startDate, endDate) {
    try {
      return Request.findAll({
        attributes: [
          ['created_at', 'time']
        ],
        where: {
          ip,
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
        include: [
          {
            model: Url,
            as: 'url',
            attributes: ['original']
          }
        ],
        order: [['time', 'ASC']]
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = new StatisticService();
