const Categories = require('../models/Categories');

class CategoriesController {
  async create(req, res) {
    try {
      const verifyCategory = await Categories.findOne({
        where: {
          name: req.body.name
        },
      });

      if (verifyCategory) {
        return res.status(400).json({ message: 'Category already exits!' });
      }

      const category = await Categories.create(req.body);

      if (!category) {
        return res.status(400).json({ message: 'Failed to create a category!' });
      }

      return res.status(201).send({ message: 'Category created!' });
    } catch (error) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
  }

  async update(req, res) {
    try {
      const {
        name, description, image_url
      } = req.body;

      const { id } = req.params;

      const category = await Categories.findOne({
        where: { id },
      });

      if (!category) {
        return res.status(400).json({ message: 'Category not exits!' });
      }

      await Categories.update(
        {
          name: name || category.name,
          description: description || category.description,
          image_url: image_url || category.image_url
        },
        {
          where: {
            id: id,
          },
        },
      );

      return res.status(200).json({ message: 'Category updated!' });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const category = await Categories.findOne({
        where: { id },
      });

      if (!category) {
        return res.status(400).json({ message: 'Category not exists!' });
      }

      await Categories.destroy({
        where: { id },
      });

      return res.status(200).json({ message: 'Category deleted!' });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }
  }

  async get(req, res) {
    try {

      const { id } = req.params;

      const category = await Categories.findOne(
        {
          attributes: ['id', 'name', 'description', 'image_url'],
          where: { id }
        }
      );

      if (!category) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }
  }

  async all(req, res) {

    try {

      const categories = await Categories.findAll({
        attributes: ['id', 'name', 'description', 'image_url']
      });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }
  }
}
module.exports = new CategoriesController();
