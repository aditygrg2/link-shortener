const express = require('express')
const router = express.Router();
const shortenURLController = require('../controllers/shortenerController');
const AuthRouter = require('./auth/AuthRouter');
const { CLIENT_URL } = require('../constants/urls');

// SUBROUTES
router.use('/auth', AuthRouter);

/////////////////
// NO MORE ROUTES ALLOWED!
router.get('/:id', shortenURLController.handleLink);
router.post('/shorten', shortenURLController.shortenURL);
////////////////


module.exports = router;