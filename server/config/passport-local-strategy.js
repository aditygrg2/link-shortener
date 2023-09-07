const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async function (req, _, _, done) {

      try {
        const user = await User.findOne({ email: req.body.email });

        if (user && user.password) {
          // const verified = bcrypt.compareSync(password, user.password);
          const verified = user.password === req.body.password;

          if (verified) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((e) => {
      console.log(e);
    });
});

passport.setAuthenticatedUser = function (req, res, next) {
  console.log("n");
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
