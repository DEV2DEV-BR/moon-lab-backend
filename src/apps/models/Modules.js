const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Modules extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        image_url: Sequelize.STRING,
        course_id: Sequelize.INTEGER
      },
      {
        sequelize,
      },
    );

    return this;
  }
  static associate(models) {
    this.hasOne(models.Categories, { foreignKey: 'course_id', as: 'course' });
  }
}

module.exports = Modules;
