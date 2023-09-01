const express = require('express')
const router = express.Router();
const shortenURLController = require('../controllers/shortenerController');
<<<<<<< Updated upstream
const AuthRouter = require('./AuthRouter');
const UtilRouter = require('./UtilRouter');

// SUBROUTES
router.use('/auth', AuthRouter);
router.use('/utils', UtilRouter);
=======
const AuthRouter = require('./auth/AuthRouter');
const { CLIENT_URL } = require('../constants/urls');
const  gameWebsiteController  = require('../controllers/registerGameController');

>>>>>>> Stashed changes

/////////////////
// NO MORE ROUTES ALLOWED!
router.get('/:id', shortenURLController.handleLink);
router.post('/shorten', shortenURLController.shortenURL);
<<<<<<< Updated upstream
router.post('/shortenByID', shortenURLController.shortenByID);
=======

router.post("/game/registerUserInGame", gameWebsiteController.registerGameController);
router.get("/game/payToCompleteRegisteration", gameWebsiteController.paymentHandler);
>>>>>>> Stashed changes
////////////////


module.exports = router;