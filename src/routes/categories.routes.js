const { Router } = require('express');
const schemaValidator = require('../apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('../apps/middlewares/authentication');
const IsASuperUserMiddleware = require('../apps/middlewares/isASuperUser');

const categorySchema = require('../schema/create.category.schema.json');
const CategoriesController = require('../apps/controllers/CategoriesController');

const categories = new Router();

categories.use(AuthenticationMiddleware);

categories.post('/categories', schemaValidator(categorySchema), IsASuperUserMiddleware, CategoriesController.create);
categories.put('/categories/:id', IsASuperUserMiddleware, CategoriesController.update);
categories.delete('/categories/:id', IsASuperUserMiddleware, CategoriesController.delete);
categories.get('/categories/:id', CategoriesController.get);
categories.get('/categories', CategoriesController.all);

module.exports = categories;
