const randomstring = require('randomstring');
const isUrlValid = require('url-validation');

const { Url, Sequelize: { Op } } = require('../models');

class UrlService {
  async getByOriginal(original) {
    try {
      return Url.findOne({
        where: { original }
      });
    } catch (err) {
      throw err;
    }
  }

  async getAllByOriginal(original) {
    try {
      return Url.findAll({
        where: {
          original: { [Op.like]: `${original}%` }
        }
      });
    } catch (err) {
      throw err;
    }
  }

  async shortenUrl(url) {
    try {
      let existingUrl = await this.getByOriginal(url);
      if (!existingUrl) {
        existingUrl = await Url.create({
          original: url,
          shortened: await this.generateAvailableShortenedUrl()
        });
      }
      return existingUrl.shortened;
    } catch (err) {
      throw err;
    }
  }

  checkValidity(url) {
    return isUrlValid(url);
  }

  async generateAvailableShortenedUrl() {
    const minLength = 10;
    const maxLength = 25;
    for (let length = minLength; length <= maxLength; length++) {
      const maxAttempts = 5;
      for (let attemptNo = 0; attemptNo < maxAttempts; attemptNo++) {
        const shortened = randomstring.generate(length);
        const existingShortenedUrl = await Url.findOne({
          where: { shortened }
        });
        if (!existingShortenedUrl) return shortened;
      }
    }

    throw new Error('Unable to generate number. Looks like all options are taken.');
  }
};

module.exports = new UrlService();
