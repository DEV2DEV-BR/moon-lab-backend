const express = require('express');
const categoriesRoutes = require('./categories.routes');
const usersRoutes = require('./users.routes');
const authenticationRoute = require('./authentication.routes');

const routes = express();

routes.use(categoriesRoutes);
routes.use(usersRoutes);
routes.use(authenticationRoute);

module.exports = routes;