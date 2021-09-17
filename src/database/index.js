const Sequelize = require('sequelize');
const Users = require('../apps/models/Users');
const Classes = require('../apps/models/Classes');
const Categories = require('../apps/models/Categories');
const Courses = require('../apps/models/Courses');
const Modules = require('../apps/models/Modules');

const models = [Users, Categories, Courses];
const databaseConfig = require('../configs/db');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
