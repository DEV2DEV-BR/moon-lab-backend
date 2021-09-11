const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');

const UserControler = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');
const categorySchema = require('./schema/create.category.schema.json');
const CategoriesController = require('./apps/controllers/CategoriesController');

const routes = new Router();

routes.get('/health', (req, res) => res.send({
  message: 'Connected with success!',
}));

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);
routes.post('/user', schemaValidator(userSchema), UserControler.create);

routes.use(AuthenticationMiddleware);

routes.put('/user', UserControler.update);
routes.delete('/user', UserControler.delete);
routes.get('/user', UserControler.userProfile);

routes.post('/category', schemaValidator(categorySchema), CategoriesController.create);
routes.put('/category/:id', CategoriesController.update);
routes.delete('/category/:id', CategoriesController.delete);
routes.get('/category', CategoriesController.get);

module.exports = routes;
