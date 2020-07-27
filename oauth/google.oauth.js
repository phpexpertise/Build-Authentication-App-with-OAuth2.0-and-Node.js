const passport = require('passport');
const generator = require('generate-password');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user.model');
const AccessInfo = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_API_URL
};

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    User.findOne({ sid: profile.id }, function(err, user) {
        if (err) {
          return done(err);
        }
         if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: generator.generate({ length: 10, numbers: true }),
              provider: 'google',
              sid: profile.id
            });
            user.save(function(err) {
              if (err) console.log(err);
              return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
};

passport.use(new GoogleStrategy(AccessInfo, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
});
