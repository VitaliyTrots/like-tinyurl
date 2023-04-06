const express = require('express');
const router = express.Router();

const statisticController = require('../controllers/statistic.controller');

router
  .get('/', statisticController.getStatisticByPeriod)
  .get('/ip/:ip', statisticController.getStatisticForIp)
  .get('/:original', statisticController.getStatisticForOriginalUrlByDays);

module.exports = router;
