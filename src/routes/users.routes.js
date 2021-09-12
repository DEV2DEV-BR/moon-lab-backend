const { Router } = require('express');
const schemaValidator = require('../apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('../apps/middlewares/authentication');
const UserControler = require('../apps/controllers/UserController');
const userSchema = require('../schema/create.user.schema.json');

const users = new Router();

users.post('/users', schemaValidator(userSchema), UserControler.create);

users.use(AuthenticationMiddleware);

users.put('/users', UserControler.update);
users.delete('/users', UserControler.delete);
users.get('/users/profile', UserControler.get);

module.exports = users;
