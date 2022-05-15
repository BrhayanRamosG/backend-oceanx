require("dotenv").config();
module.exports = {
  development: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT,
  },
  test: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT,
  },
};
