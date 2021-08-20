require('dotenv').config();

module.exports = {
  development: {
    username: 'XXXXXX',
    password: 'XXXXXX',
    database: 'party_playlist',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DIALECT,
    dialectOptions: {
      ssl: {
        require: 'true',
        rejectUnauthorized: 'false',
      },
    },
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
