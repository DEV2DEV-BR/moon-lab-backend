require('dotenv').config();

module.exports = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
  host: "database-1.cjh4myzj7z1c.us-east-2.rds.amazonaws.com",
  username: "postgres",
  password: "DeV2Dev1721690134",
  database: moon,
  port: 5432,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },

};
