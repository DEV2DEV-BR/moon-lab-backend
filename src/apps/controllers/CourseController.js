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
        return res.status(404).json({ error: "Category not exists!" });
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

  async update(req, res) {
    try {
      const { name, image_url, category_id, description } = req.body;
      const { id } = req.params;

      const course = await Courses.findOne({
        where: { id }
      });


      if (!course) {
        return res.status(400).json({ error: "Course not exists!" });
      }


      if (category_id) {
        const category = await Categories.findOne({
          where: {
            id: category_id,
          }
        });

        if (!category) {
          return res.status(404).json({ error: "Category not exists!" });
        }
      }

      await Courses.update(
        {
          name: name || course.name,
          image_url: image_url || course.image_url,
          description: description || course.description,
          category_id: category_id || course.category_id
        },
        {
          where: {
            id: course.id,
          },
        },
      );

      return res.status(200).json({ message: 'Course updated!' });

    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }

  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const courseToDelete = await Courses.findOne({
        where: { id },
      });

      if (!courseToDelete) {
        return res.status(400).json({ message: 'Course not exists!' });
      }

      await Courses.destroy({
        where: { id },
      });

      return res.status(200).json({ message: 'Course deleted!' });

    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' });
    }
  }

  async get(req, res) {

    try {

      const { id } = req.params;
      const course = await Courses.findOne({
        attributes: ['name', 'description', 'image_url'],
        include: [
          {
            model: Categories,
            as: 'category',
            required: true,
            attributes: ['id', 'name', 'image_url'],
          },
        ],
        where: { id },
      });

      if (!course) {
        return res.status(400).json({ message: 'Course not exists!' });
      }

      return res.status(200).json({ course });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' });
    }

  }

  async all(req, res) {

    try {
      const courses = await Courses.findAll({
        attributes: ['name', 'description', 'image_url'],
        include: [
          {
            model: Categories,
            as: 'category',
            required: true,
            attributes: ['id', 'name', 'image_url'],
          },
        ]
      });

      return res.status(200).json({ courses });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' });
    }

  }
}

module.exports = new CourseController();