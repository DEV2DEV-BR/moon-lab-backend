const { Router } = require('express');
const schemaValidator = require('../apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('../apps/middlewares/authentication');
const CourseControler = require('../apps/controllers/CourseController');
const courseSchema = require('../schema/create.course.schema.json');

const courses = new Router();

courses.use(AuthenticationMiddleware);

courses.post('/courses', schemaValidator(courseSchema), CourseControler.create);
// courses.put('/courses', CourseControler.update);
// courses.delete('/courses', CourseControler.delete);
// courses.get('/courses/profile', CourseControler.get);

module.exports = courses;
