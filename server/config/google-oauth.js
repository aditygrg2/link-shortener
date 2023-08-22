const passport = require("passport");
const User = require("../models/User");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const uuid = require("uuid-random");

passport.use(
  new googleStrategy(
    {
      clientID:
        "98092947996-kh3vchm2tkrjhhnukn5k4bhpidk298u0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0]["value"];

      const user = await User.findOne({ email: email });

      if (user) {
        return done(null, user);
      } else {
        try {
          const user = await User.create({
            email: email,
            password: uuid(),
          });

          user.save();

          done(null, user);
        } catch (err) {
          // Need to show these feedbacks to the user.
          console.log(err);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    await User.findById(id).then((user)=>{
        return done(null, user);
    }).catch((e)=>{
        console.log(e);
    })
});

module.exports = passport;
