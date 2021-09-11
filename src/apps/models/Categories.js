const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Categories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        image_url: Sequelize.STRING
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

module.exports = Categories;
