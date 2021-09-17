const express = require('express');
const categoriesRoutes = require('./categories.routes');
const usersRoutes = require('./users.routes');
const authenticationRoute = require('./authentication.routes');
const coursesRoutes = require('./courses.routes');

const routes = express();

routes.use(authenticationRoute);
routes.use(usersRoutes);
routes.use(categoriesRoutes);
routes.use(coursesRoutes);

module.exports = routes;