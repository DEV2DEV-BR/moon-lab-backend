const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Courses extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        image_url: Sequelize.STRING,
        category_id: Sequelize.INTEGER
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Categories, { foreignKey: 'category_id', as: 'category' });
  }
}

module.exports = Courses;
