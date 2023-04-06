const express = require('express');
const router = express.Router();

const redirectController = require('../controllers/redirect.controller');

router.get('/:shortened', redirectController.getShortenedUrl);

module.exports = router;
