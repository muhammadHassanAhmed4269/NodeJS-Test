const { isNotFound } = require("entity-checker");

const router = require("express").Router();

const authRoutes = (controllers, passport) => {
  router.post("/signup", controllers.authRegistration.bind(controllers));
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (isNotFound(user)) {
        req.flash("error", info.message);
        return res.redirect("/login");
      }
      req.session.user = {
        _id: user._id,
        username: user.username,
        status: user.status,
        lastSeen: user.lastSeen,
      };
      res.redirect("/dashboard");
    })(req, res, next);
  });

  return router;
};

module.exports = authRoutes;
