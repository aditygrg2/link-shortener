const express = require('express')
const router = express.Router();
const shortenURLController = require('../controllers/shortenerController');

router.get('/:id', shortenURLController.handleLink);
router.post('/shorten', shortenURLController.shortenURL);

module.exports = router;