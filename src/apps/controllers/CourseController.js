const Courses = require('../models/Courses');
const Categories = require('../models/Categories');

class CourseController {
  async create(req, res) {
    try {

      const { name, category_id } = req.body;
      const course = await Courses.findOne({
        where: {
          name: name,
        }
      });

      if (course) {
        return res.status(400).json({ error: "Course already exists!" });
      }

      const category = await Categories.findOne({
        where: {
          id: category_id,
        }
      });

      if (!category) {
        return res.status(404).json({ error: "Failed not exists!" });
      }

      const createdCourse = await Courses.create(req.body);

      if (!createdCourse) {
        return res.status(404).json({ error: "Failed to create course" });
      }

      return res.status(201).json({ createdCourse });

    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }
  }
}

module.exports = new CourseController();