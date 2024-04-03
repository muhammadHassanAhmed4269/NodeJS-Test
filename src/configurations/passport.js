const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { isNotFound } = require("entity-checker");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
      if (isNotFound(user)) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isNotFound(isValidPassword)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
