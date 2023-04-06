const { Router } = require('express');

const urlRoute = require('./url.route');
const redirectRoute = require('./redirect.route');
const statisticRoute = require('./statistic.route');

module.exports = Router()
  .use('/url', urlRoute)
  .use('/statistic', statisticRoute)
  .use('/', redirectRoute);
