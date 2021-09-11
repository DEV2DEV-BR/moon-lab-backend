const Categories = require('../models/Categories');

class CategoriesController {
  async create(req, res) {
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
  }

  async update(req, res) {
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
  }

  async delete(req, res) {
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
  }

  async get(req, res) {
    const categories = await Categories.findAll({
      attributes: ['id', 'name', 'description', 'image_url']
    });

    return res.status(200).json(categories);
  }
}
module.exports = new CategoriesController();
