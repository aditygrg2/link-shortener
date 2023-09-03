const express = require('express')
const router = express.Router();
const shortenURLController = require('../controllers/shortenerController');
const AuthRouter = require('./AuthRouter');
const UtilRouter = require('./UtilRouter');

// SUBROUTES
router.use('/auth', AuthRouter);
router.use('/utils', UtilRouter);
const { CLIENT_URL } = require('../constants/urls');
const  gameWebsiteController  = require('../controllers/registerGameController');


/////////////////
// NO MORE ROUTES ALLOWED!
router.get('/:id', shortenURLController.handleLink);
router.post('/shorten', shortenURLController.shortenURL);
router.post('/shortenByID', shortenURLController.shortenByID);

router.post("/game/registerUserInGame", gameWebsiteController.registerGameController);
router.get("/game/payToCompleteRegisteration", gameWebsiteController.paymentHandler);
router.get("/game/notification/:id", gameWebsiteController.notificationHandler);
////////////////


module.exports = router;