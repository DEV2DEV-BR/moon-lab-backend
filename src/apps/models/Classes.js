const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Classes extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        video_url: Sequelize.STRING,
        image_url: Sequelize.STRING,
        module_id: Sequelize.INTEGER
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Modules, { foreignKey: 'module_id', as: 'module' });
  }
}

module.exports = Classes;
