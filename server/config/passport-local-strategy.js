const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Login = require("../controllers/Login.Controller");
const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (user && user.password) {
          const verified = bcrypt.compareSync(password, user.password);

          if (verified) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id)
    .select("-password")
    .then((user) => {
      return done(null, user);
    })
    .catch((e) => {
      console.log(e);
    });
});

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
