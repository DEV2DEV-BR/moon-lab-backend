const { Router } = require('express');
const schemaValidator = require('../apps/middlewares/schemaValidator');

const AuthenticationController = require('../apps/controllers/AuthenticationController');
const authSchema = require('../schema/auth.schema.json');

const authentication = new Router();

authentication.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);

module.exports = authentication;
