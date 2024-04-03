const User = require("../models/user");
const MongoRepository = require("../repositories/mongo");
const AuthServices = require("../services/auth");
const AuthControllers = require("../controllers/auth");
const authRoutes = require("../routes/auth");
const repository = new MongoRepository(User);
const services = new AuthServices(repository);
const controllers = new AuthControllers(services);
const passport = require("passport");
const routes = authRoutes(controllers, passport);

module.exports = routes;
