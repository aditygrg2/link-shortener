const express = require("express");
const passport = require("passport");
const router = express.Router();
const passportGoogleAuth = require("passport-google-oauth");
const googleAuthConfig = require("../config/google-oauth");
const authRedirectors = require("../controllers/authControllers");
const authControllers = require("../controllers/authControllers");
const { CLIENT_URL } = require("../constants/urls");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    prompt: "select_account consent",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${CLIENT_URL}` }),
  authRedirectors.successRedirector
);

router.get("/checkAuth", authControllers.authenticationDataHandler);
router.post("/checkUser", authControllers.checkUser);
router.post(
  "/submitLogin",
  passport.authenticate("local", {}),
  authRedirectors.localAuthSuccess,
);
router.post(
  "/submitRegister",
  authRedirectors.createUser,
  passport.authenticate("local", {}),
  authRedirectors.localAuthSuccess,
);

module.exports = router;
