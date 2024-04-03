const isAuthenticated = require("../middlewares/authentication");

const router = require("express").Router();

const pagesRoutes = (pages) => {
  router.get("/", pages.home.bind(pages));
  router.get("/signup", pages.signUp.bind(pages));
  router.get("/login", pages.login.bind(pages));
  router.get("/messages", isAuthenticated, pages.messages.bind(pages));
  router.get("/dashboard", isAuthenticated, pages.dashboard.bind(pages));
  return router;
};

module.exports = pagesRoutes;
