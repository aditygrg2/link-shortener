const express = require('express');
const passport = require('passport');
const router = express.Router();
const passportGoogleAuth = require('passport-google-oauth');
const googleAuthConfig = require('../../config/google-oauth');
const authRedirectors = require('../../controllers/authControllers');
const {authenticationDataHandler} = require('../../controllers/authControllers');


router.get('/google', passport.authenticate( 'google' , { scope:[ 'profile','email','openid' ], }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: `/login`}), authRedirectors.successRedirector);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authRedirectors.successRedirector);

router.get('/checkAuth', authenticationDataHandler)

module.exports = router