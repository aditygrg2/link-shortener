const express = require('express')
const router = express.Router();
const gameWebsiteController  = require('../controllers/registerGameController');
const shortenURLController = require('../controllers/shortenerController');
const AuthRouter = require('./AuthRouter');
const UtilRouter = require('./UtilRouter');

// SUBROUTES
router.use('/auth', AuthRouter);
router.use('/utils', UtilRouter);

/////////////////
// NO MORE ROUTES ALLOWED!
router.get('/:id', shortenURLController.handleLink);
router.post('/shorten', shortenURLController.shortenURL);
router.post('/shortenByID', shortenURLController.shortenByID);
router.post("/game/registerUserInGame", gameWebsiteController.registerGameController);
router.get("/game/payToCompleteRegisteration", gameWebsiteController.paymentHandler);
////////////////


module.exports = router;