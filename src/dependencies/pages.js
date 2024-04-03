const Pages = require("../pages/pages");
const pagesRoutes = require("../routes/pages");

const pages = new Pages();
const routes = pagesRoutes(pages);

module.exports = routes;
