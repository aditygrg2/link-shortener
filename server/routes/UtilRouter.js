const express = require('express');
const { checkCustomURLAvailability } = require('../controllers/utilsController');
const router = express.Router();

router.post('/checkCustomURL', checkCustomURLAvailability);

module.exports = router;