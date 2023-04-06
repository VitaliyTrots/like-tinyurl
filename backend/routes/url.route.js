const express = require('express');
const router = express.Router();

const urlController = require('../controllers/url.controller');

router
  .post('/', urlController.shortenUrl)
  .get('/:shortened', urlController.getOriginalUrl);

module.exports = router;
