const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

module.exports = function(passport) {
    // Local Strategy
    passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: "Incorrect Password" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Google Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) return done(null, existingUser);

            const newUser = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              profilePic: profile.photos[0].value,
            });

            await newUser.save();
            return done(null, newUser);
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}
