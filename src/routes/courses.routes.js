const { Router } = require('express');
const schemaValidator = require('../apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('../apps/middlewares/authentication');
const IsASuperUserMiddleware = require('../apps/middlewares/isASuperUser');

const CourseControler = require('../apps/controllers/CourseController');
const createCourseSchema = require('../schema/create.course.schema.json');
const updateCourseSchema = require('../schema/update.course.schema.json');

const courses = new Router();

courses.use(AuthenticationMiddleware);

courses.post('/courses', schemaValidator(createCourseSchema), IsASuperUserMiddleware, CourseControler.create);
courses.put('/courses/:id', schemaValidator(updateCourseSchema), IsASuperUserMiddleware, CourseControler.update);
courses.delete('/courses/:id', IsASuperUserMiddleware, CourseControler.delete);
courses.get('/courses/:id', CourseControler.get);
courses.get('/courses', CourseControler.all);

module.exports = courses;
